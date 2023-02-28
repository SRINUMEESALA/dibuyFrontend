
import { v4 as uuidv4 } from "uuid"
import Header from "../Header"
import Footer from "../Footer"
import Cookies from "js-cookie"
import { AiFillCloseCircle } from "react-icons/ai";
import Button from '@mui/material/Button';
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import "./index.css"
import { useState } from "react";
import { serverUrl } from "../../sources";
import { useEffect } from "react";
import DiBuyContext from "../../context/DiBuyContext";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';


const apiStatusConstants = {
    fail: "Failed",
    success: "Successful",
    load: "Loading",
    inital: 'inital'
}
const Cart = (props) => {
    const [products, setProducts] = useState([{}])
    const [cartValue, setCartValue] = useState(0)
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.inital)
    const [summary, setSummary] = useState(true)
    const [finalStep, setFinalStep] = useState(false)
    const [orderSuccess, setOrderSuccess] = useState(false)

    const emptyCartAfterOrderPlaced = async () => {
        try {
            const url = `${serverUrl}/user/cart/order`
            const options = {
                method: "POST",
                body: JSON.stringify({ "ordered": true, "cartValue": cartValue }),
                headers: {
                    Authorization: `Bearer ${Cookies.get("jwtToken")}`,
                    "content-type": "application/json"
                }
            }
            const response = await fetch(url, options)
            const result = await response.json()
            // console.log(result)
        } catch (err) {
            console.log("Could raise HTTP in emptyCartAfterOrderPlaced", err)
        }

    }

    if (orderSuccess) {
        setTimeout(() => {
            emptyCartAfterOrderPlaced()
            getCartProducts()
            setOrderSuccess(false)
            return (
                <DiBuyContext.Consumer>
                    {value => {
                        const { setCartCount } = value
                        setCartCount(0)
                        return <></>
                    }}
                </DiBuyContext.Consumer>
            )

        }, 5000)
    }

    const getCartProducts = async () => {
        try {
            setApiStatus(apiStatusConstants.load)
            const url = `${serverUrl}/user/cart`
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Cookies.get("jwtToken")}`
                }
            }
            const productsFet = await fetch(url, options)
            if (productsFet.ok) {
                const { cart, quantities } = await productsFet.json()
                const finalCart = cart.map((obj) => ({ ...obj, cartQuantity: quantities[obj._id] }))
                let total = 0
                finalCart.map(obj => {
                    total += obj.price * obj.cartQuantity
                })
                setCartValue(total)
                setProducts(finalCart)
                // console.log(products)
                setApiStatus(apiStatusConstants.success)
            } else {
                setApiStatus(apiStatusConstants.fail)
            }

        } catch (err) {
            setApiStatus(apiStatusConstants.fail)
            console.log("could load products", err)
        }

    }

    useEffect(() => {
        getCartProducts()
    }, [])

    const removeProduct = async (productId) => {
        const url = `${serverUrl}/user/cart/delete`
        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${Cookies.get("jwtToken")}`,
                "content-type": "application/json"
            },
            body: JSON.stringify({ productId })
        }
        const response = await fetch(url, options)
        if (response.ok) {
            getCartProducts()
        }
    }



    const renderFailureView = () => (
        <div className="failview min-vh-100 d-flex flex-column justify-content-center align-items-center">
            <div>
                <div className="text-center">
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
                        alt="products failure"
                        className="sizeFailure"
                    />
                </div>
                <h1 className="text-center">Something Went Wrong.</h1>
                <div className="text-center">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={getCartProducts}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    )

    const renderLoadingView = () => (
        <div
            className="text-center loader d-flex justify-content-center align-items-center vh-100"
            testid="loader"
        >
            <Loader type="BallTriangle" color="#FF5454" height={50} width={50} />
        </div>
    )

    const renderCartProducts = () => (
        <DiBuyContext.Consumer>
            {value => {
                const { cartCount, setCartCount } = value
                if (products.length !== cartCount) {
                    setCartCount(products.length)
                }
                if (products.length === 1 && products[0].cart === undefined) {
                    setCartCount(0)
                }
                return (
                    <div className="cartParentCon">
                        <Header />
                        <div className="d-flex flex-column min-vh-100 mb-4">
                            <h1 className="h2 text-center mb-2 mt-2">Your Cart</h1>
                            <div className="cartCon d-flex flex-md-row flex-column align-items-center align-self-center">
                                <div className="productsCon col-md-9 col-12 p-3 overflow-auto">
                                    <div className="font-weight-bold">
                                        <ul className="list-unstyled d-flex">
                                            <li className="col-md-6 col-9">PRODUCT</li>
                                            <li className="col-2">PRICE</li>
                                            <li className="d-none d-md-block col-md-2">QUANTITY</li>
                                            <li className="col-1 d-none d-md-block">TOTAL(Rs)</li>
                                            <li className="col-1"></li>
                                        </ul>
                                        <div className="">
                                            <hr />
                                        </div>
                                    </div>
                                    {products.map(obj => (
                                        <div className="" key={uuidv4()}>
                                            <ul className="list-unstyled d-flex">
                                                <li className="col-md-6 col-9 d-flex">
                                                    <div className="col-4">
                                                        <Link to={`/product/${obj._id}`}>
                                                            <img src={obj.imageUrl} alt="product" className="productCartImage" />
                                                        </Link>
                                                    </div>
                                                    <div className="col-8">
                                                        <p className="">{obj.title}</p>
                                                        <p className="">{obj.category}</p>
                                                    </div>
                                                </li>
                                                <li className="col-2">{obj.price}</li>
                                                <li className="d-none d-md-block col-md-2">
                                                    <div className="rounded-pill pill d-flex quantity justify-content-around align-items-center">
                                                        <p className="p-0 m-0 text-dark h6">{obj.cartQuantity}</p>
                                                    </div>
                                                </li>
                                                <li className="col-md-1 d-none d-md-block">{obj.price * obj.cartQuantity}</li>
                                                <li className="col-1">
                                                    <button type="button" className="btn p-0 m-0" onClick={() => removeProduct(obj._id)}><AiFillCloseCircle className="h4 text-danger" /></button>
                                                </li>
                                            </ul>
                                            <div className="">
                                                <hr />
                                            </div>
                                        </div>))}
                                </div>
                                {summary && <div className="summaryConB col-md-3 col-12 ">
                                    <div className="summaryCon">
                                        <div className="card text-center">
                                            <div className="card-header">
                                                Order Summary
                                            </div>
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <h5 className="card-title h6">Subtotal</h5>
                                                    <p className="">{cartValue}</p>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <h5 className="card-title h6">Shipping</h5>
                                                    <p className="">Free</p>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <h5 className="card-title h6">Payment Method</h5>
                                                    <p className="">COD</p>
                                                </div>
                                            </div>
                                            <div className="card-footer text-muted">
                                                <div className="d-flex justify-content-between">
                                                    <h5 className="card-title">Total</h5>
                                                    <p className="h5">{cartValue}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=""><Button color="success" variant="contained" className="w-100" onClick={() => {
                                            setSummary(false)
                                            setFinalStep(true)
                                        }}>CHECKOUT</Button></div>
                                    </div>
                                </div>}
                                {finalStep && <div className=" col-md-3 col-12 ">
                                    <div className="">
                                        <div className="card text-center">
                                            <div className="card-header">
                                                Order Total:<small className="ml-4">Rs.</small><span className="h4">{cartValue}</span>
                                            </div>
                                            <div className="card-body addressform overflow-auto">
                                                <h1 className="h4 text-center"> Add Address</h1>
                                                <form className="d-flex flex-column p-3 bg-light rounded  h-100">
                                                    <TextField
                                                        id="standard-password-input"
                                                        label="Full Name"
                                                        type="text"
                                                        variant="standard"
                                                        className="m-2"
                                                    />
                                                    <TextField
                                                        id="standard-password-input"
                                                        label="mobile"
                                                        type="text"
                                                        variant="standard"
                                                        className="m-2"
                                                    />
                                                    <TextField
                                                        id="standard-password-input"
                                                        label="Village"
                                                        type="text"
                                                        variant="standard"
                                                        className="m-2"
                                                    />
                                                    <TextField
                                                        id="standard-password-input"
                                                        label="HNo"
                                                        type="text"
                                                        variant="standard"
                                                        className="m-2"
                                                    />
                                                    <TextField
                                                        id="standard-password-input"
                                                        label="City"
                                                        type="text"
                                                        variant="standard"
                                                        className="m-2"
                                                    />
                                                    <TextField
                                                        id="standard-password-input"
                                                        label="Pincode"
                                                        type="text"
                                                        variant="standard"
                                                        className="m-2"
                                                    />
                                                    <TextField
                                                        id="standard-password-input"
                                                        label="State"
                                                        type="text"
                                                        variant="standard"
                                                        className="m-2 mb-3"
                                                    />
                                                </form>
                                            </div>
                                            <div className="card-footer text-muted">
                                                <Button variant="contained" type="button" className="w-100" onClick={() => {
                                                    setOrderSuccess(true)
                                                    setFinalStep(false)
                                                }}>Place Order</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                                {
                                    orderSuccess && <div className="summaryConB col-md-3 col-12 ">
                                        <div className="summaryCon text-center">
                                            <h1 className="text-success h3">Hurray!</h1>
                                            <div className="">
                                                <img src="https://img.freepik.com/free-vector/successful-purchase-concept-illustration_114360-1003.jpg?w=740&t=st=1674810639~exp=1674811239~hmac=ed5176f298be493c2664f80fab02787455f849c6b9e8b71c67a00f73baffbdda" className="w-100" alt="sucessImage" />
                                            </div>
                                            <p className="text-success h6">Order successfully placed!</p>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <Footer />
                    </div>
                )
            }}
        </DiBuyContext.Consumer>
    )

    const renderEmptyView = () => (
        <>
            <Header />
            <div className="d-flex flex-column vh-100 justify-content-center align-items-center">
                <h1 className="h1">Your cart is Empty!</h1>
                <p className="small text-secondary">Explore our products section and add Fun.</p>
                <button type="button" className="btn btn-warning"><Link to="/products">Find Products</Link> </button>
            </div>
        </>
    )

    const renderSuccessView = () => {
        if (products.length === 0) {
            return renderEmptyView()
        } else {
            return renderCartProducts()
        }
    }

    const renderUi = () => {
        switch (apiStatus) {
            case apiStatusConstants.success:
                return renderSuccessView()
            case apiStatusConstants.fail:
                return renderFailureView()
            case apiStatusConstants.load:
                return renderLoadingView()
            default:
                return null
        }
    }

    return (
        <>
            {renderUi()}
        </>

    )
}

export default Cart
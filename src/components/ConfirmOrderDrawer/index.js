import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { v4 as uuidv4 } from "uuid"
import Header from "../Header"
import Footer from "../Footer"
import Cookies from "js-cookie"
import { AiFillCloseCircle, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import "./index.css"
import { useState } from "react";
import { serverUrl } from "../../sources";
import { useEffect, useState } from "react";
import DiBuyContext from "../../context/DiBuyContext";
import { Link } from "react-router-dom";

const apiStatusConstants = {
    fail: "Failed",
    success: "Successful",
    load: "Loading",
    inital: 'inital'
}

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor:
        theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

function cart(props) {
    const { window } = props;
    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpenDrawer(newOpen);
    };

    // This is used only for the example
    const container = window !== undefined ? () => window().document.body : undefined;
    const [products, setProducts] = useState([{}])
    const [cartValue, setCartValue] = useState(0)
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.inital)


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
            console.log("could not get cart products", err)
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
                                                        <button type="button" className="btn m-0 p-0"><AiOutlinePlus className="p-0 m-0" /></button>
                                                        <p className="p-0 m-0 text-dark h6">{obj.cartQuantity}</p>
                                                        <button type="button" className="btn m-0 p-0"><AiOutlineMinus className="p-0 m-0" /></button>
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
                                <div className="summaryConB col-md-3 col-12 ">
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
                                        <div className=""><Button color="success" variant="contained" className="w-100" onClick={() => toggleDrawer(true)}>CHECKOUT</Button></div>
                                    </div>
                                </div>
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
        <Root>
            <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(50% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />
            {/* main code starts */}
            {renderUi()}
            {/* {main code ends} */}
            <SwipeableDrawer
                container={container}
                anchor="bottom"
                open={openDrawer}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                >
                    <Puller />
                    <Typography sx={{ p: 2, color: 'text.secondary' }}>51 results</Typography>
                </StyledBox>
                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <img src="https://img.freepik.com/free-vector/elegant-janmashtami-festival-banner-with-text-space_1017-26550.jpg?w=996&t=st=1672478068~exp=1672478668~hmac=039916f0dbd305bfefab86aa231c17dfdbeaf8857ec905ee234d8e927ec2acda" alt="radheradhe" className='100%' />
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
}

cart.propTypes = {
    window: PropTypes.func,
};

export default cart;

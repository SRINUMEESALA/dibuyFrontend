import "./index.css"
/* eslint-disable react/no-unknown-property */
import { Component } from 'react'
import Cookies from "js-cookie"
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import './index.css'
import Header from '../Header'
import { serverUrl } from "../../sources";
import { v4 as uuidv4 } from "uuid"
import TechCard from "../TechCard"



const borderColors = ["#1976d2", "#ad1457", "#f44336", "#00695c", "#78909c", "#673ab7", "#004d40", "#ffea00"]

const apiStatusConstants = {
    fail: "Failed",
    success: "Successful",
    load: "Loading"
}
class ProductItemDetails extends Component {
    state = {
        productDet: {},
        apiStatus: 'initial',
        count: 1,
        similarProducts: [{}],
        firstTime: true
    }



    setQuantity = (arg) => {
        const { count } = this.state
        if (arg === "+") {
            this.setState({ count: count + 1 })
        } else {
            if (count === 1) {
                this.setState({ count: 1 })
            } else {
                this.setState({ count: count - 1 })
            }
        }
    }

    addProductToCart = async () => {
        const { match } = this.props
        const { params } = match
        const { id } = params
        const url = `${serverUrl}/user/cart/update`
        const options = {
            method: "POST",
            body: JSON.stringify({
                productId: id,
                quantity: this.state.count
            }),
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${Cookies.get("jwtToken")}` }
        }
        const response = await fetch(url, options)
        if (response.ok) {
            const { history } = this.props
            history.replace("/cart")
        }
    }

    componentDidMount() {
        const { match } = this.props
        const { params } = match
        const { id } = params
        this.fetchProductDetails(id)
    }



    fetchProductDetails = async (id) => {
        try {

            const response = await fetch(`${serverUrl}/product/${id}`)
            console.log(id)
            if (response.ok) {
                let data = await response.json()
                const ProductData = data.product
                const similarProducts = data.similarProducts
                this.setState({ productDet: ProductData, apiStatus: apiStatusConstants.success, similarProducts })
            } else {
                this.setState({ apiStatus: apiStatusConstants.fail })
            }
        } catch (err) {
            console.log("Could not get product details", err)
            this.setState({ apiStatus: apiStatusConstants.fail })
        }

    }

    updateStateForSimilarProdClick = (prodId) => {
        this.fetchProductDetails(prodId)
    }

    changeQuantity = who => {
        const { count } = this.state
        switch (who) {
            case 'plus':
                this.setState({ count: count + 1 })
                break

            default:
                if (count > 1) {
                    this.setState({ count: count - 1 })
                }
        }
    }

    renderFailureView = () => (
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
                        onClick={this.fetchProductDetails}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    )

    renderLoadingView = () => (
        <div
            className="text-center loader d-flex justify-content-center align-items-center vh-100"
            testid="loader"
        >
            <Loader type="BallTriangle" color="#FF5454" height={50} width={50} />
        </div>
    )

    renderSimilarProducts = () => (
        <div className="simalarProductsCon p-5">
            <h1 className="h2 mb-5">Explore similar ones</h1>
            {this.state.similarProducts[0].price === undefined ? (<div className="mt-3">
                <h1 className="text-center text-secondary h2">No Similar Products Available</h1>
            </div>) :
                (<div className="d-flex flex-wrap justify-content-around">
                    {this.state.similarProducts.map((obj, ind) => <TechCard eachCard={{ ...obj, index: ind }} key={uuidv4()} borderColors={borderColors} updateStateForSimilarProdClick={this.updateStateForSimilarProdClick} />)}
                </div>)}
        </div>
    )

    renderSuccessView = () => {
        const { productDet, count } = this.state
        const {
            title,
            description,
            imageUrl,
            price,
            quality,
            quantity,
        } = productDet
        return (
            <>
                <div className="d-flex flex-row justify-content-center p-2 mt-4">
                    <div className="itemParentCon">
                        <div className=" d-flex ">
                            <div className="itemImg col-6 text-center">
                                <img src={imageUrl} alt="product" className="imagepord" />
                            </div>
                            <div className="d-flex flex-column p-2 justify-content-around">
                                <h1 className="h3">{title}</h1>
                                <p className="h5">Rs.{price}</p>
                                <div className="d-flex">
                                    <button
                                        type="button"
                                        className="btn btn-warning d-flex p-1"
                                    >
                                        <p className="align-self-center pr-1 m-0">{quality}</p>
                                        <img
                                            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                                            alt="star"
                                            className="starimg"
                                        />
                                    </button>
                                </div>
                                <p className="m-1"></p>
                                <p>
                                    <span className="font-weight-bold">Product Name: </span>
                                    {title}
                                </p>
                                <p>
                                    <span className="font-weight-bold">Availability: </span>
                                    {quantity}
                                </p>
                                <p>
                                    <span className="font-weight-bold">About: </span>
                                    {description}
                                </p>
                                <li className="d-none d-md-block col-md-2">
                                    <div className="rounded-pill pill d-flex quantity justify-content-around align-items-center">
                                        <button type="button" className="btn m-0 p-0" onClick={() => this.setQuantity("-")}><AiOutlineMinus className="p-0 m-0" /></button>

                                        <p className="p-0 m-0 text-dark h6">{count}</p>
                                        <button type="button" className="btn m-0 p-0" onClick={() => this.setQuantity("+")}><AiOutlinePlus className="p-0 m-0" /></button>

                                    </div>
                                </li>
                                <button
                                    type="button"
                                    className="btn btn-primary align-self-start"
                                    onClick={this.addProductToCart}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.renderSimilarProducts()}
            </>
        )
    }


    renderUi = () => {
        const { apiStatus } = this.state
        switch (apiStatus) {
            case apiStatusConstants.success:
                return this.renderSuccessView()
            case apiStatusConstants.fail:
                return this.renderFailureView()
            case apiStatusConstants.load:
                return this.renderLoadingView()
            default:
                return null
        }
    }

    render() {
        // const { apiStatus } = this.state
        // console.log(apiStatus)
        return (
            <div className="productDetailsParentCon d-flex flex-column">
                <Header />
                {this.renderUi()}
            </div>
        )
    }
}

export default ProductItemDetails

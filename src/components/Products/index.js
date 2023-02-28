import { useEffect, useState } from "react"
import Loader from 'react-loader-spinner'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { HiOutlineSearch } from "react-icons/hi";
import { BsFilterSquare } from "react-icons/bs";
import Rating from '@mui/material/Rating';
import Header from "../Header"
import Footer from "../Footer"
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import "./index.css"
import { serverUrl } from "../../sources";
import ProductsList from "../ProductsList";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Cookies from "js-cookie";


// for MiUi styles


// Filter Options
// const CategoryItems = [
//     { label: "All", id: "All" }, { label: "Clothing", id: "Clothing" }, { label: "Electronics", id: "Electronics" }, { label: "Vegetables", id: "Vegetables" }, { label: "Farming", id: "Farming" }, { label: "Spices", id: "Spices" }
// ];

const apiStatusConstants = {
    fail: "Failed",
    success: "Successful",
    load: "Loading"
}

const Products = () => {

    const [products, setProducts] = useState([{}])
    const [sortByPrice, setSortByPrice] = useState("HighToLow")
    const [sortByRating, setSortByRating] = useState(1)
    const [searchInput, setSearchInput] = useState("")
    const [sortByCategory, setSortByCategory] = useState("All")
    const [productsApiStatus, setProductsApiStatus] = useState("initial")
    const [CategoryItems, setCategoryItems] = useState([{}])

    // console.log(sortByPrice, sortByRating, sortByCategory, searchInput)
    // console.log(CategoryItems)

    const getProducts = async () => {
        setProductsApiStatus(apiStatusConstants.load)
        const url = `${serverUrl}/products?category=${sortByCategory}&price=${sortByPrice}&quality=${sortByRating}&search=${searchInput}&saleType=general`
        const options = {
            method: "GET"
        }
        const url2 = `${serverUrl}/products/categories`
        const options2 = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Cookies.get("jwtToken")}`
            }
        }
        // console.log(url2, options2)
        try {
            const response = await fetch(url, options)
            const productsList = await response.json()
            const response2 = await fetch(url2, options2)
            const result2 = await response2.json()

            if (response.ok) {
                setProducts(productsList.productsList)
                setCategoryItems(result2)
                setProductsApiStatus(apiStatusConstants.success)
            } else {
                setProductsApiStatus(apiStatusConstants.fail)
            }
        } catch (err) {
            console.log("Oops! something went wrong.", err)
            setProductsApiStatus(apiStatusConstants.fail)
        }
    }

    useEffect(() => {
        getProducts()
    }, [sortByRating, sortByPrice, sortByCategory])

    const renderSortByPrice = () => (
        <div className="">
            <h1 className="h6">Price</h1>
            <ul className="list-unstyled">
                <li>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="HighToLow"
                        name="radio-buttons-group"
                        onChange={(event) => setSortByPrice(event.target.value)}
                        value={sortByPrice}
                    >
                        <FormControlLabel value="HighToLow" control={<Radio size="small" />} label="High To Low" style={{ fontSize: '4rem' }} />
                        <FormControlLabel value="LowToHigh" control={<Radio size="small" />} label="Low To High" />
                    </RadioGroup>
                </li>
            </ul>
        </div>
    )

    const renderSortByRating = () => (
        <div className="">
            <h1 className="h6">Rating</h1>
            <Rating name="size-medium" value={sortByRating} onChange={(event, rating) => setSortByRating(parseFloat(rating))} />
        </div>
    )

    const renderSortByCategory = () => (
        <div className="">
            <h1 className="h6 mb-3">Category</h1>
            <div className="input-group mb-3 d-flex">
                <div className="searchInputCon">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={CategoryItems}
                        sx={{ width: 300 }}
                        size="small"
                        renderInput={(params) => <TextField {...params} label="category" />}
                        className="w-100"
                        value={sortByCategory}
                        onChange={(event, selectedObj) => setSortByCategory(selectedObj.id)}
                    />
                </div>
            </div>
        </div>
    )

    const renderSortBySearch = () => (<>
        <h1 className="h6 mb-0">Search</h1>
        <div className="d-flex mb-3">
            <TextField id="standard-basic" label="Latest..." variant="standard" onChange={(event) => setSearchInput(event.target.value)} value={searchInput} type="search" />
            <div className="colorSearchIconCon mb-0 ml-1 mt-3">
                <button type="button" className="btn p-0 m-0" onClick={getProducts}><HiOutlineSearch className="h-100 text-secondary h5 align-self-center mb-0 " /></button>
            </div>
        </div>
    </>)

    const allClear = () => {
        setSortByCategory("All")
        setSortByPrice("HighToLow")
        setSortByRating(1)
        setSearchInput("")
        getProducts()
    }

    const renderEmptyProducts = () => (
        <div className="d-flex align-items-center justify-content-center emptyConView">
            <div className="">
                <div className="text-center mb-2">
                    <img className="emptyProductsView w-50" alt="emptyViewImage" src="https://img.freepik.com/premium-vector/order-cancelled-abstract-concept-vector-illustration_107173-20487.jpg?w=740" />
                </div>
                <h1 className="h3 text-secondary text-center">Sorry! No prouducts are available with your search.</h1>
            </div>
        </div>
    )

    const renderSuccessView = () => (
        <div className="productsCon align-self-center d-flex justify-content-between">
            <div className="filterSectionCon p-3 overflow-auto d-none d-md-block">
                <div className="d-flex justify-content-between mb-3">
                    <h1 className="h5 filterHeading">Filter</h1>
                    <BsFilterSquare className="websiteNativeColor h5" />
                </div>
                {renderSortBySearch()}
                {renderSortByCategory()}
                {renderSortByPrice()}
                {renderSortByRating()}
                <button type="button" className="btn btn-danger btn-small float-right mt-3 p-1 pr-2 pl-2" onClick={allClear}>Clear All</button>
            </div>
            {products.length === 0 ? renderEmptyProducts() : <ProductsList productsList={products} />}
        </div>
    )

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
                        onClick={getProducts}
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

    const decideRendering = () => {
        switch (productsApiStatus) {
            case apiStatusConstants.fail:
                return renderFailureView()
            case apiStatusConstants.success:
                return renderSuccessView()
            case apiStatusConstants.load:
                return renderLoadingView()
            default:
                break;
        }
    }


    return (
        <div className="d-flex flex-column customerPrototypeCon">
            <Header />
            {decideRendering()}
            <Footer />
        </div>
    )
}
export default Products
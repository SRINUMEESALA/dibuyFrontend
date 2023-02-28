import { useEffect, useState } from "react"
// import Header from "../Header"
// import Footer from "../Footer"
import { v4 as uuidv4 } from "uuid"
import { serverUrl } from "../../sources";
import Cookies from "js-cookie"
import "./index.css"
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const apiStatusConstants = {
    fail: "Failed",
    success: "Successful",
    load: "Loading",
    initial: "initial"
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))





const DisplaySellerProducts = () => {
    const [sellerProducts, setSellerProducts] = useState([{}])
    const [getProductsApiStatus, setGetProductsApiStatus] = useState(apiStatusConstants.initial)


    const getProducs = async () => {
        setGetProductsApiStatus(apiStatusConstants.load)
        try {
            const url = `${serverUrl}/seller/products`
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Cookies.get("jwtToken")}`
                }
            }
            const response = await fetch(url, options)
            if (response.ok) {
                const result = await response.json()
                setSellerProducts(result.products)
                // console.log(result.products)
                setGetProductsApiStatus(apiStatusConstants.success)
            } else {
                setGetProductsApiStatus(apiStatusConstants.fail)
            }

        } catch (err) {
            console.log("couldnot get products", err)
            setGetProductsApiStatus(apiStatusConstants.fail)
        }
    }

    useEffect(() => {
        getProducs()
    }, [])

    // console.log("seller products of 0 is", sellerProducts[0])

    const renderSuccessView = () => (
        <div className="d-flex justify-content-center">
            <div className="tableCon mt-4">
                {sellerProducts[0] !== undefined ? (<div className="d-flex justify-content-center vh-100">
                    <div className="w-100 overflow-auto">
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer component={Paper}>
                                <Table
                                    sx={{ minWidth: 500 }}
                                    aria-label="customized table"
                                    stickyHeader
                                >
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Image</StyledTableCell>
                                            <StyledTableCell align="right">Product Name</StyledTableCell>
                                            <StyledTableCell align="right">Category</StyledTableCell>
                                            <StyledTableCell align="right">
                                                Price
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                Quality
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                Quantity
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                Description
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {sellerProducts.map(row => (
                                            <StyledTableRow key={row.name}>
                                                <StyledTableCell component="th" scope="row">
                                                    <img src={row.imageUrl} alt="productImage" className="tableImage" />
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    {row.title}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    {row.category}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{row.price}</StyledTableCell>
                                                <StyledTableCell align="right">{row.quality}</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    {row.quantity}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    {(row.description).slice(0, 15)}...
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </div>
                </div>) : (
                    <div className="mt-5 mb-5">
                        <h1 className="text-center text-secondary h2">Oops! Looks like you haven't added any.</h1>
                    </div>
                )}
            </div>
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
                        onClick={getProducs}
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

    const renderUi = () => {
        switch (getProductsApiStatus) {
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
        <div className="d-flex justify-content-center mb-5">
            {/* <Header /> */}
            <div className="p-3 manageSellerCon d-flex flex-column">
                <div className="w-100">
                    <div className="d-flex">
                        <div className="d-flex flex-column">
                            <h1 className="h2 text-dark mb-3 mt-3">Your Products</h1>
                            <div className="m-0 p-0 align-self-center bg-info horizCon"><hr className="m-0 p-0 horiz rounded" /></div>
                        </div>
                    </div>
                    {renderUi()}
                </div>
            </div>
            {/* <Footer /> */}
        </div >
    )


}
export default DisplaySellerProducts
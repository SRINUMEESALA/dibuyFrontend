import { useEffect, useState } from "react"
import "./index.css"
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { serverUrl } from "../../sources";
import Cookies from "js-cookie";
import ManageSellerAccount from "../ManageSellerAccount";
import SellerAddProduct from "../SellerAddProduct";
import DisplaySellerProducts from "../DisplaySellerProducts";
import Header from "../Header"
import Footer from "../Footer"

const apiStatusConstants = {
    fail: "Failed",
    success: "Successful",
    load: "Loading",
    inital: 'inital'
}
const SellerCorner = (props) => {
    const [sellerApiStatus, setSellerApiStatus] = useState(apiStatusConstants.inital)
    const [seller, setSeller] = useState({})
    // console.log(sellerApiStatus)
    const verifySeller = async () => {
        setSellerApiStatus(apiStatusConstants.load)
        try {
            const url = `${serverUrl}/user/getemail`
            // const url = "http://localhost:4000/user/getemail"
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Cookies.get("jwtToken")}`,
                    // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJzcmludXNyaTc2NTg1QGdtYWlsLmNvbSIsImlhdCI6MTY3NDcwODgzMX0.QNkp8Y4jhoKIezwAm8Nc4RYtHYeTX7AbgifIRLfCvpY`,
                    "content-type": "application/json"
                }
            }
            const response = await fetch(url, options)
            const result = await response.json()
            const url2 = `${serverUrl}/users/${result.email}`
            // const url2 = `http://localhost:4000/users/${result.email}`
            const response2 = await fetch(url2)
            const result2 = await response2.json()
            const url3 = `${serverUrl}/seller/details`
            // const url3 = `http://localhost:4000/seller/details`
            const result3 = await fetch(url3, options)
            const response3 = await result3.json()
            if (result2.user.isSeller) {
                setSellerApiStatus(apiStatusConstants.success)
                setSeller(response3.seller)
            } else {
                const { history } = props
                history.replace("/seller/register")
            }

        } catch (err) {
            console.log("Could not get email of the user", err)
            setSellerApiStatus(apiStatusConstants.fail)
        }

    }

    useEffect(() => {
        verifySeller()
    }, [])

    const sellerScreen = () => (
        <>
            <Header />
            <div className="sellerScreen">
                <ManageSellerAccount seller={seller} />
                <SellerAddProduct />
                <DisplaySellerProducts />
            </div>
            <Footer />
        </>
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

    const renderSuccessView = () => sellerScreen()

    const renderUi = () => {
        switch (sellerApiStatus) {
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

    return <>{renderUi()}</>
}
export default SellerCorner
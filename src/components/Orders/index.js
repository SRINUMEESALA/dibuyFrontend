import { useEffect, useState } from "react"
import Header from "../Header"
import Footer from "../Footer"
import { v4 as uuidv4 } from "uuid"
import { serverUrl } from "../../sources";
import Cookies from "js-cookie"
import "./index.css"
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { format } from 'date-fns'

const apiStatusConstants = {
    fail: "Failed",
    success: "Successful",
    load: "Loading",
    initial: "initial"
}
const Orders = () => {
    const [history, setHistory] = useState([{}])
    const [getHistoryApiStatus, setGetHistoryApiStatus] = useState(apiStatusConstants.initial)


    const getHistory = async () => {
        setGetHistoryApiStatus(apiStatusConstants.load)
        try {
            const url = `${serverUrl}/user/cart/orders/history`
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Cookies.get("jwtToken")}`
                }
            }
            const response = await fetch(url, options)
            if (response.ok) {
                const result = await response.json()
                setHistory(result.orders)
                // console.log(result.orders)

                setGetHistoryApiStatus(apiStatusConstants.success)
            } else {
                setGetHistoryApiStatus(apiStatusConstants.fail)
            }

        } catch (err) {
            console.log("Could raise HTTP in emptyCartAfterOrderPlaced", err)
            setGetHistoryApiStatus(apiStatusConstants.fail)
        }
    }

    useEffect(() => {
        getHistory()
    }, [])

    const renderSuccessView = () => (
        <div className="min-vh-100 historyCon p-3 align-self-center rounded mt-3 mb-3">
            <h1 className="h2 text-primary">Your History</h1>
            {history.length !== 0 ? (<ul className="list-unstyled w-100">
                {history.map(obj => (
                    <li className="m-3 border border-warning rounded" key={uuidv4()}>
                        <div className=" text-center">
                            <div className="card-header">
                                <div className="d-flex justify-content-between">
                                    <h1 className="text-secondary h6">Ordered On</h1>
                                    <h1 className="h6">{format(new Date(obj.orderedTime), 'MM/dd/yyyy pp')}</h1>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h1 className="text-secondary h6">Order Value</h1>
                                    <h1 className="h6">{obj.orderValue}</h1>
                                </div>
                            </div>
                            <div className="card-footer text-muted">
                                <div className="d-flex justify-content-between">
                                    <h1 className="text-secondary h6">Order ID</h1>
                                    <h1 className="h6">{obj.orderId}</h1>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>) : (
                <div className="d-flex justify-content-center align-items-center">
                    <h1 className="h2 text-secondary">No History Available.</h1>
                </div>
            )}

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
                        onClick={getHistory}
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
        switch (getHistoryApiStatus) {
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
        <div className="d-flex flex-column">
            <Header />
            {renderUi()}
            <Footer />
        </div>
    )


}
export default Orders
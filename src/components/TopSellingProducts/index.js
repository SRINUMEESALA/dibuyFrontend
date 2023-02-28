/* eslint-disable jsx-a11y/no-static-element-interactions */
import Slider from 'react-slick'
import { useRef } from 'react'
import { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { v4 as uuidv4 } from 'uuid'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { serverUrl } from '../../sources'
import { FcNext, FcPrevious } from 'react-icons/fc'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'
import { Link } from 'react-router-dom'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Fade from '@mui/material/Fade';



const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

const apiStatusConstants = {
    fail: "Failed",
    success: "Successful",
    load: "Loading",
    initial: "initial"
}

const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
    autoplay: true,
    autoplaySpeed: 2000,
}

const TopSellingProducts = () => {
    const [getTopProductsApiStatus, setGetTopProductsApiStatus] = useState(apiStatusConstants.initial)
    const [topProducts, setTopProducts] = useState([{}])
    const slider = useRef(null)

    useEffect(() => {
        getTopProducts()
    }, [])

    const getTopProducts = async () => {
        setGetTopProductsApiStatus(apiStatusConstants.load)
        const url = `${serverUrl}/products?category=All&price=LowToHigh&quality=4&search=""&saleType=general`
        const options = {
            method: "GET"
        }
        try {
            const response = await fetch(url, options)
            const productsList = await response.json()
            // console.log(url, productsList)
            if (response.ok) {
                setTopProducts(productsList.productsList.slice(0, 10))
                setGetTopProductsApiStatus(apiStatusConstants.success)
                // console.log(topProducts)
            } else {
                setGetTopProductsApiStatus(apiStatusConstants.fail)
            }
        } catch (err) {
            console.log("Oops! something went wrong.", err)
        }
    }

    const renderSuccessView = () => (

        <div className="videosSliderParentCon">
            <h1 className='h3 mb-3 mt-3'>Top Sellings</h1>
            <button
                type="button"
                className=" nextBtn"
                onClick={() => slider.current.slickNext()}
            >
                <FcNext className="h4 mb-0" />
            </button>
            <button
                type="button"
                className="prevBtn"
                onClick={() => slider.current.slickPrev()}
            >
                <FcPrevious className="h4 mb-0" />
            </button>
            <Slider {...settings} ref={slider}>
                {topProducts.map(obj => (
                    <Link to={`/product/${obj._id}`} className='link' key={uuidv4()}>

                        <HtmlTooltip TransitionComponent={Fade}
                            TransitionProps={{ timeout: 600 }}
                            placement="top"
                            title={<div className='d-flex flex-column justify-content-around'><h1 className="h2 text-center"><small className='text-secondary'>Rs.</small>{obj.price}</h1><small className='text-secondary'>{obj.description}</small><br></br><p className="text-center"><Link to={`/product/${obj._id}`} >Click Here To Know More</Link></p></div>} >
                            <div className="card mr-3 d-flex flex-column justify-content-around p-2 text-secondary eachProductCard" key={uuidv4()}>
                                <img src={obj.imageUrl} alt="" className="w-100 cardImage" />
                                <h1 className='h5 text-center'>{obj.title}</h1>
                            </div>

                        </HtmlTooltip>
                    </Link>
                ))}
            </Slider>
        </div>
    )

    const renderFailureView = () => (
        <div className="failview d-flex flex-column justify-content-center align-items-center">
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
                        onClick={getTopProducts}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    )

    const renderLoadingView = () => (
        <div
            className="text-center loader d-flex justify-content-center align-items-center"
            testid="loader"
        >
            <Loader type="BallTriangle" color="#FF5454" height={50} width={50} />
        </div>
    )

    const renderView = () => {
        switch (getTopProductsApiStatus) {
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
        <div className=" d-flex justify-content-center pt-3 pb-3">
            {renderView()}
        </div>

    )
}
export default TopSellingProducts
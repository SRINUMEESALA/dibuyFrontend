/* eslint-disable jsx-a11y/no-static-element-interactions */
import Slider from 'react-slick'
import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'


const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    dots: false,
    slidesToShow: 1,
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

const BannerSection = () => {
    const slider = useRef(null)
    const bannersList = [{ imageUrl: "https://img.freepik.com/premium-vector/farmer-cartoon_48369-1308.jpg?w=826", id: uuidv4() }, { imageUrl: "https://img.freepik.com/premium-vector/farm-farmer-typographic-header-concept-farmers-working-field-watering-plants-feeding-animals-summer-countryside-view-agriculture-concept-living-village_277904-6044.jpg?w=900", id: uuidv4() }, { imageUrl: "https://img.freepik.com/premium-vector/agricultural-farming-services-landscape-banner-design-template_262129-11383.jpg?w=826", id: uuidv4() }]
    return (
        <div className="videosSliderParentCon mt-2">
            <Slider {...settings} ref={slider}>
                {bannersList.map(obj => (
                    <div className="shadow mr-3" key={uuidv4()}>
                        <img src={obj.imageUrl} alt="Radhe" className="w-100 sliderimage" />
                    </div>
                ))}
            </Slider>
        </div>
    )
}
export default BannerSection
import { Link } from "react-router-dom"
import { Chrono } from 'react-chrono'
import { v4 as uuidv4 } from "uuid"
import Button from '@mui/material/Button';
import BannerSection from "../BannerSection"
import ReactPlayer from 'react-player'
import Footer from "../Footer"
import Header from "../Header"
import TopSellingProducts from "../TopSellingProducts"
import { AiOutlineLink } from "react-icons/ai";

import "./index.css"

const chronoSlides = [
    { info: "Dibuy donot allow any intermediataries to play role in financial talks or activities.The whole marketing and communication always will be direct and confidential.", id: uuidv4(), imageUrl: "https://img.freepik.com/free-vector/infodemic-illustration-concept_23-2148707149.jpg?w=740&t=st=1674638654~exp=1674639254~hmac=bf187fac5d9f1833b196cb7ff6dd30a6607430a9d084ae785466ecb7d68a375e" },
    { info: "We will credit the amount into the seller account as soon as the deal completes and will charge 50 percent less for maintainance and other services when compared with big gaints like Flipkar,Amazon which makes us to stand as Best Service Provider.", id: uuidv4(), imageUrl: "https://img.freepik.com/premium-vector/online-transaction-transfer-payment-money-mobile-banking-technology-illustration-vector_199064-246.jpg?w=740" },
    { info: "Some of less makes much.We believe this statement.We will integrate all the small stocks and sell to the government at best MRP.So that the Dibuy and farmer get double benifited.", id: uuidv4(), imageUrl: "https://img.freepik.com/free-vector/flat-design-reseller-illustration_23-2149483144.jpg?w=740&t=st=1674639008~exp=1674639608~hmac=31388d7776e4ca4868d6e181af5d39eab4fe69b06ce7603bf8fce9b5a0c9be0c" },
    { info: "We made easy.Our contact services are availble in multiple ways.You can contact in any manner as provided.We are 24/7.We are always happy to clear your doubts and serve you.", id: uuidv4(), imageUrl: "https://img.freepik.com/free-vector/taking-orders-by-phone-store-contact-center-customers-support-easy-order-fast-delivery-trade-service-call-center-operator-cartoon-character_335657-2564.jpg?w=740&t=st=1674639064~exp=1674639664~hmac=234a19608ef3c2efd2b478c29acffb60e2c01680c71974c821d55336e4e3d28b" },
    { info: "We offers free registration to the sellers which offers them with multiple benifits.Your goods sales is our mutual happiness.", id: uuidv4(), imageUrl: "https://img.freepik.com/premium-vector/register-now-tag_599236-750.jpg?w=740" },
    { info: "In addition,we provide many services which elaborates acknowledgement about many services which farmers and small sellers can avail,need to know from government,from society,from modern technology.We dont stop updating our site to not to make you less aware.", id: uuidv4(), imageUrl: "https://img.freepik.com/free-photo/aerial-view-business-team_53876-124515.jpg?w=826&t=st=1674639256~exp=1674639856~hmac=828c13a633fde7798ef8d9c264d1402e7d83621d4a484ebc76e35c17faab6529" }
]

const Home = () => {
    const items = [{ title: "No Intermediataries" },
    { title: "Direct Amount Credits" },
    { title: "Small Stock Integration" },
    { title: "Easy Contact" },
    { title: "Free Registration" },
    { title: "Enhanced Services" }]
    const JoinAsASeller = () => (
        <div className="mt-3 joinSeller p-3 d-flex flex-column">
            <h1 className="h3">Join As A Seller</h1>
            <h1 className="h5 mt-3">Who we are</h1>
            <p className="text-secondary">Dibuy is startup company in india established in 2023 which works to provide better benifits to customer , especially small vendors and farmers by providing various facilities in selling,transporting,advertising their products.Our company also makes awareness towards profits generation through less investments in marketing to lead them into the success and happiness.Dibuy assures the below benifits to the seller with joy.</p>
            <h1 className="h5 mt-3">How we work</h1>
            <div className="chrono-container align-self-center">
                <Chrono
                    items={items}
                    mode="VERTICAL_ALTERNATING"
                    slideShow
                    slideItemDuration={2000}
                    enableOutline
                    buttonTexts={{
                        first: 'Jump to First',
                        last: 'Jump to Last',
                        next: 'Next',
                        previous: 'Previous',
                        play: 'Play motion slides',
                    }}
                    fontSizes={{
                        cardSubtitle: '0.85rem',
                        cardText: '0.8rem',
                        cardTitle: '1rem',
                        title: '1.5rem',
                    }}
                    allowDynamicUpdate

                >
                    {chronoSlides.map(obj => (<div key={uuidv4()} className="chronoCardOfSlider" >
                        <img
                            src={obj.imageUrl}
                            alt="image1"
                            className="w-100"
                        />
                        <p className="text-secondary pt-2">{obj.info} </p>
                        <a href="www.couldnotFOund.com">Know More<AiOutlineLink className="m-0 ml-2" /></a>

                    </div>))}
                </Chrono>
            </div>
            <Button color="success" variant="contained"><Link to="/seller/register">Become a Seller on Dibuy</Link></Button>
        </div>
    )

    const schemesList = [
        { title: "Pradhan Mantri Kisan Samman Nidhi", description: "Pradhan Mantri Kisan Samman Nidhi (PMKSN, translation: Prime Minister's Farmer's Tribute Fund) is an initiative by the government of India that give farmers up to ₹6,000 (equivalent to ₹6,300 or US$79 in 2020) per year as minimum income support. The initiative was announced by Piyush Goyal during the 2019 Interim Union Budget of India on 1 February 2019.The scheme has cost ₹75,000 crore (equivalent to ₹790 billion or US$9.9 billion in 2020) per annum and came into effect December 2018.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7e/PradhanMantriKisanSammanNidhi.jpg", id: uuidv4() },
        { title: "The Pradhan Mantri fasal bima yojana", description: "The Pradhan Mantri fasal bima yojana (PMFBY) launched on 18 February 2016 by Prime Minister Narendra Modi is an insurance service for farmers for their yields.It was formulated in line with One Nation–One Scheme theme by replacing earlier two schemes National Agricultural Insurance Scheme (NAIS) and Modified National Agricultural Insurance Scheme (MNAIS) by incorporating their best features and removing their inherent drawbacks (shortcomings). It aims to reduce the premium burden on farmers and ensure early settlement of crop assurance claim for the full insured sum.", imageUrl: "https://tg.tctrj.in/news/news-pradhan-mantri-fasal-bima-yojana-811-crore-will-be-transferred-to-bank-accounts-of-farmers-1670320583.webp", id: uuidv4() },
        { title: "Procurement and Marketing Support Scheme (P&MS)", description: "Participation (as exhibitors) of MSME delegations of industry associations and government organisations, involved in promotion of MSMEs, in international exhibitions, trade fairs and buyer-seller meets in foreign countries for exploring potential markets for exports, seeking joint ventures, awareness about latest technologies, etc. (Physical & Virtual).Organising international conferences/summits/workshops/seminars in India on themes relevant to MSMEs by the Industry Associations and Government organizations. (Physical & Virtual)", imageUrl: "http://msme.gov.in/sites/all/themes/msme/images/bannerol.jpg", id: uuidv4() },
        { title: "Marketing Assistance Scheme", description: "To enhance marketing capabilities & competitiveness of the MSMEs.To showcase the competencies of MSMEs.To update MSMEs about the prevalent market scenario and its impact on their activities. To facilitate the formation of consortia of MSMEs for marketing of their products and services.To provide platform to MSMEs for interaction with large institutional buyers.The budget for organizing the Domestic Exhibitions/Trade Fair would depend upon the various components of the expenditure, i.e. space rental including construction and fabricating charges, theme pavilion, advertisement, printing material, transportation etc. However, the budgetary support towards net expenditure for organizing such exhibition/trade fair would normally be restricted to a maximum amount of Rs. 45 lakh. The corresponding budgetary limit for participation in an exhibition/trade fair shall be Rs. 15 lakh.", imageUrl: "https://www.startupindia.gov.in/content/dam/invest-india/BannerImages/government_logos/Ministry%20of%20Micro%20Small%20and%20Medium%20Enterprise.png", id: uuidv4() },
    ]

    const Schemes = () => (
        <div className="schemCon p-3 mt-3">
            <h1 className="h3 mt-3 mb-3">Schemes</h1>
            <ul className="list-unstyled">
                {schemesList.map((obj, ind) => (
                    <li className="card d-flex flex-row m-2" key={uuidv4()}>
                        <img className={ind % 2 === 0 ? "img-thumbnail order-1 col-4" : "img-thumbnail order-3 col-4"} src={obj.imageUrl} alt="schemeImage" />
                        <div className="col-8 p-3 order-2 overflow-hidden">
                            <h5 className="h5">{obj.title}</h5>
                            <p className="text-secondary">{obj.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )

    const videosLst = [{ url: "https://youtu.be/EQHbI7VKmxs", id: uuidv4() },
    { url: "https://youtu.be/r_YGlKihHtk", id: uuidv4() },
    { url: "https://youtu.be/lt1vnLJu1GU", id: uuidv4() },
    { url: "https://youtu.be/jh8QAn523bE", id: uuidv4() },
    { url: "https://youtu.be/gMua6elTmHg", id: uuidv4() },
    { url: "https://youtu.be/qH6KhSZ6iwo", id: uuidv4() }]

    const renderTrusties = () => (
        <div className="p-3 believeUs mt-3 mb-3">
            <h1 className="h3 mb-3">Believe Us</h1>
            <ul className="list-unstyled d-flex flex-wrap justify-content-around">
                {videosLst.map(obj => (
                    <li className="responsive-container m-2" key={uuidv4()}>
                        <ReactPlayer
                            url={obj.url}
                            controls={true}
                            loop={true}
                            height="230px"
                            width="350px"
                        />
                    </li>
                ))}
            </ul>
        </div>
    )

    return (
        <div className="d-flex flex-column justify-content-between">
            <Header />
            <div className="HomeParentCon align-self-center">
                <BannerSection />
                <TopSellingProducts />
                {JoinAsASeller()}
                {Schemes()}
                {renderTrusties()}
            </div>
            <Footer />
        </div>
    )
}
export default Home
import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import "./index.css"
import { serverUrl } from "../../sources";
import Header from '../Header';
import Footer from '../Footer';
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie';


const apiStatusConstants = {
    fail: "Failed",
    success: "Successful",
    load: "Loading",
    inital: 'inital'
}
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "grey"]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
}
const data = [{ name: "Clothing", value: 23 }, { name: "Farm Products", value: 121 }, { name: "Pulses", value: 53 }, { name: "Electronics", value: 76 }, { name: "Others", value: 19 }]
const salesData = [{ Views: 23, Sales: 15, date: "22nd Jan" }, { Views: 53, Sales: 24, date: "23rd Jan" }, { Views: 73, sellers: 61, date: "24th Jan" }, { Views: 43, Sales: 34, date: "25th Jan" }, { Views: 33, Sales: 27, date: "26th Jan" }, { Views: 99, Sales: 54, date: "27th Jan" }, { Views: 12, Sales: 9, date: "28th Jan" }]
const dataEarnings = [
    {
        name: 'January',
        2021: 4000,
        2022: 2400,
        amt: 2400,
    },
    {
        name: 'February',
        2021: 3000,
        2022: 1398,
        amt: 2210,
    },
    {
        name: 'March',
        2021: 2000,
        2022: 5800,
        amt: 2290,
    },
    {
        name: 'April',
        2021: 2780,
        2022: 3908,
        amt: 2000,
    },
    {
        name: 'May',
        2021: 1890,
        2022: 4800,
        amt: 2181,
    },
    {
        name: 'June',
        2021: 2390,
        2022: 3800,
        amt: 2500,
    },
    {
        name: 'July',
        2021: 3490,
        2022: 4300,
        amt: 2100,
    },
    {
        name: 'Auguest',
        2021: 3490,
        2022: 9000,
        amt: 2100,
    },
    {
        name: 'September',
        2021: 6490,
        2022: 8500,
        amt: 2100,
    },
    {
        name: 'October',
        2021: 3390,
        2022: 6500,
        amt: 2100,
    },
    {
        name: 'November',
        2021: 4590,
        2022: 7700,
        amt: 2100,
    },
    {
        name: "December",
        2021: 7890,
        2022: 9450,
        amt: 2100,
    },
];

const SellerDashboard = (props) => {
    const [isSellerApiStatus, setIsSellerApiStatus] = useState(apiStatusConstants.inital)

    const verifySeller = async () => {
        setIsSellerApiStatus(apiStatusConstants.load)
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
            const response2 = await fetch(url2)
            const result2 = await response2.json()
            const url3 = `${serverUrl}/seller/details`
            const result3 = await fetch(url3, options)
            const response3 = await result3.json()
            if (result2.user.isSeller) {
                setIsSellerApiStatus(apiStatusConstants.success)
            } else {
                const { history } = props
                history.replace("/seller/register")
            }

        } catch (err) {
            console.log("Could not get verify seller account of the user", err)
            setIsSellerApiStatus(apiStatusConstants.fail)
        }

    }

    useEffect(() => {
        verifySeller()
    }, [])

    const adjustUnits = num => {
        if (num > 1000) {
            const val = num / 1000
            return `${val}k`
        }
        return num
    }

    const renderCategoryGraph = () => (
        <div className='d-flex flex-column p-3 shadow-lg'>
            <h1 className="mt-3 h3 text-white">Your Contribution</h1>
            <p className='text-secondary'>This is the statastics of the products that you have uploaded into the dibuy site in terms categories.The statastics might vary due to the network issues.Don't worry we will keep it udpated.</p>
            <PieChart width={450} height={450} className="align-self-center ">
                <Legend iconType="circle" />
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius="80%"
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index + 1}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
            </PieChart>
            <div className='mt-5 text-dark'>
                <h1 className='h5 text-white mb-3'>Quick Tips for Choosing Categories</h1>
                <div className="d-flex flex-row p-3 card" >
                    <img className="quickImage col-3" src="https://img.freepik.com/premium-vector/quick-tip-is-label-useful-clues-with-light-characters-icon-creative-sticker_561455-251.jpg?w=740" alt="CardImage" />
                    <div className="card-body">
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
        </div>
    )

    const renderSalesGraph = () => (
        <div className='d-flex flex-column p-3 shadow-lg mt-4'>
            <h1 className="mt-3 h3 text-white">Your Sales</h1>
            <p className='text-secondary mb-5'>This is the statastics of the sales and views of your products that you have uploaded into the dibuy site.The statastics might vary due to the network issues.Don't worry we will keep it udpated.</p>
            <BarChart
                width={1000}
                height={300}
                data={salesData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" horizontal="" vertical="" />
                <XAxis dataKey="date" tick={{ fill: 'white' }} />
                <YAxis tick={{ fill: 'white' }} tickFormatter={adjustUnits} />
                <Tooltip
                    contentStyle={{
                        color: 'black',
                        fontFamily: 'sans-serif',
                    }}
                    itemStyle={{ color: 'brown' }}
                />
                <Legend iconType="square" />
                <Bar
                    dataKey="Views"
                    fill="#cffafe"
                    stroke="white"
                    strokeWidth="1px"
                    barSize="20%"
                />
                <Bar
                    dataKey="Sales"
                    fill="#44c4a1"
                    stroke="white"
                    strokeWidth="1px"
                    barSize="20%"
                />
            </BarChart>
            <div className='mt-5 text-dark'>
                <h1 className='h5 text-white mb-3'>Get Benifited with Tips!</h1>
                <div className="d-flex flex-row p-3 card" >
                    <div className="card-body">
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <img className="quickImage col-3" src="https://img.freepik.com/premium-vector/helpful-tips-business-quick-trick-generate-good-idea-guidance-advance-career-increase-skills-concepts-smart-businessman-showcase-secret-information-advice-finding-solution_269730-1755.jpg?w=740" alt="CardImage" />
                </div>
            </div>
        </div>
    )

    const renderEarningsGraph = () => (
        <div className='d-flex flex-column p-3 shadow-lg mt-4'>
            <h1 className="mt-3 h3 text-white">Your Sales</h1>
            <p className='text-secondary mb-5'>This is the statastics of the sales and Earnings of your products that you have uploaded into the dibuy site.The statastics might vary due to the network issues.Don't worry we will keep it udpated.</p>
            <ResponsiveContainer width="100%" aspect={2} className="col-8 align-self-center mt-5">
                <LineChart width={200} height={100} data={dataEarnings} className="text-white">
                    <XAxis dataKey="name" interval="preserveEnd" />
                    <YAxis interval="preserveEnd" />
                    <Legend />
                    <Line type="monotone" dataKey="2021" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="2022" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
            <div className='mt-5 text-dark'>
                <h1 className='h5 text-white mb-3'>Tips to Boost Sales</h1>

                <div className="d-flex flex-row p-3 card" >
                    <img className="quickImage col-3" src="https://img.freepik.com/premium-vector/quick-tip-is-label-useful-clues-with-light-characters-icon-creative-sticker_561455-265.jpg?w=740" alt="CardImage" />
                    <div className="card-body">
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>

                </div>
            </div>
        </div>
    )

    const renderSuccessView = () => (
        <>
            <Header />
            <div className='GraphCon d-flex flex-column'>
                <div className='subGraphCon align-self-center p-3'>
                    <h1 className='h1 text-warning'>DashBoard</h1>
                    {renderEarningsGraph()}
                    {renderCategoryGraph()}
                    {renderSalesGraph()}
                </div>
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

    const renderUi = () => {
        switch (isSellerApiStatus) {
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
export default SellerDashboard
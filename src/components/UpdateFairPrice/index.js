import "./index.css"
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';
import { useState, useEffect } from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { serverUrl } from "../../sources";
import Cookies from "js-cookie";

const cateogories = [
    {
        value: 'crops',
        label: 'Crops',
    },
    {
        value: 'pulses',
        label: 'Pulses',
    },
    {
        value: 'grains',
        label: 'Grains',
    },
    {
        value: 'nuts',
        label: 'Nuts',
    },
    {
        value: 'others',
        label: 'Others',
    },
];

const UpdateFairPrice = () => {
    const [category, setCategory] = useState("crops")
    const [mrp, setMrp] = useState(0)
    const [dealerPrice, setDealerPrice] = useState(0)
    const [product, setProduct] = useState("")
    const [categoryProducts, setCategoryProducts] = useState([])
    const [loader, setLoader] = useState(false)
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)

    const getCorrespondingProducts = async () => {
        try {
            const url = `${serverUrl}/fair-price/getproducts?category=${category}`
            // const url = `http://localhost:4000/fair-price/getproducts?category=${category}`
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Cookies.get("jwtToken")}`,
                    // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJzcmludXNyaTc2NTg1QGdtYWlsLmNvbSIsImlhdCI6MTY3NDcwODgzMX0.QNkp8Y4jhoKIezwAm8Nc4RYtHYeTX7AbgifIRLfCvpY`,
                }
            }
            const response = await fetch(url, options)
            const result = await response.json()
            setCategoryProducts(result.categoryProductsList)
            setDealerPrice(0)
            setMrp(0)
            setLoader(false)
        } catch (err) {
            console.log("Error in getCorrespondingProducts", err)
            setLoader(false)
        }
    }

    useEffect(() => {
        getCorrespondingProducts()
    }, [category])

    const categoryChanged = (event) => {
        setCategory(event.target.value)
        setLoader(true)
    }

    const updateFairPrice = async () => {
        try {
            const url = `${serverUrl}/fair-price/update`
            // const url = `http://localhost:4000/fair-price/update`
            const options = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${Cookies.get("jwtToken")}`,
                    // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJzcmludXNyaTc2NTg1QGdtYWlsLmNvbSIsImlhdCI6MTY3NDcwODgzMX0.QNkp8Y4jhoKIezwAm8Nc4RYtHYeTX7AbgifIRLfCvpY`,
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    dealerPrice, mrp, category, product
                })
            }
            const response = await fetch(url, options)
            if (response.ok) {
                window.alert("Prices Updated Successfully.")
                setMrp(0)
                setCategory("crops")
                setDealerPrice(0)
            } else {
                window.alert("Please Try Again!")
            }
            const result = await response.json()
        } catch (err) {
            console.log("Error in updateFairPrice", err)
            window.alert("Something Went Wrong!")
        }
        setIsFormSubmitted(false)
    }

    const formSubmitted = (event) => {
        event.preventDefault();
        setIsFormSubmitted(true)
        updateFairPrice()
    }

    const onChangeProduct = (event) => {
        setProduct(event.target.value)
        const filteredObj = categoryProducts.filter(obj => obj.value === event.target.value)
        console.log(filteredObj[0])
        setMrp(filteredObj[0].fairPrice)
        setDealerPrice(filteredObj[0].dealerPrice)
    }

    const renderForm = () => (
        <form className="p-5 rounded" style={{ backgroundColor: "#F7F7F7" }} onSubmit={formSubmitted}>
            <TextField
                id="standard-select-currency"
                select
                label="Select"
                defaultValue="EUR"
                helperText="Please select Category"
                variant="standard"
                className="w-100 mb-3"
                value={category}
                onChange={categoryChanged}
                required
            >
                {cateogories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="standard-select-currency"
                select
                label="Select"
                helperText="Please select Item"
                variant="standard"
                className="w-100 mb-3"
                value={product}
                onChange={onChangeProduct}
                required
            >
                {categoryProducts.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField id="standard-basic" label="MRP" variant="standard" type="number" className="w-100 mb-3" helperText="Please type MRP" onChange={(event) => setMrp(event.target.value)} value={mrp} required />
            <TextField id="standard-basic" label="Dealer Price" type="number" variant="standard" className="w-100" helperText="Please enter Dealer price" onChange={(event) => setDealerPrice(event.target.value)} value={dealerPrice} required />
            <Button variant="contained" startIcon={<UpdateIcon />} className="float-right mt-2" type="submit" disabled={isFormSubmitted}>
                Update
            </Button>
        </form>
    )

    const renderBackdrop = () => (
        <Backdrop
            sx={{ color: '#f50057', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loader}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="contentCon d-flex flex-column vh-100">
                <h1 className="h2 text-warning">Fair Update</h1>
                <div className="col-5 mb-5 align-self-center d-flex mt-5">
                    {loader ? renderBackdrop() : renderForm()}
                </div>
            </div>
        </div >
    )
}


export default UpdateFairPrice
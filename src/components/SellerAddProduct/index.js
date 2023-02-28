import "./index.css"
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { serverUrl } from "../../sources";
import Cookies from "js-cookie";
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { v4 as uuidv4 } from "uuid"


const availableCategories = [{ displayText: "Vegetables", id: "Vegetables" }, { displayText: "Fruits", id: "Fruits" }, { displayText: "Electronics", id: "Electronics" }, { displayText: "Pulses", id: "Pulses" }, { displayText: "Others", id: "Others" }, { displayText: "Grains", id: "Grains" }]
const SellerAddProduct = () => {
    const [submited, setSubmited] = useState(false)
    const [title, setTitle] = useState("")
    const [quantity, setQuantity] = useState("")
    const [quality, setQuality] = useState("")
    const [price, setPrice] = useState()
    const [description, setDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [saleType, setSaleType] = useState("general")
    const [selectCategory, setSelectCategory] = useState("Others")


    const addProduct = async () => {

        try {
            const url = `${serverUrl}/products/add`
            // const url = "http://localhost:4000/products/add"
            const options = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${Cookies.get("jwtToken")}`,
                    // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJzcmludXNyaTc2NTg1QGdtYWlsLmNvbSIsImlhdCI6MTY3NDcwODgzMX0.QNkp8Y4jhoKIezwAm8Nc4RYtHYeTX7AbgifIRLfCvpY`,
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    imageUrl, category: selectCategory, quality, quantity, description, title, price, saleType
                })
            }
            // console.log(imageUrl, selectCategory, quality, quantity, description, title, price, saleType)
            const response = await fetch(url, options)
            const result = await response.json()
            setTitle("")
            setDescription("")
            setImageUrl("")
            setPrice(0)
            setQuality("")
            setQuantity("")
            console.log(result, options)
        } catch (err) {
            console.log("Something went wrong in uploading the product", err)
        }

    }

    useEffect(() => {
        if (submited) {
            addProduct()
        }
    }, [submited])


    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const uploadImage = async (event) => {
        const file = event.target.files[0]
        const decodedFile = await convertToBase64(file)
        setImageUrl(decodedFile)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setSubmited(!submited)
    }

    const renderSellerAddProductView = () => (
        <div className="addProductCon mt-3 p-5 d-flex justify-content-center">
            <form className="card p-5 d-flex flex-row col-7 formConSeller" onSubmit={onSubmit}>
                <div className="d-flex flex-column col-6">
                    <p className="text-secondary m-0 ml-2 small">Select Category</p>
                    <Select
                        label="Category"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectCategory}
                        size="normal"
                        className="m-2 ml-0"
                        onChange={(event) => setSelectCategory(event.target.value)}
                        required
                    >
                        {availableCategories.map(obj => <MenuItem value={obj.id} key={uuidv4()}>{obj.displayText}</MenuItem>)}
                    </Select>
                    <TextField type="text" required label="Title" variant="outlined" className="m-2" onChange={(event) => setTitle(event.target.value)} />
                    <TextField type="text" required label="Quantity" variant="outlined" className="m-2" onChange={(event) => setQuantity(event.target.value)} />

                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={saleType}
                        size="normal"
                        className="m-2 ml-0"
                        onChange={(event) => setSaleType(event.target.value)}
                        required
                    >
                        <MenuItem value="general">General</MenuItem>
                        <MenuItem value="government">Government</MenuItem>
                        <MenuItem value="rent">Rent</MenuItem>
                    </Select>
                </div>
                <div className="d-flex flex-column col-6">
                    <TextField type="text" required label="Quality" variant="outlined" className="m-2 mt-4" onChange={(event) => setQuality(event.target.value)} />
                    <TextField label="Price" required type="number" variant="outlined" className="m-2" onChange={(event) => setPrice(event.target.value)} />
                    <TextField type="text" required label="Description" variant="outlined" className="m-2" onChange={(event) => setDescription(event.target.value)} />
                    <>

                        <IconButton color="secondary" aria-label="upload picture" component="label" className="align-self-end">
                            <Button
                                variant="outlined"
                                color="info"
                            >
                                <input accept="image/*" type="file" onChange={uploadImage} className="p-0 m-0 col-10" />
                                <PhotoCamera sx={{}} />
                            </Button>
                        </IconButton>
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            sx={{ pl: 3, pr: 3, mt: 5, mb: 5 }}
                        >
                            {submited ? "Add More" : "Add"}
                        </Button>
                    </>
                </div>
            </form>
        </div >
    )



    const renderAddProductSuccessView = () => (
        <div className="d-flex flex-column mt-3">
            <div className=" d-flex flex-column justify-items-center align-items-center">
                <div className="">
                    <img src="https://img.freepik.com/free-vector/webrooming-abstract-concept-illustration_335657-3898.jpg?w=740&t=st=1675242821~exp=1675243421~hmac=ed561424b3c0b56dfdcfaae889ac310a23523112018a9581b4d02eafd6503f91" alt="" className="productSuccssAdd" />
                </div>

                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ pl: 3, pr: 3, mt: 5 }}

                    onClick={() => setSubmited(!submited)}
                >
                    {submited ? "Add More" : "Add"}
                </Button>
            </div>
        </div>)



    return (
        <div className="d-flex justify-content-center">
            <div className="p-3 manageSellerCon d-flex flex-column">
                <div className="w-100">
                    <div className="d-flex">
                        <div className="d-flex flex-column">
                            <h1 className="h2 text-dark mb-3 mt-3">Add Product</h1>
                            <div className="m-0 p-0 align-self-center bg-info horizCon"><hr className="m-0 p-0 horiz rounded" /></div>
                        </div>
                    </div>
                    {submited ? renderAddProductSuccessView() : renderSellerAddProductView()}
                </div>
            </div>
        </div >
    )
}
export default SellerAddProduct
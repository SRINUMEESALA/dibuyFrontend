import { useState } from "react"
import "./index.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { serverUrl } from "../../sources";
import Cookies from "js-cookie"

const ManageSellerAccount = (props) => {
    const [isEdit, setIsEdit] = useState(false)
    const [accountHolderName, setAccountHolderName] = useState(props.seller.accountHolderName)
    const [accountNumber, setAccountNumber] = useState(props.seller.accountNumber)
    const [IFSC, setIFSC] = useState(props.seller.IFSC)

    // console.log("seller object is", accountHolderName, accountNumber, IFSC, props.seller)

    const updateDetails = async () => {
        try {
            const url = `${serverUrl}/seller/update`
            // const url = `http://localhost:4000/seller/update`
            const options = {
                method: "POST",
                body: JSON.stringify({
                    accountHolderName, accountNumber, IFSC
                }),
                headers: {
                    "Authorization": `Bearer ${Cookies.get("jwtToken")}`,
                    // "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJzcmludXNyaTc2NTg1QGdtYWlsLmNvbSIsImlhdCI6MTY3NDcwODgzMX0.QNkp8Y4jhoKIezwAm8Nc4RYtHYeTX7AbgifIRLfCvpY`,
                    "content-type": "application/json"
                }

            }
            const response = await fetch(url, options)
            const result = await response.json()
            // console.log(result)
        } catch (err) {
            console.log("could not updated account details", err)
        }
    }
    if (!isEdit) {
        updateDetails()
    }


    const renderShowView = () => (
        <div className=" d-flex mb-3">
            <div className="col-6 d-flex flex-column justify-content-center">
                <div className="renderShowViewCon p-5 rounded">
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-between">
                            <h1 className="h5 text-dark mb-3">Account Holder Name :</h1>
                            {!isEdit ? <h1 className="h5 text-secondary">{accountHolderName}</h1> :
                                <TextField
                                    type="text"
                                    variant="standard"
                                    className="m-2"
                                    onChange={(event) => setAccountHolderName(event.target.value)}
                                    value={accountHolderName}
                                />}
                        </div>
                        <div className="d-flex justify-content-between">
                            <h1 className="h5 text-dark mb-3">Account Number :</h1>
                            {!isEdit ? <h1 className="h5 text-secondary">{accountNumber}</h1> :
                                <TextField
                                    type="text"
                                    variant="standard"
                                    className="m-2"
                                    onChange={(event) => setAccountNumber(event.target.value)}
                                    value={accountNumber}
                                />}
                        </div>
                        <div className="d-flex justify-content-between">
                            <h1 className="h5 text-dark mb-3">IFSC :</h1>
                            {!isEdit ? <h1 className="h5 text-secondary">{IFSC}</h1> :
                                <TextField
                                    type="text"
                                    variant="standard"
                                    className="m-2"
                                    onChange={(event) => setIFSC(event.target.value)}
                                    value={IFSC}
                                />}
                        </div>
                    </div>
                    <div className="text-right mt-3">
                        <Button
                            variant="contained"
                            color="info"
                            onClick={() => setIsEdit(!isEdit)}
                        >
                            {isEdit ? "Save" : "Edit"}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="col-6 text-center">
                <img src="https://img.freepik.com/free-vector/bank-login-concept-illustration_114360-7864.jpg?w=740&t=st=1675228866~exp=1675229466~hmac=626e236ff84287743025c2cd79082a05b1937ee69bc839012774de65d9859b31" alt="account" className="imageCon" />
            </div>
        </div>
    )

    return (
        <div className="d-flex justify-content-center">

            <div className="p-3 manageSellerCon d-flex flex-column">
                <div className="w-100">
                    <div className="d-flex">
                        <div className="d-flex flex-column">
                            <h1 className="h2 text-dark mb-3 mt-3">Your Seller Account</h1>
                            <div className="m-0 p-0 align-self-center bg-info horizCon"><hr className="m-0 p-0 horiz rounded" /></div>
                        </div>
                    </div>
                    {renderShowView()}
                </div>
            </div>

        </div >
    )
}
export default ManageSellerAccount
import * as React from 'react';
import { Link, Redirect } from "react-router-dom"
import Cookies from "js-cookie"
import Slide from '@mui/material/Slide';
import { withRouter } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { MuiOtpInput } from 'mui-one-time-password-input'
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import { serverUrl } from "../../sources";
import "./index.css"
import { useState } from 'react';

// For MUI styles
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const UserLogin = (props) => {
    const [email, setEmail] = useState("")
    const [isTermsAgreed, setIsTermsAgreed] = useState(true)
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [sentOtp, setSentOtp] = useState(false)
    const [otp, setOtp] = useState("");
    const [isValidOtp, setIsValidOtp] = useState(false)
    const [isSubmitClicked, setIsSubmitClicked] = useState(false)
    const [open, setOpen] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false)

    // console.log(email, isValidEmail)
    // console.log(otp, isValidOtp)
    // console.log("rendereed", sentOtp)
    const isUserLoggedIn = () => {
        if (Cookies.get("jwtToken") !== undefined) {
            return <Redirect to="/" />
        }
    }
    isUserLoggedIn()

    const options = {
        method: "POST",
        body: JSON.stringify({
            UserEmail: email
        }),
        headers: { 'Content-Type': 'application/json' }
    }

    const sendOtp = async () => {
        setSnackBarOpen(true)
        const response = await fetch(`${serverUrl}/user/sendotp`, options)
        const data = await response.json()
        console.log(data)

    }

    const verifyOtp = async (value) => {
        const options2 = {
            method: "POST",
            body: JSON.stringify({
                UserEmail: email,
                receivedOtp: value

            }),
            headers: { 'Content-Type': 'application/json' }
        }
        const response = await fetch(`${serverUrl}/user/verifyotp`, options2)
        const data = await response.json()
        // console.log(response)
        // console.log(data)
        if (response.ok) {
            const jwtToken = data.jwt_Token
            Cookies.set("jwtToken", jwtToken, { expires: 30 })
            setIsValidOtp(true)
            setTimeout(() => {
                const { history } = props
                history.replace("/")
            }, 3000)

        } else {
            setIsValidOtp(false)
        }
    }


    const onClickGetOtp = async () => {
        const regex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
        const CheckingEmail = regex.test(email)
        if (CheckingEmail) {
            // verify user in db
            // console.log("isUserExists triggered")
            const options = {
                method: "POST",
                body: JSON.stringify({
                    email
                }),
                headers: { 'Content-Type': 'application/json' }
            }
            try {
                const response = await fetch(`${serverUrl}/user/verify`, options)
                const result = await response.json()
                const isUserExists = result.exist
                if (isUserExists) {
                    setSentOtp(true)
                    setIsValidEmail(true)
                    sendOtp()
                    setSnackBarOpen(true)
                } else {
                    const { history } = props
                    history.replace("/register")
                }
            } catch (err) {
                console.log("Could not verify the user", err)
            }
        } else {
            setIsValidEmail(false)
        }
    }

    const handleChange = (newValue) => {
        setOtp(newValue);
        setIsSubmitClicked(false)
    };

    const onClickSignIn = (value) => {
        setIsSubmitClicked(true)
        verifyOtp(value)

    }

    const handleTermsCondsDialog = () => {
        setOpen(true);
    };

    const handleCloseTermsConds = () => {
        setOpen(false);
    };

    const openTermsAndConds = () => (
        <Dialog
            open={open}
            onClose={handleCloseTermsConds}
            aria-labelledby="draggable-dialog-title"

        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                DiBuy
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    The Website Terms & Conditions is a legal document that details the terms and conditions that the user must abide by while using the website. The website terms and conditions agreement details the license of the copyright in the website, includes a disclaimer of liability, an acceptable use clause, a variation clause, a clause specifying the applicable law and jurisdiction and other legal information.The Website Terms & Conditions is a legal document that details the terms and conditions that the user must abide by while using the website. The website terms and conditions agreement details the license of the copyright in the website, includes a disclaimer of liability, an acceptable use clause, a variation clause, a clause specifying the applicable law and jurisdiction and other legal information.The Website Terms & Conditions is a legal document that details the terms and conditions that the user must abide by while using the website. The website terms and conditions agreement details the license of the copyright in the website, includes a disclaimer of liability, an acceptable use clause, a variation clause, a clause specifying the applicable law and jurisdiction and other legal information.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseTermsConds}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )

    const renderMobileEnteringScreen = () => (
        <div className="card-body d-flex flex-column pb-0 mt-2 justify-content-around">
            <div>
                <h1 className="h4 loginHeading mb-3">Log In</h1>
                <TextField id="outlined-basic" label="Email" variant="outlined" color={isValidEmail ? "secondary" : "error"} size="small" className='w-100' style={{ backgroundColor: "#F3F7FA" }} type="email" onChange={(event) => setEmail(event.target.value)} value={email} />
                {!isValidEmail && <p className='small m-0 text-danger'>Please Enter Valid Email Address</p>}
                <div className="d-flex align-items-center mt-3">

                    <Checkbox {...label} checked={isTermsAgreed} style={{ padding: "0px", backgroundColor: "#F3F7FA", color: "#58243D" }} className="mr-2" onChange={(event) => { setIsTermsAgreed(event.target.checked) }} />

                    <>
                        <p className='small m-0' onClick={handleTermsCondsDialog}>By clicking on this button, you are agreeing to our <b className="termsConds">Terms & Condition</b> and <b className="termsConds">Privacy Policy</b></p>
                        {openTermsAndConds()}
                    </>
                </div>
                <p className='small m-0 text-danger mb-3'>{!isTermsAgreed && "Please Accept Terms&Conditions"}</p>
            </div>
            <div >
                <Button variant="contained" className='w-100 mt-3' style={{ backgroundColor: "#58243D" }} onClick={onClickGetOtp}>Get OTP</Button>
                <p className='small text-center mt-2 newUser'><Link to="/register">Register as a new user?</Link></p>
            </div>
        </div>
    )

    const showMsg = () => {
        if (!isValidOtp) {
            return <>
                <Alert severity="error" onClose={() => setIsSubmitClicked(false)} className="mb-2">
                    <AlertTitle>Entered OTP is Mismatched!</AlertTitle>
                    Please check the OTP again.
                </Alert>
            </>
        }
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    };

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnack}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    const snackBar = () => (

        <Snackbar
            open={snackBarOpen}
            autoHideDuration={3000}
            onClose={handleCloseSnack}
            action={action}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            TransitionComponent={Slide}
        >
            <Alert severity="success" sx={{ width: "30vw" }} className="text-center">OTP Sent Successfully!</Alert>
        </Snackbar>
    )


    const renderMobileVerificationScreen = () => (
        <div className="card-body d-flex flex-column pb mt-2 justify-content-around">
            <div>
                {isSubmitClicked && showMsg()}
                <h1 className="h5 loginHeading mb-2">Verify Email</h1>
                <p className='mt-0'>Code sent to - {email}</p>
                <MuiOtpInput
                    length={6}
                    onComplete={onClickSignIn}
                    value={otp}
                    onChange={handleChange}
                    TextFieldsProps={{
                        disabled: false,
                        size: "small",
                        placeholder: "0",
                        color: "secondary",
                        variant: "outlined",
                        type: "number",
                        style: { backgroundColor: "#F3F7FA" }
                    }}
                />
            </div>
            <div className="d-flex flex-column">
                <p className="small m-0 text-right mt-2">Did not receive an OTP?</p>
                <p href="www.printila.com" className='small m-0 text-right text-primary termsConds' onClick={sendOtp}>Request again</p>
            </div>
            <div >
                <Button variant="contained" className='w-100 mt-3' style={{ backgroundColor: "#58243D" }} onClick={onClickSignIn}>{isValidOtp ? <CircularProgress color='primary' /> : "Sign In"}</Button>
            </div>
            {snackBar()}
        </div>
    )


    return (
        <div className="loginParentCon d-flex justify-content-center align-items-center">
            <div className="card  text-secondary cardConLoginSeller">
                {isValidOtp && <LinearProgress sx={{ width: "100%" }} />}
                <div className="card-header text-center p-3">
                    <h1 className="h2 WebHeading">DiBuy</h1>
                </div>
                {sentOtp ? renderMobileVerificationScreen() : renderMobileEnteringScreen()}
            </div>
            <img src="https://res.cloudinary.com/radhekrishn/image/upload/v1671690028/Group_9485_riight_uuxuls.png" alt="arrowsImage" className="rightArrowImage" />
            <img src="https://res.cloudinary.com/radhekrishn/image/upload/v1671690028/Group_9486_rkjrgc.png" alt="leftArrowImg" className="leftArrowImg" />
        </div>
    )
}
export default withRouter(UserLogin)

















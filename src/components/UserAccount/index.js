import "./index.css"
import React from "react"
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiMobile } from "react-icons/bi";
import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import IconButton from '@mui/material/IconButton';
import { IoMdArrowRoundBack } from "react-icons/io";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import Header from "../Header"
import Footer from "../Footer"
import { serverUrl } from "../../sources";
import Cookies from "js-cookie";
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';



const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));

const handleMouseDownPassword = (event) => {
    event.preventDefault();
};


const apiStatusConstants = {
    fail: "Failed",
    success: "Successful",
    load: "Loading",
    initial: 'initial'
}

const UserAccount = () => {
    const [qr, setQr] = useState(false)
    const [qrImage, setQrImage] = useState("")
    const [resetPassword, setResetPassword] = useState(false)
    const [passwordOne, setPassowordOne] = useState("")
    const [passwordTwo, setPassowordTwo] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [show, setShow] = useState(false)
    const [qrApiStatus, setQrApiStatus] = useState(apiStatusConstants.initial)
    const [user, setUser] = useState({})
    const [accountCardApiStatus, setAccountCardApiStatus] = useState(apiStatusConstants.initial)
    const [profilePic, setProfilePic] = useState("")
    const [snackBarOpen, setSnackBarOpen] = useState(false)

    const InputImageEleRef = React.useRef(null)

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
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            TransitionComponent={Slide}
        >
            <Alert severity="success" sx={{ width: "30vw" }} className="text-center">Changes Saved Successfully.</Alert>
        </Snackbar>
    )



    const onClickChangePasswordAndProfilePic = async (type) => {
        try {
            if ((passwordOne === passwordTwo && passwordOne !== "") || profilePic !== "") {
                // apiCall
                const options = {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer ${Cookies.get("jwtToken")}`
                    },
                    body: JSON.stringify({
                        profilepic: profilePic
                    })
                }
                const url = `${serverUrl}/user/update?newpassword=${passwordOne}`
                const response = await fetch(url, options)
                const result = await response.json()
                if (response.ok) {
                    setSuccess(true)
                    setError(false)
                    setSnackBarOpen(true)
                    setTimeout(() => {
                        setResetPassword(false)
                        setSuccess(false)
                        setPassowordOne("")
                        setPassowordTwo("")
                        setProfilePic("")
                    }, 2000)
                    // console.log(result, url)
                } else {
                    console.log(result)
                }
            } else {
                if (passwordOne !== passwordTwo) {
                    setError(true)
                }

            }

        } catch (err) {
            console.log("something went wrong", err)
        }
    }

    const onClickUpload = () => {
        InputImageEleRef.current.click()
    }

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
        setProfilePic(decodedFile)
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    useEffect(() => {
        onClickChangePasswordAndProfilePic("profilePic")
    }, [profilePic])



    const getUserDetails = async () => {
        setAccountCardApiStatus(apiStatusConstants.load)
        try {
            const options = {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("jwtToken")}`
                }
            }
            const url = `${serverUrl}/user/getemail`
            const response = await fetch(url, options)
            const result = await response.json()
            const url2 = `${serverUrl}/users/${result.email}`
            const response2 = await fetch(url2, options)
            const result2 = await response2.json()
            if (response2.ok) {
                setUser(result2.user)
                setAccountCardApiStatus(apiStatusConstants.success)
            } else {
                setAccountCardApiStatus(apiStatusConstants.fail)
            }

        } catch (err) {
            console.log("something went wrong", err)
            setAccountCardApiStatus(apiStatusConstants.fail)
        }
    }

    const getQRcode = async () => {
        setQrApiStatus(apiStatusConstants.load)
        try {
            const options = {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("jwtToken")}`
                }
            }
            const url = `${serverUrl}/user/qr`
            const response = await fetch(url, options)
            const result = await response.json()
            if (response.ok) {
                setQrImage(result.qrImage)
                setQrApiStatus(apiStatusConstants.success)
            } else {
                setQrApiStatus(apiStatusConstants.fail)
            }


        } catch (err) {
            console.log("Something went wrong in getQRcode function", err)
            setQrApiStatus(apiStatusConstants.fail)
        }
    }



    const handleClickShowPassword = () => setShow((show) => !show);

    const handleClickOpen = () => {
        setQr(true);
        getQRcode()
    };

    const handleClose = () => {
        setQr(false);
    };

    // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKnSURBVO3BQY7DVgwFwX6E7n/ljpdcfUCQ7GQYVsUP1hjFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxRijVKsUa5eCgJv6RyRxI6lTuS8EsqTxRrlGKNUqxRLl6m8qYknCThRKVLwonKicqbkvCmYo1SrFGKNcrFlyXhDpU7VLoknKh0SXgiCXeofFOxRinWKMUapVijFGuUYo1SrFEu/rgk3JGEyYo1SrFGKdYoF1+m8k0qJ0k4UXlC5b+kWKMUa5RijXLxsiT8UhI6lROVLgmdykkS/suKNUqxRinWKPGDQZLQqfyfFGuUYo1SrFEuHkpCp9IloVPpktCpdEnoVE5UuiR0Kl0SOpU7ktCpnCShU3lTsUYp1ijFGiV+8ENJuEOlS8KJykkSOpU7knCHSpeEE5UnijVKsUYp1igXL0tCp9Kp3JGEE5WTJDyRhCeS8EvFGqVYoxRrlPjBFyWhU3lTEt6k8k1JOFF5olijFGuUYo1y8WUqXRI6lS4Jd6jckYRO5YkkdConKl0S3lSsUYo1SrFGiR/8YUm4Q+UkCU+o/JuKNUqxRinWKBcPJeGXVDqVLgl3JKFT6ZLwRBLuUHmiWKMUa5RijXLxMpU3JeGbVE5UuiTcodIl4ZuKNUqxRinWKBdfloQ7VO5IwonKSRI6lROVLgl3qHxTsUYp1ijFGuXij1M5ScKJyhMqXRLuUHlTsUYp1ijFGuXij0tCp9KpdEk4ScITKl0SOpUuCZ3KE8UapVijFGuUiy9T+SaVkyScJOFE5QmVLgmdypuKNUqxRinWKBcvS8IvJeFEpUtCp3KShDtU7khCp/JEsUYp1ijFGiV+sMYo1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxRijXKP9wUAu4lnz45AAAAAElFTkSuQmCC" 
    const renderDialogSuccessView = () => (
        <div className="">
            <img alt="qrImage" className="qrImage" src={qrImage} />
            <h1 className="text-secondary h6 text-center">Scan and Share QR</h1>
        </div>
    )


    const renderLoadingView = () => (
        <div
            className="text-center loader d-flex justify-content-center align-items-center h-100"
            testid="loader"
        >
            <Loader type="TailSpin" color="#FF5454" height={80} width={80} />
        </div>
    )


    const renderDialogUI = () => {
        switch (qrApiStatus) {
            case apiStatusConstants.success:
                return renderDialogSuccessView()
            default:
                return renderLoadingView()
        }
    }



    const renderDialog = () => (
        <Dialog
            open={qr}
            onClose={handleClose}
        >
            <div className="qrDialogCon d-flex flex-column justify-content-center align-items-center">
                {renderDialogUI()}
            </div>
        </Dialog>
    )

    const renderResetPassword = () => (
        <div className=" h-100 d-flex flex-column justify-content-center align-self-center">
            <div className="shadow userCon rounded w-100 p-3 d-flex flex-column">
                <h1 className="text-center h4 text-info">Reset Password</h1>
                <div className="col-6 align-self-center p-3">
                    <div className="text-secondary d-flex flex-column m-3 w-100">
                        <label htmlFor="Password">New Password</label>
                        <div className="w-100 ">
                            <TextField id="Password" className=" w-75" variant="standard" inputProps={{ style: { color: "white" } }} onChange={(event) => setPassowordOne(event.target.value)} value={passwordOne} type={show ? "text" : "password"} />
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                sx={{ color: "grey" }}
                            >
                                {show ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </div>

                    </div>
                    <div className="text-secondary d-flex flex-column m-3">
                        <label htmlFor="Password">Confirm Password</label>
                        <div className="">
                            <TextField id="Password" className="w-75" variant="standard" inputProps={{ style: { color: "white" } }} onChange={(event) => setPassowordTwo(event.target.value)} value={passwordTwo} type="password" />
                        </div>
                    </div>
                    {success && <p className="text-success h5">Password Successfully Changed</p>}
                    {error && <p className="text-danger h5">Enter same password in both fields.</p>}
                    <div className="text-right mt-4">
                        <Button variant="contained" color="info" onClick={() => onClickChangePasswordAndProfilePic("password")}>Save Changes</Button>
                    </div>

                </div>
                <span className="btn" onClick={() => setResetPassword(false)}>
                    <IoMdArrowRoundBack className="text-white backArrow h4" />
                </span>
            </div>
        </div>
    )

    const renderAccountCardSuccessView = () => (
        <div className="d-flex mainAccountCon text-white p-4 w-100 h-100">
            <div className=" h-100 d-flex flex-column align-items-center justify-content-center col-3">
                <div className="avatarCon">
                    <Avatar
                        alt="Remy Sharp"
                        src={user.profilePic}
                        sx={{ width: 100, height: 100, bgcolor: deepOrange[500], fontSize: 40 }}
                    >{user.name[0]}</Avatar>

                    <span className="uploadEle" onClick={onClickUpload}>

                        <input type="file" className="d-none" ref={InputImageEleRef} onChange={uploadImage} accept=".jpeg,.png,.jpg" />
                        <BootstrapTooltip TransitionComponent={Zoom} title="Please upload image less than 100KB and Do refresh once the upload gets completed to view changes">
                            <CameraAltIcon className="camIcon" sx={{ color: "#eeeeee" }} />
                        </BootstrapTooltip>

                    </span>
                </div>

                <h1 className="h5 mt-3 text-primary setqr" onClick={handleClickOpen} >Your QR</h1>
            </div>
            <div className="d-flex flex-row text-warning justify-content-around col-9">
                <div className="d-flex flex-column justify-content-around col-8 text-truncate">
                    <div className="d-flex">
                        <div className="mr-3">
                            <AiOutlineUser className="h3 m-0 p-0 text-secondary" />
                        </div>
                        <div className="">
                            <p className="text-secondary" id="username">Username</p>
                            <h1 className="h5">{user.name}</h1>
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className="mr-3">
                            <HiOutlineMail className="h3 m-0 p-0 text-secondary" />
                        </div>
                        <div className="w-100">
                            <p className="text-secondary">Email</p>
                            <h1 className="h5 mr-2">{`${user.email.slice(0, 21)}...`}</h1>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="mr-3">
                            <BiMobile className="h3 m-0 p-0 text-secondary" />
                        </div>
                        <div className="">
                            <p className="text-secondary">Phone</p>
                            <h1 className="h5">{user.mobile}</h1>
                        </div>
                    </div>
                </div>
                <div className="align-self-center d-flex flex-column justify-content-around h-100 col-4">
                    <div className="d-flex">
                        <div className="mr-3">
                            <RiLockPasswordLine className="h3 m-0 p-0 text-secondary" />
                        </div>
                        <div className="">
                            <p className="text-secondary">Password</p>
                            <h1 className="h5">xxxxxxxxx</h1>
                        </div>

                    </div>
                    <div className="">
                        <img src="https://img.freepik.com/premium-photo/top-view-lock-with-username-password-information_23-2148578101.jpg?w=740" alt="password" className="passwordImage rounded shadow-lg" />
                        <div className="">
                            <p className="text-secondary text-right m-0 p-0 mt-2">Forgot Password ?</p>
                            <p className="text-info text-right small resetPassword" onClick={() => setResetPassword(true)}>Click here</p>
                        </div>
                    </div>
                </div>
            </div>
            {snackBar()}
        </div>
    )

    const renderAccountCardUI = () => {
        switch (accountCardApiStatus) {
            case apiStatusConstants.success:
                return renderAccountCardSuccessView()
            default:
                return renderLoadingView()
        }
    }

    const renderAccountCard = () => (
        <div className=" h-100 d-flex flex-column justify-content-center align-self-center">
            <div className="shadow userCon rounded w-100">
                {renderAccountCardUI()}
            </div>
            {renderDialog()}
        </div>
    )

    return (
        <>
            <Header />
            <div className="UserAccountParentCon d-flex flex-column vh-100 p-4">
                <h1 className="h2 text-center text-white">Your Account</h1>
                {resetPassword ? renderResetPassword() : renderAccountCard()}
            </div>
            <Footer />
        </>
    )
}
export default UserAccount




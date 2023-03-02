import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Cookies from "js-cookie"
import Header from "../Header"
import Footer from "../Footer"
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { serverUrl } from "../../sources";
import "./index.css"

const apiStatusConstants = {
    fail: "Failed",
    success: "Successful",
    load: "Loading",
    inital: 'inital'
}
const steps = ['Terms And Conditions', 'Create an Account', 'Finish & Proceed!'];

export default function SellerRegistration(props) {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [errorStepNumber, setErrorStepNumber] = useState()

    const [accountNumber, setAccountNumber] = useState(1234567890)
    const [accountHolderName, setAccountHolderName] = useState("")
    const [IFSC, setIFSC] = useState("")
    const [isFormFilled, setIsFormFilled] = useState(false)
    const [isSellerExists, setIsSellerExists] = useState(apiStatusConstants.inital)

    const registerSeller = async () => {
        const url = `${serverUrl}/seller/register`
        const options = {
            method: "POST",
            body: JSON.stringify({
                accountHolderName,
                accountNumber,
                IFSC
            }),
            headers: {
                "Authorization": `Bearer ${Cookies.get("jwtToken")}`,
                "content-type": "application/json"
            }
        }
        try {
            const response = await fetch(url, options)
            const result = await response.json()
            if (response.status === 201) {
                // console.log(result)
                const { history } = props
                history.replace("/sellerCorner")
            } else {
                console.log("error occured")
            }

        } catch (err) {
            console.log("error occured", err)
        }
    }

    const verifySeller = async () => {
        setIsSellerExists(apiStatusConstants.load)
        try {
            const url = `${serverUrl}/user/getemail`
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Cookies.get("jwtToken")}`,
                    "content-type": "application/json"
                }
            }
            const response = await fetch(url, options)
            const result = await response.json()
            const url2 = `${serverUrl}/users/${result.email}`
            const response2 = await fetch(url2)
            const result2 = await response2.json()
            if (result2.user.isSeller) {
                setIsSellerExists(apiStatusConstants.success)
                const { history } = props
                history.replace("/sellercorner")
            } else {
                setIsSellerExists(apiStatusConstants.fail)

            }

        } catch (err) {
            console.log("Could not get email of the user", err)
            setIsSellerExists(apiStatusConstants.fail)
        }

    }

    React.useEffect(() => {
        verifySeller()
    }, [])

    if (isFormFilled) {
        registerSeller()
    }

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };
    const isStepFailed = (step) => {
        return step === errorStepNumber;
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        // console.log(activeStep, accountHolderName, accountNumber, IFSC)
        if (activeStep === 2 && accountHolderName !== "" && accountNumber !== 1234567890 && IFSC !== "") {
            setIsFormFilled(true)
        } else if (activeStep === 2) {
            setErrorStepNumber(1)
        }
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };



    const renderSellerTermsAndConditions = () => (
        <div className=''>
            <p>Terms of service are the legal agreements between a service provider and a person who wants to use that service. The person must agree to abide by the terms of service in order to use the offered service. Terms of service can also be merely a disclaimer, especially regarding the use of websites.Terms of service are the legal agreements between a service provider and a person who wants to use that service. The person must agree to abide by the terms of service in order to use the offered service. Terms of service can also be merely a disclaimer, especially regarding the use of websiteTerms of service are the legal agreements between a service provider and a person who wants to use that service. The person must agree to abide by the terms of service in order to use the offered service. Terms of service can also be merely a disclaimer, especially regarding the use of websiteTerms of service are the legal agreements between a service provider and a person who wants to use that service. The person must agree to abide by the terms of service in order to use the offered service. Terms of service can also be merely a disclaimer, especially regarding the use of websiteTerms of service are the legal agreements between a service provider and a person who wants to use that service. The person must agree to abide by the terms of service in order to use the offered service. Terms of service can also be merely a disclaimer, especially regarding the use of website.Terms of service are the legal agreements between a service provider and a person who wants to use that service. The person must agree to abide by the terms of service in order to use the offered service. Terms of service can also be merely a disclaimer, especially regarding the use of website.Terms of service are the legal agreements between a service provider and a person who wants to use that service. The person must agree to abide by the terms of service in order to use the offered service. Terms of service can also be merely a disclaimer, especially regarding the use of website</p>
            <FormControlLabel control={<Checkbox checked />} label="By Proceeding further means you are agreeing to all terms and conditions!" />
        </div>
    )

    const renderAccoundDetailsCollectionForm = () => (
        <div className=''>
            <h1 className="text-center h3 text-primary mb-4">Add Details</h1>
            <div className='d-flex justify-content-around mb-5'>
                <TextField
                    id="standard-password-input"
                    label="Account Holder Name"
                    type="text"
                    variant="filled"
                    className="m-2"
                    onChange={(event) => setAccountHolderName(event.target.value)}
                    value={accountHolderName}
                />
                <TextField
                    id="standard-password-input"
                    label="Account Number"
                    type="number"
                    variant="filled"
                    className="m-2"
                    onChange={(event) => setAccountNumber(event.target.value)}
                    value={accountNumber}
                />
                <TextField
                    id="standard-password-input"
                    label="IFSC"
                    type="text"
                    variant="filled"
                    className="m-2"
                    onChange={(event) => setIFSC(event.target.value)}
                    value={IFSC}
                />

            </div>
        </div>
    )

    const renderCompleteRegistration = () => (
        <div className='text-center'>
            <h1 className='h4'>Wonderful</h1>
            <p>Note:Dont enter you account details anywhere else here.</p>
            <p>All your details are safe and secure here.Even we can't see the data.</p>
            <img src="https://img.freepik.com/premium-vector/secure-finances-cybersecurity-service-cash-payments-people-background-large-shield_253334-1879.jpg?w=740" alt="finalStep" className='w-75 mb-2' />
            <p>You will be redirected to the seller page if all the fields are filled.</p>
            <h1 className=''>Happy Earning.</h1>
        </div>
    )

    const renderStepPage = () => {
        switch (activeStep + 1) {
            case 1:
                return (renderSellerTermsAndConditions())
            case 2:
                return (renderAccoundDetailsCollectionForm())
            case 3:
                return (renderCompleteRegistration())
            default:
                break;
        }
    }

    const renderStepper = () => (
        <div className='stepperCon p-4 shadow-lg rounded overflow-auto'>
            <Stepper nonLinear activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                    const labelProps = {};
                    if (isStepFailed(index)) {
                        labelProps.optional = (
                            <Typography variant="caption" color="error">
                                Invalid Entries
                            </Typography>
                        );
                        labelProps.error = true;
                    }

                    return (
                        <Step key={label}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}

            </Stepper>

            <div>

                <React.Fragment>
                    <h1 className='h3 mt-3 text-dark'>
                        Step {activeStep + 1}
                    </h1>
                    {renderStepPage()}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                            variant="contained"
                            color="secondary"
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext} sx={{ mr: 1 }} variant="contained"
                            color="secondary">
                            {activeStep + 1 === 3 ? "Complete" : "Next"}
                        </Button>
                    </Box>
                </React.Fragment>
            </div>
        </div>
    )

    const renderLoadingView = () => (
        <div
            className="text-center loader d-flex justify-content-center align-items-center vh-100"
            testid="loader"
        >
            <Loader type="TailSpin" color="#FF5454" height={50} width={50} />
        </div>
    )



    return (
        <>
            {isSellerExists === apiStatusConstants.fail ? (
                <>
                    <Header />
                    <div className='d-flex vh-100 justify-content-start flex-column align-items-center registerSellerParentCon text-secondary'>
                        <h1 className='h3 text-dark text-center mt-3 mb-3'>Seller Registration</h1>
                        {isFormFilled ? renderLoadingView() : renderStepper()}
                    </div>
                    <Footer />
                </>) : renderLoadingView()}
        </>
    );
}






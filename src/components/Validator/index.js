import "./index.css"
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { serverUrl } from "../../sources";
import Cookies from "js-cookie";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.35),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Validator = () => {
    const [searchInput, setSearchInput] = useState("")
    const [showMsg, setShowMsg] = useState("")
    const [isValidUser, setIsValidUser] = useState(false)
    const [api, setApi] = useState(false)

    const validateToken = async () => {
        try {
            setApi(true)
            const url = `${serverUrl}/admin/token-authentication`
            // const url = `http://localhost:4000/admin/token-authentication`
            const options = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${Cookies.get("jwtToken")}`,
                    // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyRW1haWwiOiJzcmludXNyaTc2NTg1QGdtYWlsLmNvbSIsImlhdCI6MTY3NDcwODgzMX0.QNkp8Y4jhoKIezwAm8Nc4RYtHYeTX7AbgifIRLfCvpY`,
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    key: searchInput
                })
            }
            const response = await fetch(url, options)
            const result = await response.json()
            if (response.ok) {
                console.log(result)
                setIsValidUser(result.isValidUser)
                setShowMsg(result.msg)
                setApi(false)
            } else {
                setShowMsg(result.msg)
                setApi(false)
            }

        } catch (err) {
            console.log("Error in updateFairPrice", err)
            window.alert("Something Went Wrong!")
            setApi(false)
        }

    }

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="contentCon d-flex flex-column vh-100">
                <h1 className="h2 text-warning">Validator</h1>
                <div className="mb-5 align-self-center d-flex mt-5 rounded secImage">
                    <div className="col-6 d-flex justify-content-center align-items-center">
                        <img className="h-75" alt="security" src="https://img.freepik.com/premium-vector/personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-flat-vector-illustration-banner-protection_128772-937.jpg?w=740" />
                    </div>
                    <div className="col-6 d-flex justify-content-center flex-column align-items-center">
                        <h1 className="h3 mb-3">Verify User</h1>
                        <div className="d-flex ">
                            <Search onChange={(event) => setSearchInput(event.target.value)}>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                            {api ? (
                                <LoadingButton
                                    loading
                                    loadingPosition="start"
                                    className="ml-2"
                                    startIcon={<SaveIcon />}
                                    variant="outlined"
                                >
                                    Checking
                                </LoadingButton>) :
                                (
                                    <Button variant="contained" className="ml-2" onClick={validateToken} color="primary">Check</Button>
                                )}
                        </div>
                        <h1 className="colorSuccess h4 mt-3">{showMsg !== "" && showMsg}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Validator
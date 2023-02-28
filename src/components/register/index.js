import "./index.css"
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { serverUrl } from "../../sources";
import { useState } from "react";

const Register = (props) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("")
    const [location, setLocation] = useState("")
    const [mobile, setMobile] = useState()
    const [error, setError] = useState(false)
    const [succees, setSuccess] = useState(false)

    const submitForm = async (event) => {
        event.preventDefault()
        // console.log(name, email, password, gender, location, mobile)
        const options = {
            method: "POST",
            body: JSON.stringify({
                email, location, mobile, gender, password, name, isSeller: false
            }),
            headers: { 'Content-Type': 'application/json' }
        }
        try {
            const response = await fetch(`${serverUrl}/user/register`, options)
            const result = await response.json()
            if (response.status === 201) {
                setSuccess(true)
                setError(false)
                setTimeout(() => {
                    const { history } = props
                    history.replace("/user/login")
                }, 2000)

            } else {
                setError(true)
            }
        } catch (err) {
            console.log("Could not register", err)
        }

    }

    return (
        <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-dark">
            <form className="d-flex flex-column p-3 bg-light col-4 rounded">
                <h1 className="text-center h3 text-primary">Register</h1>
                <TextField
                    id="standard-password-input"
                    label="Full Name"
                    type="text"
                    variant="standard"
                    className="m-2"
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                />
                <TextField
                    id="standard-password-input"
                    label="Email"
                    type="email"
                    variant="standard"
                    className="m-2"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                />
                <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    variant="standard"
                    className="m-2"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                />
                <TextField
                    id="standard-password-input"
                    label="Mobile"
                    type="number"
                    variant="standard"
                    className="m-2"
                    onChange={(event) => setMobile(event.target.value)}
                    value={mobile}
                />
                <TextField
                    id="standard-password-input"
                    label="Location"
                    type="text"
                    variant="standard"
                    className="m-2"
                    onChange={(event) => setLocation(event.target.value)}
                    value={location}
                />
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(event) => setGender(event.target.value)}
                    value={gender}
                    className="m-2"
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
                <Button variant="contained" type="submit" onClick={submitForm}>Submit</Button>
                <small className="text-danger">{error && "Something Went Wrong! Try again."}</small>
                <h1 className="text-success h6">{succees && "Registration Successful! Redirecting to Login page."}</h1>
            </form>
        </div>
    )
}

export default Register
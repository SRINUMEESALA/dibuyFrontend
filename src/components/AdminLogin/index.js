/* eslint-disable jsx-a11y/label-has-associated-control */
import { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import { serverUrl } from "../../sources";
import Header from "../Header"
import './index.css'

class AdminLogin extends Component {
    state = { adminID: '', password: '', errorMsg: '' }

    loggingIn = async event => {
        event.preventDefault()
        const { adminID, password } = this.state
        const options = {
            method: 'POST',
            body: JSON.stringify({
                adminId: adminID,
                password,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("jwtToken")}`
            }

        }
        const url = `${serverUrl}/admin/login`
        // console.log(url, options)
        try {
            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok) {
                Cookies.set('adminJwt', data.adminJwt, { expires: 30 })
                const { history } = this.props
                history.replace('/admin')
            } else {
                this.setState({ errorMsg: data.errorMsg })
            }
        } catch (err) {
            console.log("Admin Login api failed", err)
        }

    }

    inputChanging = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        if (Cookies.get('adminJwt') !== undefined) {
            return <Redirect to="/admin" />
        }

        const { errorMsg, adminID, password } = this.state
        // console.log(username, password)
        return (
            <>
                <Header />
                <div className="text-white bg-white  d-flex justify-content-center loginParentCon min-vh-100">
                    <div className='contentCon d-flex'>
                        <div className="col-6 d-flex justify-content-center align-items-center">
                            <img className="w-75" alt="" src="https://img.freepik.com/premium-vector/online-registration_203633-559.jpg?w=740" />
                        </div>
                        <div className='col-6 d-flex justify-content-center align-items-center'>
                            <form className="formCon p-4 pt-0 rounded w-50 shadow-lg" onSubmit={this.loggingIn}>
                                <div className="text-center">
                                    <h1 className=''>DiBuy</h1>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="USERNAME">ADMIN ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={adminID}
                                        onChange={this.inputChanging}
                                        id="USERNAME"
                                        name="adminID"
                                    />

                                    <label htmlFor="PASSWORD" className="mt-2">
                                        PASSWORD
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="PASSWORD"
                                        onChange={this.inputChanging}
                                        value={password}
                                        name="password"
                                    />
                                    <small id="passwordHelp" className="form-text text-muted">
                                        Contact dibuy support team if any problem persists!
                                    </small>
                                    <button type="submit" className="btn btn-primary btn-block mt-2">
                                        Login
                                    </button>
                                    <p className="m-0 text-danger">
                                        {errorMsg !== '' && `*${errorMsg}`}
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AdminLogin

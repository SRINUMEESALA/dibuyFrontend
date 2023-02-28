import Button from '@mui/material/Button';
import { useState } from 'react';
import "./index.css"
import Header from "../Header"
import Footer from "../Footer"


const ChatUs = () => {
    const [submited, setSubmitted] = useState(false)
    const [text, setText] = useState("")

    const renderSubmitted = () => (
        <div className="successSubmit p-2 text-center">
            <h1 className='h3 text-success'>Query successfully submited</h1>
            <img src="https://img.freepik.com/premium-vector/online-voting-concept-flat-style-design-vector-illustration-tiny-people-with-voting-poll_503038-726.jpg?w=740" alt="submitImg" className='w-100' />
            <p className='text-secondary'>We'll be right to you soon!</p>
            <Button color="warning" variant="outlined" className="" onClick={() => setSubmitted(false)}>Raise another Query</Button>
        </div>
    )
    const renderChat = () => (
        <div className="ChatUsCon d-flex p-2">
            <div className="col-6">
                <img src="https://img.freepik.com/premium-vector/customer-support-contact-us-woman-with-headphones-microphone-with-computer-talking-with-clients-personal-assistant-service-hotline-operator-advises-customer-online-global-technical-support_458444-1182.jpg?w=740" alt="chatus" className="w-100" />
            </div>
            <div className="col-6">
                <h1 className="text-center h3">Add Your Query</h1>
                <div className="form-group">
                    <input type="text" placeholder="Subject" className="form-control mb-2" />
                    <textarea className="form-control rounded-0" rows="7" onChange={(event) => setText(event.target.value)} value={text} placeholder="Enter your query here..."></textarea>
                </div>
                <Button color="info" variant="contained" className="w-100" onClick={() => {
                    setSubmitted(true)
                    setText("")
                }
                }>Submit</Button>
            </div>
        </div >
    )
    return (
        <>
            <Header />
            <div className="chatUsParentCon d-flex flex-colum justify-content-center align-items-center vh-100">
                {submited ? renderSubmitted() : renderChat()}
            </div>
            <Footer />
        </>
    )
}

export default ChatUs
import axios from "axios"
import { useState } from "react"
import { CiMail } from "react-icons/ci";
import { SendResetMail } from "../endpoints";
import { useNavigate } from "react-router-dom";
import "./ForgetPass.css"


const ForgetPass = () => {
    const navigate = useNavigate();
    const [reset, setreset] = useState(false)
    const [mail, setmail] = useState({Email:""})

    const handleReset = async() => {
        try{
            await SendResetMail(mail)
            setreset(true)
        }catch(err){
            console.log(err, "Error Sending Reset Mail")
        }
        
        
    }

    const handleLogin=()=>{
        navigate("/")
    }


    return (
        <div className="ForgetMain">
        <div className="Forget-Main">
            <h2 className="Forget-Header">Forget Password</h2>
            {!reset?(<>
                <p className="Forget-para">Please Enter your Email address to recieve verification code</p>
            <ul className="Forget-lists">
                <li className="Forget-litsitems"><input className="Forget-input" type="text" placeholder="Email" value={mail.Email} onChange={(e) => setmail({ ...mail, Email: e.target.value })}></input></li>
            </ul>
            <button className="Forget-Button" onClick={handleReset}>Send Mail</button>
            </>):(
            <>
            <p className="Forget-After"><CiMail className="Forget-After-icon" />Check Inbox to Reset Password</p>
            <button className="Forget-After-Button" onClick={handleLogin}>Ok</button>
            </>)}


        </div>
        </div>
    )
}
export default ForgetPass;
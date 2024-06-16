import { useNavigate } from "react-router-dom"
import { ResetPass } from "../endpoints";
import { useState } from "react";
import "./ResetPassword.css"




const ResetPassword=()=>{

    const navigate = useNavigate();
    const [Data, setData] = useState({Email:"",NewPassword:"", ConfirmPass:""})
    const [error, seterror] = useState("")

    const handleReset = async() => {
        if(Data.NewPassword !== Data.ConfirmPass)
        {
            seterror("Password Are mismatched")
        }
        else{
        try{

            await ResetPass(Data)
            navigate("/")
        }catch(err){
            console.log(err, "Error Sending Reset Mail")
        }
    }
        
        
    }

    return(
    <>
    <div className="ResetMain">
    <div className="Reset-Main">
            <h2 className="Reset-Header">Reset Password</h2>
            <p className="Reset-para">New Password must be different from previosly used Password</p>
            <ul className="Reset-lists">
                <li className="Reset-listitems"><input className="Reset-input" type="text"  placeholder="Email" value={Data.Email} onChange={(e) => setData({ ...Data, Email: e.target.value })}></input></li>
                <li className="Reset-listitems"><input className="Reset-input" type="text" placeholder="Password" value={Data.NewPassword} onChange={(e)=> setData({...Data, NewPassword: e.target.value})}></input></li>
                <li className="Reset-listitems1"><input className="Reset-input" type="text" placeholder="Confirm Password" value={Data.ConfirmPass} onChange={(e)=>setData({...Data, ConfirmPass: e.target.value}) }></input></li>
                <span>{error}</span>
            </ul>
            <button className="Reset-Button" onClick={handleReset}>Reset</button>


        </div>
        </div>
    
    </>
    )
}
export default ResetPassword;
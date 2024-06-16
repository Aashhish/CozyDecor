import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignUp.css';
import axios from "axios";



const SignUp = () => {
    const navigate = useNavigate();

    const [Data, setData] = useState({
        UserName: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
    });

    const [errors, seterrors] = useState({});


    const handleclick = async () => {
        let empty = {};
        if (!Data.UserName.trim()) {
            empty.UserName = "Required Field";
        }
        if (!Data.Email.trim()) {
            empty.Email = "Required Field"
        }
        if (!Data.Password.trim()) {
            empty.Password = "Required Field"
        }
        if (!Data.ConfirmPassword.trim()) {
            empty.ConfirmPassword = "Required Field"
        }
        else if(Object.keys(errors).length===0) {
            await axios.post("http://localhost:5000/auth/SignUp", Data)
            navigate("/")
        }
        seterrors(empty);
        setData({
            UserName: "",
            Email: "",
            Password: "",
            ConfirmPassword: "",
        });
    }


    return (
        <>
            <div className="SignUpMain">
                <h1 className="Header">SignUp</h1>
                <div className="listbox">

                    <ul className="lists">
                        <li className="SignUplistitems"><input className="SignUpinput" type="text" placeholder="Name" value={Data.UserName} onChange={(e) => setData({ ...Data, UserName: e.target.value })}></input>
                            {errors.UserName && <span style={{ color: "red" }}>{errors.UserName}</span>}
                        </li>



                        <li className="SignUplistitems"><input className="SignUpinput" type="text" placeholder="Email" value={Data.Email} onChange={(e) => setData({ ...Data, Email: e.target.value })} ></input>
                            {errors.Email && <span style={{ color: "red" }}>{errors.Email}</span>}
                        </li>


                        <li className="SignUplistitems"><input className="SignUpinput" type="password" placeholder="Password" value={Data.Password} onChange={(e) => setData({ ...Data, Password: e.target.value })}></input>
                            {errors.Password && <span style={{ color: "red" }}>{errors.Password}</span>}
                        </li>


                        <li className="SignUplistitems"><input className="SignUpinput" type="password" placeholder="Confirm Password" value={Data.ConfirmPassword} onChange={(e) => setData({ ...Data, ConfirmPassword: e.target.value })}></input>
                            {errors.ConfirmPassword && <span style={{ color: "red" }}>{errors.ConfirmPassword}</span>}
                        </li>



                    </ul>
                </div>

                <button className="SignUpButton" onClick={() => { handleclick() }}  >Submit</button><br></br>
                <a className="hrefLogin" href="/">Already Have an Account? Login</a>
            </div>
            
        </>
    )
}
export default SignUp;
import ProfilePic from "./images/Oval.png";
import logo from "./images/Group.png";
import Chatterly7 from "./images/Chatterly7.gif";
import CozyDecor from "./images/CozyDecor.png";
import { useNavigate } from "react-router-dom";
import { getBlog, getProfile } from "../endpoints";
import { useEffect, useState } from "react";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../Redux/Actions/Blog";

const NavBar = () => {
  const [UserData, setUserData] = useState({});
  const ID = localStorage.getItem("userID");

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.posts);

  const Navigate = useNavigate();

  const handleProfile = () => {
    Navigate("/Profile");
  };

  const PrflPhoto = async () => {
    try {
      dispatch(fetchUserProfile(ID));
      // const res = await getProfile(ID)
      // setUserData(res.data.user);
      // console.log(res.data.user);
    } catch (err) {
      console.log(err, "Error Getting Profile Photo");
    }
  };

  const handleHome = () => {
    Navigate("/Body2");
  };

  useEffect(() => {
    PrflPhoto();
  }, []);

  return (
    <>
      <div className="NavbarParent">
        <div className="navbar">
          <img className="img" onClick={handleHome} src={CozyDecor}></img>
          <div className="Profile" onClick={handleProfile}>
            <img
              className="img1"
              src={`http://localhost:5000/${userData.ProfilePhoto}`}
              alt="Profile"
            ></img>
            <span className="name">{userData.UserName}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;

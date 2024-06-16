import React from "react";
import Background1 from "./images/Backgroud1.jpg";
import "./Header.css";
const Header = () => {
  return (
    <>
      <div className="HeaderMain">
        <div className="HeaderFirst">
          <div className="Header-wrap">
            <span className="Header1">Welcome To CozyDecor</span>
            <hr className="Header-line"></hr>
            <span className="HeaderTail">Designing Your Cozy Corner</span>
          </div>
          <img className="HeaderImg" src={Background1}></img>
        </div>
        <div className="HeaderSec">
          <span className="HeaderTitle">About Our Blog</span>
          <span className="HeaderPara">
            At CozyDecor, we are passinate about more than just furniture; we
            are dedicated to helping you create a home that reflects your unique
            style and personality. Our blog is your go-to resource for the
            latest trends, design tips, and practical advice on all things
            related to home decor and furnishings.
          </span>
        </div>
      </div>
    </>
  );
};
export default Header;

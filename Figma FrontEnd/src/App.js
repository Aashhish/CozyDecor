import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Body from "./components/body";
import Foot from "./components/foot";
import Login from "./components/LoginPage";
import SignUp from "./components/SignUp";
import ForgetPass from "./components/ForgetPass";
import Body2 from "./components/Body2";
import AddBlog from "./components/AddBlog";
import UpdateBlog from "./components/UpdateBlog";
import UserProfile from "./components/UserProfile";
import ResetPassword from "./components/ResetPassword";
import NavBarLower from "./components/NavBarLower";
import Header from "./components/Header";
import Content from "./components/Content";
import { store } from "./Redux/Store";
import { Provider } from "react-redux";

function App1() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/Body2");
    }
  }, []);
  const [HideNavBar, setHideNavBar] = useState(false);
  // const [HideLowerNavbar, setHideLowerNavbar] = useState(false)
  useEffect(() => {
    if (
      location.pathname == "/" ||
      location.pathname == "/SignUp" ||
      location.pathname == "/ForgetPass" ||
      location.pathname == "/Profile" ||
      location.pathname == "/ResetPassword"
    ) {
      setHideNavBar(true);
    } else {
      setHideNavBar(false);
    }

    // if(location.pathname == "/Content"){
    //   setHideLowerNavbar(true)
    // }
    // else{
    //   setHideLowerNavbar(false)
    // }
  }, [location]);

  return (
    <div>
      {!HideNavBar && <NavBar></NavBar>}
      {!HideNavBar ||
        (location.pathname.startsWith("/Content") && (
          <NavBarLower></NavBarLower>
        ))}
      {HideNavBar ||
        (location.pathname.startsWith("/Body2") && (<Header></Header>))}
      {/* {!HideLowerNavbar && <NavBarLower></NavBarLower>} */}
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/SignUp" element={<SignUp></SignUp>}></Route>
        <Route path="/ForgetPass" element={<ForgetPass></ForgetPass>}></Route>
        <Route
          path="/ResetPassword/:email"
          element={<ResetPassword></ResetPassword>}
        ></Route>
        <Route path="/Body" element={<Body></Body>}></Route>
        <Route path="/Header" element={<Header></Header>}></Route>
        <Route path="/Body2" element={<Body2></Body2>}></Route>
        <Route path="/AddBlog" element={<AddBlog></AddBlog>}></Route>
        <Route
          path="/UpdateBlog/:id"
          element={<UpdateBlog></UpdateBlog>}
        ></Route>
        <Route path="/Profile" element={<UserProfile></UserProfile>}></Route>
        <Route path="/Content/:id" element={<Content></Content>}></Route>
      </Routes>
      {!HideNavBar && <Foot></Foot>}
    </div>
  );
}

function App() {
  return (
    <div>
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <App1></App1>
          </BrowserRouter>
        </Provider>
      </div>
      <img src="Group" alt="" />
    </div>
  );
}

export default App;

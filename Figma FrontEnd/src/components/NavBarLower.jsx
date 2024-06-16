import { BiSearchAlt } from "react-icons/bi";
import { getBlog, getFilterPost, getSearch } from "../endpoints";
import { useEffect, useState } from "react";
import "./NavBarLower.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilteredPost,
  fetchSearchByDatePost,
  getFilteredPost,
} from "../Redux/Actions/Blog";
import { useNavigate } from "react-router-dom";

const NavBarLower = ({ setPost }) => {
  // const [blogs, setBlogs] = useState([]);
  const [title, settitle] = useState("");
  const [created_Date, setcreated_Date] = useState("");
  const [searchText, setsearchText] = useState("");
  const [showSuggestions, setshowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const { postForFilter } = useSelector((state) => state.posts);
  const { blogs } = useSelector((state) => state.posts);

  const navigate = useNavigate();

  const FetchDetails = async () => {
    dispatch(fetchFilteredPost({ title, created_Date }));
    // const res = await getBlog()
    // if(res.data){
    //     setBlogs(res.data)
    // }
  };

  // useEffect(()=>{
  //     dispatch(getPost());
  // },[])

  const filterByTitle = async () => {
    try {
      dispatch(fetchFilteredPost({ title, created_Date }));
      const res = await getFilterPost(title, created_Date);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filterByDate = (date) => {
    console.log(date, "date");
    setcreated_Date(date);
  };

  const handleSearchTitle = (e) => {
    setsearchText(e.target.value);
    // sethideSuggestions(true);
  };

  const handleSuggestionClick = (id) => {
    setshowSuggestions(false);
    navigate(`/Content/${id}`);
  };

  // useEffect(() => {
  //   search();
  // }, [searchText]);

  useEffect(() => {
    if (searchText) {
      dispatch(fetchSearchByDatePost(searchText));
      setshowSuggestions(true);
    } else {
      setshowSuggestions(false);
    }
  }, [dispatch, searchText]);

  useEffect(() => {
    dispatch(getFilteredPost());
  }, []);

  useEffect(() => {
    FetchDetails();
  }, [title, created_Date]);

  useEffect(() => {
    filterByTitle();
  }, [title, created_Date]);

  return (
    <>
      <div className="LowerNavBar">
        <span className="filter">Filters</span>
        <span className="h1">Created By</span>
        <span className="h2">Pusblished Date</span>
        <span className="h3">Search</span>
        <div className="Navbar-Inputs">
          <select
            className="in1"
            value={title}
            onChange={(e) =>
              settitle(e.target.value === "All" ? "" : e.target.value)
            }
          >
            <option value="All">All</option>
            {postForFilter.map((post) => {
              return (
                <option key={post._id} value={post.title}>
                  {post.Title}
                </option>
              );
            })}
          </select>
          <input
            type="date"
            className="in2"
            onChange={(e) => filterByDate(e.target.value)}
          ></input>
        </div>

        <div className="picon">
          <div className="icon">
            <BiSearchAlt />
          </div>
          <div>
            <input
              className="txtbox"
              type="text"
              placeholder="Search Here"
              value={searchText}
              onChange={(e) => handleSearchTitle(e)}
            ></input>
            {showSuggestions && blogs?.length > 0 && (
              <div className="suggestions">
                <ul>
                  {blogs.map((post) => {
                    return (
                      <li
                        key={post._id}
                        className="suggestion-item"
                        onClick={() => handleSuggestionClick(post._id)}
                      >
                        {post.Title}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default NavBarLower;

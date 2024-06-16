import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaComment, FaRegHeart } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { PiShareFatFill } from "react-icons/pi";
import NavBarLower from "./NavBarLower";
import profilePic2 from "./images/Ellipse 80.png";
import {
  getPost,
  toggleLikeBtn,
  addComment,
  delComment,
  deletePost,
} from "../Redux/Actions/Blog";
import "./Body2.css";

const Body2 = () => {
  const navigate = useNavigate();
  const [PopUp, setPopUp] = useState(null);
  const [text, setText] = useState("");
  const [Render, setRender] = useState(false);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    dispatch(getPost());
  }, [Render]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClick = () => {
    navigate("/AddBlog");
  };

  const HandleDelete = async (id) => {
    dispatch(deletePost(id));
    dispatch(getPost());
  };

  const handleSaveComments = async (Data, id) => {
    if (!id) {
      console.error("Post ID is not defined.");
      return;
    }
    try {
      dispatch(addComment({ Data, id }));
      dispatch(getPost());
      setRender(!Render);
      setText("");
    } catch (err) {
      console.log(err, "Comments Save Error");
    }
  };

  const handleDeleteComments = async (blogId, CommentsId) => {
    try {
      dispatch(delComment({ blogId, CommentsId }));
    } catch (err) {
      console.log(err, "Comments Del err");
    }
  };

  const like = async (postId, like) => {
    dispatch(toggleLikeBtn({ liked: !like, postId }));
    setRender(!Render);
    dispatch(getPost());
  };

  const DisplayPopUp = (PostID) => {
    setPopUp(PostID);
  };

  const HidePopUp = () => {
    setPopUp(null);
  };

  const handleContent = (id) => {
    navigate(`/Content/${id}`);
  };
  const GoToComments = (id) => {
    navigate(`/Content/${id}`);
  };

  return (
    <>
      <NavBarLower setPost={getPost}></NavBarLower>
      <div className="NewBlog">
        <h4 className="Newtxt">Blog Posts</h4>
        <div className="AddBlogButtonMain">
          <button className="btn-shiny2" onClick={handleClick}>
            Add Blog
          </button>
        </div>
      </div>
      <div className="NewRectangle1">
        {currentPosts.map((post) => {
          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          const createDate = new Date(post.createdDate);
          const day = createDate.getDate();
          const monthName = months[createDate.getMonth()];
          const year = createDate.getFullYear();
          const currentDate = `${monthName} ${day}, ${year}`;

          return (
            <div key={post._id}>
              {PopUp === post._id && (
                <div className="PopUp">
                  <div className="PopUpContent">
                    <IoIosClose
                      className="Exit"
                      onClick={HidePopUp}
                    ></IoIosClose>
                    <span className="Body-Comment-Text">Comments</span>
                    <br></br>
                    <span className="CommentSec">{post.Title}</span>
                    <div className="Comments">
                      {post.Comments.length ? (
                        post.Comments.map((Comments, index) => (
                          <div className="CommentBox" key={index}>
                            <div className="CommentsDiv">
                              {Comments.text}
                              <MdDelete
                                className="CommentDelete"
                                onClick={() =>
                                  handleDeleteComments(post._id, Comments._id)
                                }
                              ></MdDelete>
                            </div>
                          </div>
                        ))
                      ) : (
                        <span className="Default Comment">
                          Be The 1st One To Comment🔥
                        </span>
                      )}
                    </div>

                    <div className="InputSend">
                      <input
                        className="CommentInput"
                        placeholder="Share Your Views"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      ></input>
                      <PiShareFatFill
                        className="Send"
                        onClick={() => handleSaveComments({ text }, post._id)}
                      ></PiShareFatFill>
                    </div>
                  </div>
                </div>
              )}

              <div className="NewRectangle1a">
                <BsThreeDotsVertical
                  className="Edit"
                  onClick={() => navigate(`/UpdateBlog/${post._id}`)}
                ></BsThreeDotsVertical>

                <img
                  className="Newimg2"
                  src={`http://localhost:5000/${post.image}`}
                  alt="Image"
                  onClick={() => handleContent(post._id)}
                ></img>
                <span className="Newp1">{post.Title}</span>
                <br />
                <span className="Newp">
                  {post.Description.length > 140
                    ? `${post.Description.substring(0, 140)}...`
                    : post.Description}
                </span>

                <div className="Card-Footer">
                  <hr className="NewLine"></hr>
                  <img className="Newimg3" src={profilePic2} alt="Profile" />
                  <span className="Body-UserName">Dasteen</span>
                  <span className="NewDate">{currentDate}</span>
                  {post.liked ? (
                    <FaHeart
                      className="Like"
                      onClick={() => like(post._id, post.liked)}
                    />
                  ) : (
                    <FaRegHeart
                      className="NewLike"
                      onClick={() => like(post._id, post.liked)}
                    />
                  )}

                  <FaComment
                    className="NewComment"
                    onClick={() => GoToComments()}
                  ></FaComment>
                  <span className="NewCommentCount">12</span>
                  <FaShareAlt className="Share" />
                  <MdDelete
                    className="Delete"
                    onClick={() => HandleDelete(post._id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={index + 1 === currentPage ? "active" : ""}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default Body2;

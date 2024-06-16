import React, { useEffect, useState } from "react";
import "./Content.css";
import { getBlogDetails } from "../endpoints";
import { useParams } from "react-router-dom";
import { BsEmojiLaughing } from "react-icons/bs";
import Profile1 from "./images/Profile1.jpg";
import { PiShareFatFill } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";
import { addComment, delComment, getPost } from "../Redux/Actions/Blog";
import { useDispatch, useSelector } from "react-redux";

const Content = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [text, setText] = useState("");
  //   const [Render, setRender] = useState(false);
  const [hoveredCommentId, setHoveredCommentId] = useState(null);
  const dispatch = useDispatch();

  const getProfile = async () => {
    try {
      console.log(id);
      const res = await getBlogDetails(id);
      console.log(res.data);
      setFormData(res.data);
    } catch (err) {
      console.log(err, "Error getting ContentData");
    }
  };

  const handleSaveComments = async (Data, id) => {
    if (!id) {
      console.error("Post ID is not defined.");
      return;
    }
    try {
      dispatch(addComment({ Data, id }));
      dispatch(getPost());
      setText("");
      setFormData((prevState) => ({
        ...prevState,
        Comments: [...prevState.Comments, Data],
      }));
    } catch (err) {
      console.log(err, "Comments Save Error");
    }
  };

  const handleDeleteComments = async (blogId, CommentsId) => {
    try {
      dispatch(delComment({ blogId, CommentsId }));
      setFormData((prevState) => ({
        ...prevState,
        Comments: prevState.Comments.filter(
          (comment) => comment._id !== CommentsId
        ),
      }));
    } catch (err) {
      console.log(err, "Comments Del err");
    }
  };

  //   useEffect(() => {
  //     dispatch(getPost());
  //   }, [Render]);

  useEffect(() => {
    getProfile();
  }, []);

  console.log(formData, "jjg");

  return (
    <>
      <div className="ContentHead">
        <div>
          <span className="content-title">{formData.Title}</span>
          <div className="content-img-div">
            <img
              className="content-img"
              src={`http://localhost:5000/${formData.image}`}
            ></img>
          </div>
          <span>{formData.Description}</span>
        </div>
        <div className="content-Comments-Box">
          <span className="content-Comments">Comments</span>
          <hr className="content-line1"></hr>
          <div className="Content-Comments-div">
            <span>
              {formData?.Comments?.map((item) => (
                <div
                  className="content-Comment-sec"
                  key={item._id}
                  onMouseEnter={() => setHoveredCommentId(item._id)} // Set hovered comment ID
                  onMouseLeave={() => setHoveredCommentId(null)} // Reset hovered comment ID
                >
                  <img className="content-Profile-pic" src={Profile1}></img>
                  <span className="content-Username">Username</span>
                  <p className="content-Comment-text">{item.text}</p>
                  {hoveredCommentId === item._id && ( // Show delete icon if comment is hovered
                    <MdDeleteOutline
                      className="CommentDelete2"
                      onClick={() =>
                        handleDeleteComments(formData._id, item._id)
                      }
                    />
                  )}
                </div>
              ))}
            </span>
          </div>
          <hr className="content-line2"></hr>

          <div className="content-inupt-Box">
            <input
              className="content-inupt"
              placeholder="Add a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></input>
            <PiShareFatFill
              className="Send"
              onClick={() => handleSaveComments({ text }, formData._id)}
            ></PiShareFatFill>
            <BsEmojiLaughing className="content-Emoji" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Content;

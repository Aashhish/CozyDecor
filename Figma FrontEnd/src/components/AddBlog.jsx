import { useNavigate } from "react-router-dom"
import './AddBlog.css';
import { useState } from "react";
import axios from "axios";
import { createBlog } from "../endpoints";
import { useDispatch } from "react-redux";
import { createPost } from "../Redux/Actions/Blog";


const AddBlog =()=>{
    const Navigate = useNavigate();
    const [Data, setData] = useState({
        Title: "",
        Description: "",
        image: "",
    });

    const dispatch = useDispatch();

    const [Errors, setErrors] = useState({});

    const handleClick= async()=>{
        const error = {};

        if(!Data.Title){
            error.Title = "Enter The Title"
        }
        if(!Data.Description){
            error.Description = "Enter The Description"
        }
        if(!Data.image){
            error.image = "Add a Image"
        }

        if (Object.keys(error)){
            try{
                const formData = new FormData();
                formData.append("Title", Data.Title);
                formData.append("Description", Data.Description);
                formData.append("image", Data.image);
                // await createBlog(formData);
                dispatch(createPost(formData))
                Navigate('/Body2');
            }
            
            catch(error){
                console.log(error, "Error Creating Blog")
            }
        }

        setErrors(error)        
    }



    const handleCancel=()=>{
        Navigate("/Body2")
    }


    return(
        <>
        <div className="AddBlog">
            
            <div className="AddBlogInput">
                <h1 className="AddBlogtxt">Add A Blog</h1>
                <input className="NewTitle" placeholder="Title" type="text" 
                value={Data.Title}
                onChange={(e)=> {
                setData({});
                setData({...Data, Title: e.target.value})}}></input>
                
                <br />
                {Errors.title && <span>{Errors.title}</span>}


                <textarea className="NewDescription" placeholder="Description" type="textarea"
                value={Data.Description}
                onChange={(e)=> {
                setErrors({});
                setData({...Data,Description: e.target.value})}}></textarea>

                <br />
                {Errors.Description && <span>{Errors.Description}</span>}

                <input className="NewImage" placeholder="Add Image" type="file"
                onChange={(e)=> {
                setErrors({});
                if(e.target.files.length){
                    const selectedFile = e.target.files[0]
                    setData({...Data,image: selectedFile})
                }
                else{
                    setData({...Data, image:{}})
                }}}></input>

                <br />
                {Errors.image && <span>{Errors.image}</span>}
                <div className="AddBlogBtnParent">
                <button className="AddBlogBtn" onClick={handleClick}>Create</button>
                <button className="AddBlogBtn" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
        
        </>
    )
}
export default AddBlog;
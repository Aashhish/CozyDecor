import { useNavigate, useParams } from "react-router-dom"
import './AddBlog.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { getBlogDetails, updateBlogPut } from "../endpoints";


const UpdateBlog=()=>{
    const {id}= useParams();
    const Navigate = useNavigate();
    const [Data, setData] = useState({
        Title: "",
        Description: "",
        image: "",
    })

    const [Errors, setErrors] = useState({});

    const fetchPost =async()=>{
        try{
            const res = await getBlogDetails(id);
            console.log(res, "sdfsd");

            setData({
                Title: res.data.Title,
                Description :res.data.Description,
                image: res.data.image,
            })
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchPost();
    },[id])

    const handleUpdate =async()=>{
        try{
            const formData = new FormData();
            formData.append("Title", Data.Title);
            formData.append("Description", Data.Description);
            formData.append("image", Data.image);
            await updateBlogPut(formData, id)
            Navigate("/Body2")
        }catch(err){
            console.log(err)
        }

    }

    const handleCancel=()=>{
        Navigate("/Body2")
    }




        
    return(
        <>
        <div className="AddBlog">
            
            <div className="AddBlogInput">
                <h1 className="AddBlogtxt">Update Blog</h1>
                <input className="NewTitle" placeholder="Title" type="text" 
                value={Data.Title}
                onChange={(e)=> {
                setData({...Data, Title: e.target.value})}}></input>
                
                <br />
                


                <textarea className="NewDescription" placeholder="Description" type="textarea"
                value={Data.Description}
                onChange={(e)=> {
                
                setData({...Data,Description: e.target.value})}}></textarea>

                <br />
                

                <input className="NewImage" placeholder="Add Image" type="file"
                onChange={(e)=> {
            
                if(e.target.files.length){
                    const selectedFile = e.target.files[0]
                    setData({...Data,image: selectedFile})
                }
                else{
                    Data({...Data, image:{}})
                }}}></input>

                <br />
                
                <div className="AddBlogBtnParent">
                <button className="AddBlogBtn" onClick={handleUpdate}>Update</button>
                <button className="AddBlogBtn" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
        </>
    )
}
export default UpdateBlog;
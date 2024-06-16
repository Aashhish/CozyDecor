import express from "express";
import { Blog } from "../models/Blog.js";
import { applyMiddleWare } from "../middleWare/auth.js";
import multer from "multer";
import moment from "moment";
import { User } from "../models/User.js";
const BlogRouter = express.Router()


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"_"+file.originalname);
    }
});

const upload = multer({storage:storage})

BlogRouter.post("/Blog",applyMiddleWare,upload.single("image"), async(req, res)=>{
    try{
     
        const blog = new Blog({
            Title: req.body.Title,
            Description: req.body.Description,
            image: req.file.path,
            liked: req.body.liked,
            createdDate: new Date(),
            Comments: req.body.Comments,

        })
        const newPost = await blog.save();
        res.status(201).json(newPost);
    }
    catch(error){
    res.status(400).json({ message: error.message });
        
    }
});


BlogRouter.post("/Blog/Profile",applyMiddleWare,upload.single("image"), async(req, res)=>{
    try{
     
        const blog = new Blog({
            Title: req.body.Title,
            Description: req.body.Description,
            image: req.file.path,
            liked: req.body.liked,
            createdDate: new Date(),
            Comments: req.body.Comments,
            User: req.User,

        })
        const newPost = await blog.save();
        res.status(201).json(newPost);
    }
    catch(error){
    res.status(400).json({ message: error.message });
        
    }
});



BlogRouter.get("/Blog", applyMiddleWare, async (req, res)=>{
    try{
        const posts = await Blog.find();
        res.json(posts);
    }catch(err){
        console.log(err);
    }
});

BlogRouter.get("/Blog/:id",applyMiddleWare, async(req, res)=>{
    try{
        const id = req.params.id
        const blog = await Blog.findById(id);
        res.json(blog);
    }
    catch(err){
        console.log(err)
    }
});


BlogRouter.get("/Filtered-Blogs", async(req,res)=>{
    try{
        const {Title,createdDate} = req.query;
        let query = {};
        if(Title){
            query.Title = Title;
        }
        if(createdDate){
            const startOfDay=moment(createdDate).startOf("day").toDate();
            const endOfDay=moment(createdDate).endOf("day").toDate();
            query.createdDate={$gte:startOfDay,$lte:endOfDay}
        }
        const blogs = await Blog.find(query);
        console.log("Blog Found", blogs);
        res.json(blogs)
    }catch(err){
        console.log(err, "Error Filtering Blogs")
    }
})


BlogRouter.get("/Search-Blogs",async(req,res)=>{
    try{
        const {searchText} = req.query;
        if(!searchText){
            return res.json([]);
        }
        const blogs =  await Blog.find({
            Title: {$regex: searchText, $options: "i"}
        })
        res.json(blogs)

    }catch(err){
        console.log(err, "Error searching blogs")
    }
})



BlogRouter.put("/Blog/:id",applyMiddleWare,upload.single("image"), async(req, res)=>{
    try{
        const id = req.params.id
        const {Title, Description} = req.body
        const image= req.file.path
        const UpdatedBlog = await Blog.findByIdAndUpdate(
            id,
            {
                Title, 
                Description, 
                image,
                createdDate: new Date()
            },
            {new: true}
        );
        res.json(UpdatedBlog);
    }
    catch(err){
        console.log(err)
    }
})

BlogRouter.patch("/Blog/:id",applyMiddleWare, async(req, res)=>{
    try{
        const id = req.params.id
        const updates = req.body;
        const UpdatedDetail = await Blog.findByIdAndUpdate(id, updates,{new: true});
        res.json(UpdatedDetail);
    }
    catch(err){
        console.log(err)
    }
})



BlogRouter.delete("/Blog/:id",applyMiddleWare, async(req, res)=>{
    try{
        const id = req.params.id
        const deletedBlog = await Blog.findByIdAndDelete(id);
        res.json({message: "Blog Deleted Successfully"})
    }
    catch(err){
        console.log(err)
    }
})


BlogRouter.post("/Blog/:id/Comments",applyMiddleWare, async(req,res)=>{
    const id = req.params.id
    const {text} = req.body
    try{
        const post = await Blog.findById(id)
        if(!post){
            return res.status(404).json({message: "Post Not Found"});
        }
        post.Comments.push({text});
        await post.save();
        res.status(201).json(post);
    }catch(err){
        console.log(err, "Comments Error")
    }
})


BlogRouter.delete("/Blog/:blogId/Comments/:CommentsId", applyMiddleWare, async(req,res)=>{
    const blogId = req.params.blogId
    const CommentId = req.params.CommentsId
    try{
        const post = await Blog.findById(blogId)
        post.Comments.pull(CommentId)
        await post.save();
        res.json({message: "Comment Deleted"})
    }catch(err){
        console.log(err, "Comments Error")
    }
})

export default BlogRouter;
import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
Title:{
    type: String,
    required: true,
},
Description:{
    type: String,
    required: true,
},
image:{
    type: String,
    required: true,
},

createdDate:{
    type: Date
},

UpdatedDate:{
    type: Date
},

liked:{
    type: Boolean,
    default:false
},

Comments:[
    {
        text:{
            type:String
        },
        CreatedAt:{
            type:Date,
            default:Date.now
        },
    },
],
})
export const Blog= mongoose.model("Blog", BlogSchema)
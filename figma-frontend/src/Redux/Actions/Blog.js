import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  SaveComments,
  createBlog,
  deleteBlog,
  deleteComments,
  getBlog,
  getBlogDetails,
  getProfile,
  getSearch,
  updateBlogPatch,
  getFilterPost,
  updateBlogPut,
} from "../../endpoints";

export const getPost = createAsyncThunk("post/getPosts", async () => {
  try {
    const response = await getBlog();
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err, "error during fetching post data");
  }
});

export const createPost = createAsyncThunk("post/createPost", async (Data) => {
  try {
    const res = await createBlog(Data);
    return res.data;
  } catch (err) {
    console.log(err, "error during fetching create post");
  }
});

export const getPostById = createAsyncThunk(
  "/post/getPostById",
  async ({ id }) => {
    try {
      const res = await getBlogDetails(id);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err, "error during fetching particular post data");
    }
  }
);

export const updatePost = createAsyncThunk(
  "/post/updatePost",
  async ({ Data, id }) => {
    try {
      const res = await updateBlogPut(Data, id);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err, "error during updating post");
    }
  }
);

export const deletePost = createAsyncThunk("/post/deletePost", async (id) => {
  try {
    const res = await deleteBlog(id);
    return res.data;
  } catch (err) {
    console.log(err, "error during deleting post");
  }
});

export const addComment = createAsyncThunk(
  "/post/addComment",
  async ({ Data, id }) => {
    try {
      const res = await SaveComments(Data, id);
      return res.data;
    } catch (err) {
      console.log(err, "error during adding comments");
    }
  }
);

export const delComment = createAsyncThunk(
  "post/deleteComment",
  async ({ blogId, CommentsId }) => {
    try {
      const res = await deleteComments(blogId, CommentsId);
      return res.data;
    } catch (err) {
      console.log(err, "error during deleting comments");
    }
  }
);

export const getFilteredPost = createAsyncThunk(
  "post/getFilterPost",
  async () => {
    try {
      const response = await getBlog();
      return response.data;
    } catch (err) {
      console.log(err, "error during fetching post filter data");
    }
  }
);

export const fetchFilteredPost = createAsyncThunk(
  "post/fetchFilteredPost",
  async ({ title, created_Date }) => {
    try {
      const response = await getFilterPost(title, created_Date);
      return response.data;
    } catch (err) {
      console.log(err, "error during fetching filtered post");
    }
  }
);

export const toggleLikeBtn = createAsyncThunk(
  "post/toggleLikeBtn",
  async ({ liked, postId }) => {
    console.log(liked, postId, "ashsii");
    try {
      const response = await updateBlogPatch({ liked }, postId);
      return response.data;
    } catch (err) {
      console.log(err, "error during editing blog by patch method");
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (userId) => {
    try {
      const response = await getProfile(userId);
      return response.data.user;
    } catch (err) {
      console.log(err, "error during fetching user profile");
    }
  }
);

export const fetchSearchByDatePost = createAsyncThunk(
  "blogs/fetchSearchByDatePost",
  async (searchText) => {
    try {
      const response = await getSearch(searchText);
      return response.data;
    } catch (err) {
      console.log(err, "error during fetching search by post");
    }
  }
);

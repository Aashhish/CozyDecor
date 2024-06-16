import axios from "axios";
const Base_url = "http://localhost:5000";
const token = localStorage.getItem("token");
const API = axios.create({
  baseURL: Base_url,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const createBlog = (Data) => API.post("/blogs/Blog", Data);

export const deleteBlog = (id) => API.delete(`/blogs/Blog/${id}`);

export const getBlog = () => API.get("/blogs/Blog");

export const getBlogDetails = (id) => API.get(`/blogs/Blog/${id}`);

export const updateBlogPatch = (Data, id) =>
  API.patch(`/blogs/Blog/${id}`, Data);

export const updateBlogPut = (Data, id) => API.put(`/blogs/Blog/${id}`, Data);

export const SaveComments = (Data, id) =>
  API.post(`/blogs/Blog/${id}/Comments`, Data);

export const deleteComments = (blogId, CommentsId) =>
  API.delete(`/blogs/Blog/${blogId}/Comments/${CommentsId}`);

export const getProfile = (UserID) => API.get(`/auth/Profile/${UserID}`);

export const UpdateUserProfile = (Data, UserID) =>
  API.patch(`/auth/Profile/${UserID}`, Data);

export const PatchProfilePhoto = (Data, UserID) =>
  API.patch(`/auth/ProfilePhoto/${UserID}`, Data);

export const deleteUserProfile = (UserID) =>
  API.delete(`/auth/Profile/${UserID}`);

export const SendResetMail = (Email) => API.post(`/auth/ResetPassword/`, Email);

export const ResetPass = (formData) =>
  API.post(`/auth/reset-password`, formData);

export const getFilterPost = (title, created_Date) =>
  API.get(`/blogs/Filtered-Blogs?Title=${title}&createdDate=${created_Date}`);

export const getSearch = (searchText) =>
  API.get(`/blogs/Search-Blogs?searchText=${searchText}`);

export const getProfileBlogs = () => API.get(`/blogs/Blog/Profile`);

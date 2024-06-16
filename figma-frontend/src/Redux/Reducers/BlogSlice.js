import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFilteredPost,
  fetchUserProfile,
  getFilteredPost,
  getPost,
  getPostById,
  fetchSearchByDatePost,
} from "../Actions/Blog";

const initialState = {
  posts: [],
  postForFilter: [],
  userData: {},
  blogs: [],
  post: null,
  loading: false,
  error: null,
};

export const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(getPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //Handle fetchUserProfile actions
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle getFilterPost actions
    builder.addCase(getFilteredPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFilteredPost.fulfilled, (state, action) => {
      state.loading = false;
      state.postForFilter = action.payload;
    });
    builder.addCase(getFilteredPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //Handle fetchFilteredPost actions
    builder.addCase(fetchFilteredPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFilteredPost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchFilteredPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //Handle getPostById actions
    builder.addCase(getPostById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.loading = false;
      state.post = action.payload; // Store the fetched post data in the `post` state
    });
    builder.addCase(getPostById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    //Handle fetchSearchByDatePost actions
    builder.addCase(fetchSearchByDatePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSearchByDatePost.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
    });
    builder.addCase(fetchSearchByDatePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export interface PostState {
  list: Post[];
  status: "idle" | "loading" | "failed";
  error: string | undefined;
}

const initialState: PostState = {
  list: [],
  status: "idle",
  error: "",
};

export const getAllPosts = createAsyncThunk("posts/fetchAllPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) throw new Error("Not found resources");

  const data: Post[] = await response.json();

  return data;
});

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectPosts = (state: RootState) => state.posts.list;
export const selectStatus = (state: RootState) => state.posts.status;
export const selectPostError = (state: RootState) => state.posts.error;
export default postSlice.reducer;

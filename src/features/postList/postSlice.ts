import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export const URL_POSTS: string = "https://jsonplaceholder.typicode.com/posts";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export interface PostState {
  list: Post[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: PostState = {
  list: [],
  status: "idle",
  error: null,
};

export const getAllPosts = createAsyncThunk(
  "@@posts/fetchAllPosts",
  async (_, { rejectWithValue }) => {
    const response = await fetch(URL_POSTS);

    if (!response.ok) return rejectWithValue("Not found resources");

    const data: Post[] = await response.json();

    return data;
  }
);

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
        state.error = action.payload as string;
      });
  },
});

export const selectPosts = (state: RootState) => state.posts.list;
export const selectStatus = (state: RootState) => state.posts.status;
export const selectPostError = (state: RootState) => state.posts.error;
export default postSlice.reducer;

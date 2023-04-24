import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStep } from "../../app/types";
import { getCommentsCount } from "../commentList/commentSlice";

export const URL_POSTS: string = "https://jsonplaceholder.typicode.com/posts";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export interface PostState {
  list: Post[];
  status: ApiStep;
  error: string | null;
}

const initialState: PostState = {
  list: [],
  status: ApiStep.idle,
  error: null,
};

export const getAllPosts = createAsyncThunk(
  "@@posts/fetchAllPosts",
  async (_, { rejectWithValue, dispatch }) => {
    const response = await fetch(URL_POSTS);

    if (!response.ok) return rejectWithValue("Not found resources");

    const data: Post[] = await response.json();

    dispatch(getCommentsCount());

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
        state.status = ApiStep.loading;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.status = ApiStep.idle;
        state.list = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = ApiStep.failed;
        state.error = action.payload as string;
      });
  },
});

export default postSlice.reducer;

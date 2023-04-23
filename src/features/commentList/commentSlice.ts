import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { URL_POSTS } from "../postList/postSlice";

export const URL_COMMENTS: string =
  "https://jsonplaceholder.typicode.com/comments";

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export interface CommentState {
  list: Comment[];
  status: "idle" | "loading" | "failed";
  commentsCount: Record<number, number>;
  error: string | null;
}

const initialState: CommentState = {
  list: [],
  status: "idle",
  commentsCount: {},
  error: null,
};

export const getCommentById = createAsyncThunk(
  "@@comments/fetchCommentById",
  async (id: string, { rejectWithValue }) => {
    const response = await fetch(`${URL_POSTS}/${id}/comments`);

    if (!response.ok) return rejectWithValue(`Cannot find ${id} id`);

    const data: Comment[] = await response.json();

    return data;
  }
);

export const getCommentsCount = createAsyncThunk(
  "comments/commentsCount",
  async (_, { rejectWithValue }) => {
    const response = await fetch(URL_COMMENTS);

    if (!response.ok) return rejectWithValue("Cannot find this resource");

    const data: Comment[] = await response.json();

    return data.reduce((acc: Record<number, number>, curr) => {
      acc.hasOwnProperty(curr.postId)
        ? acc[curr.postId]++
        : (acc[curr.postId] = 1);

      return acc;
    }, {});
  }
);

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentById.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.status = "failed";
        } else {
          state.status = "idle";
          state.list = action.payload;
        }
      })
      .addCase(getCommentsCount.fulfilled, (state, action) => {
        state.status = "idle";
        state.commentsCount = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload as string;
        }
      );
  },
});

export const selectComments = (state: RootState) => state.comments.list;
export const selectCommentsError = (state: RootState) => state.comments.error;
export const selectCommentsStatus = (state: RootState) => state.comments.status;
export const selectCommentsCount = (state: RootState) =>
  state.comments.commentsCount;
export default commentSlice.reducer;

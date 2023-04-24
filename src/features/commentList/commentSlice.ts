import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL_POSTS } from "../postList/postSlice";
import { ApiStep } from "../../app/types";

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
  status: ApiStep;
  commentsCount: Record<number, number>;
  error: string | null;
}

const initialState: CommentState = {
  list: [],
  status: ApiStep.idle,
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
  "@@comments/commentsCount",
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
          state.status = ApiStep.failed;
        } else {
          state.status = ApiStep.idle;
          state.list = action.payload;
        }
      })
      .addCase(getCommentsCount.fulfilled, (state, action) => {
        state.status = ApiStep.idle;
        state.commentsCount = action.payload || {};
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = ApiStep.loading;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = ApiStep.failed;
          state.error = action.payload as string;
        }
      );
  },
});

export default commentSlice.reducer;

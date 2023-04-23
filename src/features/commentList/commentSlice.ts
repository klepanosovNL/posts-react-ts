import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

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
  error: string | undefined;
}

const initialState: CommentState = {
  list: [],
  status: "idle",
  commentsCount: {},
  error: "",
};

export const getCommentById = createAsyncThunk(
  "comments/fetchCommentById",
  async (id: string) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    if (!response.ok) throw new Error(`Cannot find ${id} id`);

    const data: Comment[] = await response.json();

    return data;
  }
);

export const getCommentsCount = createAsyncThunk(
  "comments/commentsCount",
  async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    );

    if (!response.ok) throw new Error("Cannot find this resource");

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
      .addCase(getCommentById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCommentById.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.status = "failed";
        } else {
          state.status = "idle";
          state.list = action.payload;
        }
      })
      .addCase(getCommentById.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getCommentsCount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCommentsCount.fulfilled, (state, action) => {
        state.status = "idle";
        state.commentsCount = action.payload;
      })
      .addCase(getCommentsCount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectComments = (state: RootState) => state.comments.list;
export const selectCommentsError = (state: RootState) => state.comments.error;
export const selectCommentsStatus = (state: RootState) => state.comments.status;
export const selectCommentsCount = (state: RootState) =>
  state.comments.commentsCount;
export default commentSlice.reducer;

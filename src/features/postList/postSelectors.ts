import { RootState } from "../../app/store";

export const selectPosts = (state: RootState) => state.posts.list;
export const selectPostStatus = (state: RootState) => state.posts.status;
export const selectPostError = (state: RootState) => state.posts.error;

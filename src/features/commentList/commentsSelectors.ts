import { RootState } from "../../app/store";

export const selectComments = (state: RootState) => state.comments.list;
export const selectCommentsError = (state: RootState) => state.comments.error;
export const selectCommentsStatus = (state: RootState) => state.comments.status;
export const selectCommentsCount = (state: RootState) =>
  state.comments.commentsCount;

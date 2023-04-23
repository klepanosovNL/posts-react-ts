import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import postsReducer from "../features/postList/postSlice";
import commentsReducer from "../features/commentList/commentSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

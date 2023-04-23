import { useEffect } from "react";

import { Post } from "../../components/post/Post";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getAllPosts,
  selectPostError,
  selectPosts,
  selectStatus,
} from "./postSlice";
import { getCommentsCount } from "../commentList/commentSlice";

import styles from "./PostList.module.scss";
import { ErrorPage } from "../../pages/errorPage/ErrorPage";

export const PostList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const statusPost = useAppSelector(selectStatus);
  const errorText = useAppSelector(selectPostError);

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getCommentsCount());
  }, [dispatch]);

  if (statusPost === "failed")
    return <ErrorPage text={errorText || "oopps.."} />;

  return (
    <div className={styles.posts}>
      {posts.map(
        ({ title, id, body }): JSX.Element => (
          <Post title={title} description={body} id={id} key={id} />
        )
      )}
    </div>
  );
};

import { useEffect } from "react";

import { Post } from "../../components/post/Post";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllPosts } from "./postSlice";
import { ErrorPage } from "../../pages/errorPage/ErrorPage";
import {
  selectPostError,
  selectPosts,
  selectPostStatus,
} from "./postSelectors";
import { ApiStep } from "../../app/types";

import styles from "./PostList.module.scss";

export const PostList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const statusPost = useAppSelector(selectPostStatus);
  const errorText = useAppSelector(selectPostError);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (statusPost === ApiStep.failed)
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

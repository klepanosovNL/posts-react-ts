import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

import { Comment as CommentType, getCommentById } from "./commentSlice";
import { Comment } from "../../components/comment/Comment";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectComments,
  selectCommentsError,
  selectCommentsStatus,
} from "./commentsSelectors";
import { ApiStep } from "../../app/types";
import { ErrorPage } from "../../pages/errorPage/ErrorPage";

import styles from "./Comments.module.scss";

export const CommentList = (): JSX.Element => {
  const comments: CommentType[] = useAppSelector(selectComments);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectCommentsStatus);
  const errorText = useAppSelector(selectCommentsError);
  useEffect(() => {
    id && dispatch(getCommentById(id));
  }, [dispatch, id]);

  if (status === ApiStep.failed)
    return <ErrorPage text={errorText || "Oopps"} />;

  return (
    <>
      <Link to="/">back</Link>
      <div className={styles.comments}>
        {comments.map(
          ({ body, name, id, email }): JSX.Element => (
            <Comment text={body} key={id} email={email} name={name} />
          )
        )}
      </div>
    </>
  );
};

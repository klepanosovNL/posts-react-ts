import { Link } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { selectCommentsCount } from "../../features/commentList/commentsSelectors";

import styles from "./Post.module.scss";

interface PostProps {
  title: string;
  description: string;
  id: number;
}

export const Post = ({ title, description, id }: PostProps): JSX.Element => {
  const commentsCount = useAppSelector(selectCommentsCount) as Record<
    number,
    number
  >;

  const linkElement: JSX.Element = commentsCount.hasOwnProperty(id) ? (
    <Link
      to={`/comments/${id}`}
    >{`View all ${commentsCount[id]} comments`}</Link>
  ) : (
    <span>No comments</span>
  );

  return (
    <div className={styles.post}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.description}>{description}</div>
      {linkElement}
    </div>
  );
};

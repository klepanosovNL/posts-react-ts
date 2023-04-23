import { ReactComponent as User } from "../../assets/user.svg";

import styles from "./Comment.module.scss";

interface CommentProps {
  text: string;
  email: string;
  name: string;
}

export const Comment = ({ text, email, name }: CommentProps): JSX.Element => {
  return (
    <div className={styles.comment}>
      <div className={styles.user}>
        <User className={styles.avatar} />
        <div className={styles.info}>
          <div>
            <label htmlFor={name}>Name:</label>
            <span id={name}>{name}</span>
          </div>
          <div>
            <label htmlFor={email}>Email:</label>
            <a href={`mailto:${email}`} id={email} className={styles.email}>
              {email}
            </a>
          </div>
        </div>
      </div>

      <div className={styles.text}>{text}</div>
    </div>
  );
};

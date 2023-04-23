import { Link } from "react-router-dom";

import { ReactComponent as NotFountSvg } from "../../assets/404.svg";

import styles from "./ErrorPage.module.scss";

interface ErrorPageProps {
  text?: string;
}

export const ErrorPage = ({ text }: ErrorPageProps): JSX.Element => (
  <>
    <div className={styles.text}>{text}</div>
    <Link to="/">home</Link>
    <NotFountSvg />
  </>
);

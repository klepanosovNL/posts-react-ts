import { ThemeSwitcher } from "../themeSwitcher/ThemeSwitcher";

import styles from "./Header.module.scss";

export const Header = () => (
  <div className={styles.header}>
    <div className={styles.logo}>posts&comments</div>
    <ThemeSwitcher />
  </div>
);

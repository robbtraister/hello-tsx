import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useUser } from "src/contexts/user";

import styles from "./styles.scss";

function Tab({
  children,
  className,
  to,
}: {
  children: any;
  className?: string;
  to: string;
}) {
  return (
    <li className={`${styles.tab} ${className || ""}`.trim()}>
      <NavLink to={to}>{children}</NavLink>
    </li>
  );
}

function Profile() {
  const user = useUser();

  return (
    <div className={`${styles.tab} ${styles.profile}`}>
      <NavLink to={user ? "/profile" : "/login"}>
        {user ? user.name : "Login"}
      </NavLink>
    </div>
  );
}

export function Header() {
  const user = useUser();
  const [open, setOpen] = useState<boolean>();

  useEffect(() => {
    if (open) {
      const close = () => setOpen(false);
      document.addEventListener("click", close);
      return () => document.removeEventListener("click", close);
    }
  }, [open]);

  const toggleOpen = useCallback((e) => {
    e.preventDefault();
    setOpen((o) => !o);
  }, []);

  return (
    <>
      <nav className={styles.nav}>
        <div
          className={`${styles.container} ${
            open ? styles.open : open === false ? styles.closed : ""
          }`.trim()}
        >
          <NavLink to="/" className={`${styles.logo} ${styles.desktop}`}>
            <div className={styles.hello}>Hello</div>
            <div className={styles.wallet}>Wallet</div>
          </NavLink>
          {user && (
            <>
              <input type="checkbox" id="logo-box" />
              <label
                htmlFor="logo-box"
                className={`${styles.logo} ${styles.mobile}`}
                onClick={toggleOpen}
              >
                <div title="hamburger menu" className={styles.hamburger}>
                  <div className={styles.layer} />
                  <div className={styles.layer} />
                  <div className={styles.layer} />
                </div>
                <div className={styles.hello}>Hello</div>
                <div className={styles.wallet}>Wallet</div>
              </label>
              <div className={styles.menu}>
                <div className={styles.shade} />
                <ul className={styles.tabs}>
                  <Tab to="/dashboard">Home</Tab>
                  <Tab to="/score">Score</Tab>
                  <Tab to="/guidance">Guidance</Tab>
                  <Tab to="/accounts">Accounts</Tab>
                  <Tab to="/budget">Budget</Tab>
                </ul>
              </div>
            </>
          )}
          <Profile />
        </div>
      </nav>
    </>
  );
}

import Link from "next/link";
import React from "react";
import styles from "../../styles/Home.module.css";

const Header = () => {
  return (
    <header>
      <nav className={styles.nav}>
        <Link href="/" passHref>
          Home
        </Link>
        <Link href="/about-us" passHref>
          About us
        </Link>
        <Link href="/events" passHref>
          Events
        </Link>
      </nav>
    </header>
  );
};

export default Header;

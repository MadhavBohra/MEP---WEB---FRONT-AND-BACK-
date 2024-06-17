import React from 'react';
import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src='/logo.png' alt="Logo" className={styles.logo} />
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}><a href="/home" className={styles.navLink}>Home</a></li>
          <li className={styles.navItem}><a href="/aboutus" className={styles.navLink}>About Us</a></li>
          <li className={styles.navItem}><a href="/blogs" className={styles.navLink}>Blogs</a></li>
          <li className={styles.navItem}><a href="/contact" className={styles.navLink}>Contact</a></li>
          <li className={styles.navItem}><a href="/faqs" className={styles.navLink}>FAQs</a></li>
          <li className={styles.navItem}><a href="/search" className={styles.navLink}><img src='/search.png' alt="Search" className={styles.icon} /></a></li>
        </ul>
      </nav>
      <div className={styles.iconsContainer}>
        <a href="/notifications" className={styles.iconLink}><img src='/Bell.png' alt="Notifications" className={styles.icon} /></a>
        <a href="/settings" className={styles.iconLink}><img src='/settings.png' alt="Settings" className={styles.iconLarge} /></a>
        <a href="/profile" className={styles.iconLink}><img src='/avataricon.png' alt="Avatar" className={styles.icon} /></a>
      </div>
    </header>
  );
};

export default Header;

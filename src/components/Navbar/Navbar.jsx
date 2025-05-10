import styles from './navbar.module.css';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.logo}>
        <h1>آزمون یکتا</h1>
      </div>
      <nav className={styles.navigation}>
        <Link  to="/"  className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`} >انجام آزمون</Link>
        <Link 
          to="/Admin" 
          className={`${styles.navLink} ${location.pathname === '/Admin' ? styles.active : ''}`}
        >
          ( تست)مدیریت سوالات
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
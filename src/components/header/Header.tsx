import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export function Header() {
  return (
    <div className={styles.header}>
      <span className={styles.text}>Hi, guest! 👋</span>
      {/* <span className={styles.text}>Hi, user! 👋</span> */}
      <Link to='/login' className={styles.button}>Log in</Link>
    </div>
  )
}
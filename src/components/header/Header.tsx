import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import Logo from '../../../public/favIcon.png';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';

export function Header() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className={styles.header}>
      {user ? (
        <>
          <Link className={styles.link} to="/">
            <img className={styles.logo} src={Logo} alt="Logo" />
            <span className={styles.text}>Hi, {user.name}! 👋</span>
          </Link>

          <button onClick={handleLogout} className={styles.button}>
            Log out
          </button>
        </>
      ) : (
        <>
          <Link className={styles.link} to="/">
            <img className={styles.logo} src={Logo} alt="Logo" />
            <span className={styles.text}>Hi, guest! 👋</span>
          </Link>

          <Link to="/login" className={styles.button}>
            Log in
          </Link>
        </>
      )}
    </div>
  );
}

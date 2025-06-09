import { Link } from 'react-router-dom';
import { Searchbar } from '../../components/searchbar/Searchbar';
import styles from './HomePage.module.scss';
import { useAppSelector } from '../../app/hooks';
import type { RootState } from '../../app/store';

export function HomePage() {
  const user = useAppSelector((state: RootState) => state.auth.user);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {user ? (
          <>
            <h2>Find a new movie to watch 🍿</h2>

            <p>{`Type a movie or an actor's name:`}</p>

            <Searchbar />

            <div className="card-container">
              {/* <Card 
                title={title}
                year={releaseYear}
                format={format}
                actors={stars}
              /> */}
            </div>

            <Link to="/all-movies" className={styles.button}>
              My movies
            </Link>

            <Link to="/add-movie" className={styles.button}>
              Add a new movie
            </Link>
          </>
        ) : (
          <>
            <p className={styles.text}>Do you have account?</p>

            <Link to="/login" className={styles.button}>
              Log in
            </Link>

            <p className={styles.text}>Are you new here?</p>

            <Link to="/register" className={styles.button}>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

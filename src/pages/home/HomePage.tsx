import { Link } from 'react-router-dom';
import { Searchbar } from '../../components/searchbar/Searchbar';
import styles from './HomePage.module.scss';

export function HomePage() {

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <p className={styles.text}>Do you have account?</p>

        <Link to="/login" className={styles.button}>Log in</Link>

        <p className={styles.text}>Are you new here?</p>

        <Link to="/register" className={styles.button}>Register</Link>
      </div>
      
      <div className={styles.container}>
        <h2>Find a new movie to watch 🍿</h2>

        <p>Type a movie or an actor's name:</p>

        <Searchbar />
        
        <div className="card-container">
          {/* <Card 
            title={title}
            year={releaseYear}
            format={format}
            actors={stars}
          /> */}
        </div>

        <Link to="/films" className={styles.button}>Check your movie list</Link>
      </div>
    </div>
  )
}
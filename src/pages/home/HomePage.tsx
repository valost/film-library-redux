import { Link } from 'react-router-dom';
import { Searchbar } from '../../components/searchbar/Searchbar';
import styles from './HomePage.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { RootState } from '../../app/store';
import { useState } from 'react';
import {
  showMovieById,
  showMoviesByQuery,
} from '../../features/movies/movieActions';
import { MovieModal } from '../../components/movie-modal/MovieModal';
import { clearMoviesByQuery } from '../../features/movies/movieSlice';
import Loader from '../../components/loader/Loader';

export function HomePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const movies = useAppSelector((state) => state.movie.moviesByQuery);
  const selectedMovie = useAppSelector((state) => state.movie.selectedMovie);
  const loading = useAppSelector((state) => state.movie.loading);
  const error = useAppSelector((state) => state.movie.error);

  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [movieModal, setMovieModal] = useState(false);

  const handleSearch = (query: string) => {
    dispatch(showMoviesByQuery(query));
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {user ? (
          <>
            <h2>Find a new movie to watch 🍿</h2>

            <p>{`Type a movie or an actor's name:`}</p>

            <Searchbar onSearch={handleSearch} />

            {loading && <Loader />}

            {!loading && !error && movies.length !== 0 && (
              <>
                <button
                  className={styles.whiteButton}
                  onClick={() => dispatch(clearMoviesByQuery())}
                >
                  Clear search
                </button>

                <div className={styles.cardContainer}>
                  {movies.map((movie) => (
                    <div className={styles.card} key={movie.id}>
                      <h4>{movie.title}</h4>
                      <button
                        onClick={() => {
                          setMovieModal(true);
                          setSelectedMovieId(movie.id);
                          dispatch(showMovieById(movie.id));

                          console.log(selectedMovieId);
                        }}
                        className={styles.button}
                      >
                        Details
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {error && <p>No movies found. 😕</p>}

            <div className={styles.wrapper}>
              <Link to="/all-movies" className={styles.purpleButton}>
                My movies
              </Link>

              <Link to="/add-movie" className={styles.purpleButton}>
                Add a new movie
              </Link>

              <Link to="/add-file" className={styles.purpleButton}>
                Upload movies from file
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className={styles.text}>Do you have account?</p>

            <Link to="/login" className={styles.purpleButton}>
              Log in
            </Link>

            <p className={styles.text}>Are you new here?</p>

            <Link to="/register" className={styles.purpleButton}>
              Register
            </Link>
          </>
        )}
      </div>

      {movieModal && selectedMovie && (
        <div className={styles.modalOverlay}>
          <MovieModal
            onClose={() => {
              setMovieModal(false);
              setSelectedMovieId(null);
            }}
            movie={selectedMovie}
          />
        </div>
      )}
    </div>
  );
}

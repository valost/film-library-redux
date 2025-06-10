import styles from './MoviesPage.module.scss';
import { useEffect, useState } from 'react';
import arrowRight from '../../../public/img/icons/arrow-right.svg';
import arrowLeft from '../../../public/img/icons/arrow-left.svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  deleteMovie,
  showAllMovies,
  showMovieById,
} from '../../features/movies/movieActions';
import Loader from '../../components/loader/Loader';
import { MovieModal } from '../../components/movie-modal/MovieModal';
import { ErrorModal } from '../../components/error-modal/ErrorModal';
import { Link } from 'react-router-dom';

export function MoviesPage() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movie.allMovies);
  const loading = useAppSelector((state) => state.movie.loading);
  const error = useAppSelector((state) => state.movie.error);
  const selectedMovie = useAppSelector((state) => state.movie.selectedMovie);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;
  const [movieModal, setMovieModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(showAllMovies());
  }, [dispatch]);

  useEffect(() => {
    if (movieModal) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  }, [movieModal]);

  const allPages = Math.ceil(movies.length / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = movies.slice(indexOfFirstCard, indexOfLastCard);

  const handleDeleteMovie = async (id: number) => {
    const isLastItemOnPage = currentCards.length === 1 && currentPage > 1;

    try {
      await dispatch(deleteMovie(id)).unwrap();

      if (isLastItemOnPage) {
        setCurrentPage((prev) => prev - 1);
      }
    } catch (error) {
      console.error('Failed to delete movie:', error);
      setErrorModal(true);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {loading ? (
          <Loader />
        ) : currentCards.length === 0 ? (
          <div className={styles.containerSmall}>
            <p className={styles.textBig}>No movies found. 😕</p>

            <Link to="/" className={styles.button}>
              Back to home page
            </Link>
          </div>
        ) : (
          <>
            <h2>All movies:</h2>

            <div className={styles.cardContainer}>
              {currentCards.map((card) => (
                <div className={styles.card} key={card.id}>
                  <h4>{card.title}</h4>

                  <div className={styles.wrapper}>
                    <button
                      onClick={() => {
                        setMovieModal(true);
                        setSelectedMovieId(card.id);
                        dispatch(showMovieById(card.id));

                        console.log(selectedMovieId);
                      }}
                      className={styles.purpleButton}
                    >
                      Details
                    </button>

                    <button
                      className={styles.whiteButton}
                      onClick={() => handleDeleteMovie(card.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
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

            {errorModal && error && (
              <div className={styles.modalOverlay}>
                <ErrorModal
                  error={error}
                  onClose={() => setErrorModal(false)}
                />
              </div>
            )}

            <div className={styles.pagination}>
              <button
                className={styles.paginationButton}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <img src={arrowLeft} alt="Arrow" />
              </button>

              <span className={styles.textSmall}>
                page {currentPage} of {allPages}
              </span>

              <button
                className={styles.paginationButton}
                disabled={currentPage === allPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <img src={arrowRight} alt="Arrow" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

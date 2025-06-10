import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Loader from '../../components/loader/Loader';
import styles from './UploadMovies.module.scss';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { ErrorModal } from '../../components/error-modal/ErrorModal';
import { importMovieList } from '../../features/movies/movieActions';
import { resetMovieState } from '../../features/movies/movieSlice';

type FormValues = {
  movies: FileList;
};

export function UploadMoviesPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { loading, error, success } = useAppSelector((state) => state.movie);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    if (error) {
      setErrorModal(true);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      reset();
      navigate('/all-movies');
      dispatch(resetMovieState());
    }
  }, [success, navigate, reset, dispatch]);

  useEffect(() => {
    if (errorModal) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  }, [errorModal]);

  const submitForm = ({ movies }: FormValues) => {
    const formData = new FormData();
    console.log(movies[0]);

    formData.append('movies', movies[0]);
    dispatch(importMovieList(formData));
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor="email">
              Choose file:
            </label>
            <input
              className={styles.input}
              type="file"
              accept=".txt"
              id="movies"
              {...register('movies', {
                required: 'Please choose file',
              })}
            />

            {errors.movies && (
              <span className={styles.errorMessage}>
                {errors.movies.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={`${styles.button} ${loading ? styles.isLoading : ''}`}
          >
            {loading ? <Loader /> : 'Upload'}
          </button>

          <button
            className={styles.buttonWhite}
            onClick={() => {
              reset();
              navigate('/');
            }}
          >
            Cancel
          </button>

          {errorModal && error && typeof error === 'string' && (
            <div className={styles.modalOverlay}>
              <ErrorModal error={error} onClose={() => setErrorModal(false)} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Loader from '../../components/loader/Loader';
import styles from './UploadMovies.module.scss';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { ErrorModal } from '../../components/error-modal/ErrorModal';
import { addMovie } from '../../features/movies/movieActions';
import { resetMovieState } from '../../features/movies/movieSlice';
import {
  parseMovieTextFile,
  readFileAsText,
} from '../../utils/parseMovieTextFile';
import type { MovieUploadError } from '../../utils/types';

type FormValues = {
  file: FileList;
};

export function UploadMoviesPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { loading, error } = useAppSelector((state) => state.movie);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorModal, setErrorModal] = useState(false);
  const [fileError, setFileError] = useState<string>('');

  useEffect(() => {
    dispatch(resetMovieState());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setErrorModal(true);
    }
  }, [error]);

  useEffect(() => {
    if (errorModal) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  }, [errorModal]);

  // const submitForm = ({ movies }: FormValues) => {
  //   const formData = new FormData();
  //   console.log(movies[0]);

  //   formData.append('movies', movies[0]);
  //   dispatch(importMovieList(formData));
  // };

  const submitForm = async (data: FormValues) => {
    setFileError('');
    setErrorModal(false);
    dispatch(resetMovieState());

    let hasError = false;

    try {
      const file = data.file[0];

      if (!file) return;

      if (file.type !== 'text/plain') {
        setFileError('Please upload a .txt file');
        setErrorModal(true);
        hasError = true;
        return;
      }

      const content = await readFileAsText(file);

      let movies;

      try {
        movies = parseMovieTextFile(content);
      } catch (parseError: unknown) {
        setFileError(
          parseError instanceof Error
            ? parseError.message
            : 'Invalid movie details format',
        );
        setErrorModal(true);
        hasError = true;
        return;
      }

      for (const movie of movies) {
        try {
          await dispatch(addMovie(movie)).unwrap();
        } catch (err) {
          const error = err as MovieUploadError;

          if (error?.error?.code === 'FORMAT_ERROR') {
            setFileError(
              'The uploaded file contains movies with missing or wrong fields.',
            );
          } else {
            setFileError('An error occurred while uploading the file.');
          }

          setErrorModal(true);
          hasError = true;
          break;
        }
      }

      if (!hasError) {
        reset();
        navigate('/all-movies');
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to parse file';
      setFileError(message);
      setErrorModal(true);
      hasError = true;
    }
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
              {...register('file', {
                required: 'Please choose file',
              })}
            />

            {errors.file && (
              <span className={styles.errorMessage}>{errors.file.message}</span>
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

          {errorModal && fileError && (
            <div className={styles.modalOverlay}>
              <ErrorModal
                error={fileError}
                onClose={() => setErrorModal(false)}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

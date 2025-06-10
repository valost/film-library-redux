import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Loader from '../../components/loader/Loader';
import styles from './UploadMovies.module.scss';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { ErrorModal } from '../../components/error-modal/ErrorModal';
import { addMovie } from '../../features/movies/movieActions';
import { resetMovieState } from '../../features/movies/movieSlice';
import { parseMovieTextFile } from '../../utils/parseMovieTextFile';

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

  const { loading, error, success } = useAppSelector((state) => state.movie);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorModal, setErrorModal] = useState(false);
  const [fileError, setFileError] = useState<string>('');

  useEffect(() => {
    if (error) {
      setErrorModal(true);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      reset();
      dispatch(resetMovieState());
      navigate('/all-movies');
    }
  }, [success, navigate, reset, dispatch]);

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

    try {
      const file = data.file[0];

      if (!file) return;

      if (file.type !== 'text/plain') {
        setFileError('Please upload a .txt file');
        setErrorModal(true);
        return;
      }

      const reader = new FileReader();

      reader.onload = async (event) => {
        try {
          const content = event.target?.result as string;

          // console.log(content);

          const movies = parseMovieTextFile(content);

          // console.log(movies);

          for (const movie of movies) {
            console.log('movie:', movie);

            await dispatch(addMovie(movie)).unwrap();
          }

          reset();
        } catch (err: unknown) {
          const message =
            err instanceof Error ? err.message : 'Failed to parse file';

          setFileError(message);
          setErrorModal(true);

          console.log(fileError);
        }
      };

      reader.onerror = () => {
        setFileError('Failed to read file');
        setErrorModal(true);
      };

      reader.readAsText(file);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to parse file';

      setFileError(message);
      setErrorModal(true);
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

          {errorModal && error && typeof error === 'string' && (
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

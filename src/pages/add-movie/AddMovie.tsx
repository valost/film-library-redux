import { useForm } from 'react-hook-form';
import styles from './AddMovie.module.scss';
import type { Format } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { addMovie } from '../../features/movies/movieActions';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { Dropdown } from '../../components/dropdown/Dropdown';
import { resetMovieState } from '../../features/movies/movieSlice';

const formats = ['VHS', 'DVD', 'Blu-Ray'];

type FormValues = {
  title: string;
  year: string;
  format: Format;
  actors: string;
};

export function AddMovie() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      year: '',
      format: 'Blu-Ray',
      actors: '',
    },
  });

  const { loading, error, success } = useAppSelector((state) => state.movie);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const methods = useForm();

  useEffect(() => {
    if (success) {
      reset();
      dispatch(resetMovieState());
      navigate('/all-movies');
    }
  }, [dispatch, success, reset, navigate]);

  const submitForm = (data: FormValues) => {
    console.log('data:', data);

    const actorsArr = data.actors
      .split(',')
      .map((name) => name.trim())
      .filter((name) => name !== '');

    dispatch(
      addMovie({
        title: data.title,
        year: Number(data.year),
        format: data.format,
        actors: actorsArr,
      }),
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2>Add a new movie:</h2>

        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor="title">
              Title:
            </label>
            <input
              className={styles.input}
              type="text"
              id="title"
              {...register('title', {
                required: 'Please enter a title',
              })}
            />

            {errors.title && (
              <span className={styles.errorMessage}>
                {errors.title.message}
              </span>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor="year">
              Year:
            </label>
            <input
              className={styles.input}
              type=""
              id="year"
              {...register('year', {
                required: 'Please enter a year',
                validate: (value) => {
                  const year = Number(value);
                  if (isNaN(year)) return 'Year must be a number';
                  if (year < 1888) return 'Year must be no earlier than 1888';
                  if (year > 2024) return 'Year must be no later than 2025';
                  return true;
                },
              })}
            />

            {errors.year && (
              <span className={styles.errorMessage}>{errors.year.message}</span>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor="format">
              Format:
            </label>
            {/* <Dropdown formats={formats} name="format" /> */}

            <select
              className={styles.input}
              id="format"
              {...register('format', {
                required: 'Please choose format',
              })}
            >
              {formats.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor="actors">
              Actors:
            </label>
            <p className={styles.smallText}>
              {`(enter actors separated by commas)`}
            </p>
            <textarea
              className={styles.textarea}
              id="actors"
              {...register('actors', {
                required: 'Please enter names of actors',
                validate: (value) => {
                  const actorsArr = value
                    .split(',')
                    .map((name) => name.trim())
                    .filter((name) => name !== '');
                  return (
                    actorsArr.length > 0 || 'Please enter at least one actor'
                  );
                },
              })}
            />

            {errors.actors && (
              <span className={styles.errorMessage}>
                {errors.actors.message}
              </span>
            )}
          </div>

          {error && typeof error === 'string' && (
            <p className={styles.error}>{error}</p>
          )}

          <button
            type="submit"
            className={`${styles.button} ${loading ? styles.isLoading : ''}`}
          >
            {loading ? <Loader /> : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
}

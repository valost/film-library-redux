import magnifyingGlass from '../../../public/img/icons/magnifying-glass.svg';
import styles from './Searchbar.module.scss';
import { useForm } from 'react-hook-form';

type Props = {
  onSearch: (query: string) => void;
};

type FormValues = {
  query: string;
};

export function Searchbar({ onSearch }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    const trimmed = data.query.trim();

    if (trimmed) {
      onSearch(trimmed);
      reset();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.searchbar}>
        <img src={magnifyingGlass} alt="Magnifying glass" />

        <input
          className={styles.input}
          type="text"
          placeholder="Type here..."
          {...register('query', {
            required: 'Query is required',
            minLength: {
              value: 2,
              message: 'Query is too short',
            },
          })}
        />
      </div>

      <button type="submit" className={styles.button}>
        Find
      </button>

      {errors.query && (
        <span className={styles.errorMessage}>{errors.query.message}</span>
      )}
    </form>
  );
}

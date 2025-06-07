import magnifyingGlass from '../../../public/img/icons/magnifying-glass.svg';
import styles from './Searchbar.module.scss';

export function Searchbar() {
  return (
    <form className={styles.form}>
      <div className={styles.searchbar}>
        <img src={magnifyingGlass} alt="Magnifying glass" />

        <input
          className={styles.input}
          type="text"
          placeholder="Type here..."
        />
      </div>

      <button type="submit" className={styles.button}>
        Find
      </button>
    </form>
  );
}

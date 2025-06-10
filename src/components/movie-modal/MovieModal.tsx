import styles from './MovieModal.module.scss';
import PopcormImg from '../../../public/favIcon.png';
import type { Movie } from '../../utils/types';

type Props = {
  onClose: () => void;
  movie: Movie;
};

export function MovieModal({ onClose, movie }: Props) {
  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <p className={styles.text}>{`id: ${movie.id}`}</p>
        <img className={styles.image} src={PopcormImg} alt="Popcorn" />
        <h3 className={styles.title}>{movie.title}</h3>
        <p>{movie.year}</p>

        <p>Actors:</p>
        <ul>
          {movie.actors.map((actor) => (
            <li key={actor.id}>{actor.name}</li>
          ))}
        </ul>
      </div>

      <button onClick={() => onClose()} className={styles.button}>
        Close
      </button>
    </div>
  );
}

import { useState } from 'react';
import type { Actor } from '../../utils/types';
import styles from './Card.module.scss';
import arrowDown from '../../../public/img/icons/arrow-down.svg';
import arrowUp from '../../../public/img/icons/arrow-up.svg';

type Props = {
  id: number;
  title: string;
  year: number;
  format: string;
  actors: Actor[];
};

export function Card({ id, title, year, format, actors }: Props) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.wrapper}>
        <span className={styles.description}>Title:</span>
        <h3>{title}</h3>
      </div>

      <div className={styles.wrapper}>
        <span className={styles.description}>Year:</span>
        <p className={styles.text}>{year}</p>
      </div>

      {showDetails && (
        <div
          className={`${styles.container} ${showDetails ? styles.open : ''}`}
        >
          <div className={styles.wrapper}>
            <span className={styles.description}>Format:</span>
            <p className={styles.text}>{format}</p>
          </div>

          <div className={styles.wrapper}>
            <span className={styles.description}>Actors:</span>
            <ul className={styles.list}>
              {actors.map((actor) => (
                <li className={styles.listItem} key={actor.id}>
                  {actor.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <button
        className={styles.button}
        onClick={() => setShowDetails((prev) => !prev)}
      >
        <img src={showDetails ? arrowUp : arrowDown} alt="Arrow" />
      </button>
    </div>
  );
}

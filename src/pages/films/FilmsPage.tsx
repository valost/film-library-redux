import styles from './FilmsPage.module.scss';
import { useState } from 'react';
import { Card } from '../../components/card/Card';
import { movies } from '../../utils/movies';

export function FilmsPage() {
  // const { title, releaseYear, format, stars } = movies;

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5;

  const allCards = Math.ceil(movies.length / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = movies.slice(indexOfFirstCard, indexOfLastCard);
  
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2>My movies:</h2>

        <div className={styles.cardContainer}>
          {currentCards.map(({ title, releaseYear, format, stars }, index) => (
            <Card 
              key={index}
              title={title}
              year={releaseYear}
              format={format}
              actors={stars}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
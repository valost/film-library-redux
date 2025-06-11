import type { NewMovie } from './types';

export const parseMovieTextFile = (content: string): NewMovie[] => {
  const normalizedContent = content.replace(/\r\n/g, '\n').trim();

  const movieData = normalizedContent
    .split('\n\n')
    .filter((entry) => entry.trim());

  const movies: NewMovie[] = movieData.map((data) => {
    const lines = data
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line);

    const movie: Partial<NewMovie> = {};

    lines.forEach((line) => {
      const [key, value] = line.split(': ').map((word) => word.trim());

      switch (key.toLowerCase()) {
        case 'title':
          movie.title = value;
          break;
        case 'year':
          movie.year = parseInt(value);
          break;
        case 'format':
          if (['DVD', 'VHS', 'Blu-Ray'].includes(value)) {
            movie.format = value as 'DVD' | 'VHS' | 'Blu-Ray';
          }
          break;
        case 'actors':
          movie.actors = value.split(', ').map((actor) => actor.trim());
          break;
      }
    });

    if (!movie.title || !movie.year || !movie.format || !movie.actors) {
      throw new Error('Invalid movie details format');
    }

    return movie as NewMovie;
  });

  return movies;
};

export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};

// import list response

export type Movie = {
  id: number;
  title: string;
  year: number;
  format: 'VHS' | 'DVD' | 'Blu-Ray';
  createdAt: string;
  updatedAt: string;
};

export type MovieImportApiResponse = {
  data: Movie[];
  meta: {
    imported: number;
    total: number;
  };
  status: number;
};

// show movie details (with actors)

export type Actor = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type MovieWithActors = {
  id: number;
  title: string;
  year: number;
  format: 'VHS' | 'DVD' | 'Blu-Ray';
  actors: Actor[];
  createdAt: string;
  updatedAt: string;
};

export type MovieWithActorsApiResponse = {
  data: MovieWithActors;
  status: number;
};

// show all movies (without actors)

export type MovieListMeta = {
  total: number;
};

export type AllMoviesApiResponse = {
  data: Movie[];
  meta: MovieListMeta;
  status: number;
};

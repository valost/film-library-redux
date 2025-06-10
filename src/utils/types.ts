export type NewUser = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export type Format = 'DVD' | 'VHS' | 'Blu-Ray';

export type NewMovie = {
  title: string;
  year: number;
  format: Format;
  actors: string[];
};

export type Actor = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Movie = {
  id: number;
  title: string;
  year: number;
  format: string;
  actors: Actor[];
  createdAt: string;
  updatedAt: string;
};

export type MovieWithoutActors = {
  id: number;
  title: string;
  year: number;
  format: string;
  createdAt: string;
  updatedAt: string;
};

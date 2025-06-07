export type Actor = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type MovieData = {
  id: number;
  title: string;
  year: number;
  format: string;
  actors: Actor[];
  createdAt: string;
  updatedAt: string;
}

export type Movie = {
  data: MovieData;
  status: number;
}
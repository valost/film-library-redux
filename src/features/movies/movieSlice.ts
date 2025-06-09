import { createSlice } from '@reduxjs/toolkit';
import type { Movie } from '../../utils/types';
import {
  addMovie,
  deleteMovie,
  showAllMovies,
  showMovieById,
} from './movieActions';

type MovieState = {
  loading: boolean;
  success: boolean;
  error: string | null;
  addedMovie: Movie | null;
  allMovies: Movie[];
  selectedMovie: Movie | null;
  movieToDelete: Movie | null;
};

const initialState: MovieState = {
  loading: false,
  success: false,
  error: null,
  addedMovie: null,
  allMovies: [],
  selectedMovie: null,
  movieToDelete: null,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    resetMovieState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.addedMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // add movie
      .addCase(addMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addMovie.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.addedMovie = payload;
      })
      .addCase(addMovie.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? 'Failed to add movie';
      })
      // show all movies
      .addCase(showAllMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showAllMovies.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allMovies = payload;
      })
      .addCase(showAllMovies.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? 'Failed to load all movies';
      })
      // show movie by id
      .addCase(showMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showMovieById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.selectedMovie = payload;
      })
      .addCase(showMovieById.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? 'Failed to load movie';
      })
      // delete movie
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state, { meta }) => {
        state.loading = false;
        const deletedId = meta.arg;
        state.allMovies = state.allMovies.filter(
          (movie) => movie.id !== deletedId,
        );
      })
      .addCase(deleteMovie.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? 'Failed to load movie';
      });
  },
});

export const { resetMovieState } = movieSlice.actions;
export default movieSlice.reducer;

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Movie, MovieWithoutActors, NewMovie } from '../../utils/types';
import type { MovieImportApiResponse } from '../../utils/apiResponseTypes';
import { BASE_API_URL } from '../../utils/constants';

export const addMovie = createAsyncThunk<
  Movie,
  NewMovie,
  { rejectValue: string }
>(
  'movie/add',
  async ({ title, year, format, actors }: NewMovie, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${BASE_API_URL}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token || '',
        },
        body: JSON.stringify({
          title,
          year,
          format,
          actors,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          result.error || `Registration failed with status ${response.status}`,
        );
      }

      return result.data;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong!';
      return rejectWithValue(message);
    }
  },
);

export const showAllMovies = createAsyncThunk<
  MovieWithoutActors[],
  void,
  { rejectValue: string }
>('movie/showAll', async (_, thunkApi) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(
      `${BASE_API_URL}/movies?sort=title&order=ASC&limit=30`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token || '',
        },
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return thunkApi.rejectWithValue(
        result.error || `Registration failed with status ${response.status}`,
      );
    }

    return result.data;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong!';
    return thunkApi.rejectWithValue(message);
  }
});

export const showMovieById = createAsyncThunk<
  Movie,
  number,
  { rejectValue: string }
>('movie/showById', async (id, thunkApi) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_API_URL}/movies/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token || '',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return thunkApi.rejectWithValue(
        result.error || `Registration failed with status ${response.status}`,
      );
    }

    return result.data;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong!';
    return thunkApi.rejectWithValue(message);
  }
});

export const deleteMovie = createAsyncThunk<
  void,
  number,
  { rejectValue: string }
>('movie/delete', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_API_URL}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token || '',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return rejectWithValue(
        result.error || `Deletion failed with status ${response.status}`,
      );
    }

    return result.data;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong!';
    return rejectWithValue(message);
  }
});

export const importMovieList = createAsyncThunk<
  MovieImportApiResponse,
  FormData,
  { rejectValue: string }
>('movie/uploadList', async (formData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_API_URL}/movies/import`, {
      method: 'POST',
      headers: {
        Authorization: token || '',
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      return rejectWithValue(
        result.error || `Registration failed with status ${response.status}`,
      );
    }

    return result.data;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong!';
    return rejectWithValue(message);
  }
});

export const showMoviesByQuery = createAsyncThunk<
  MovieWithoutActors[],
  string,
  { rejectValue: string }
>('movie/showByQuery', async (query, thunkApi) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_API_URL}/movies?search=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token || '',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return thunkApi.rejectWithValue(
        result.error || `Registration failed with status ${response.status}`,
      );
    }

    return result.data;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong!';
    return thunkApi.rejectWithValue(message);
  }
});

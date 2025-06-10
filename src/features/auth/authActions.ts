import { createAsyncThunk } from '@reduxjs/toolkit';
import type { NewUser } from '../../utils/types';
import { jwtDecode } from 'jwt-decode';
import { BASE_API_URL } from '../../utils/constants';

export type JwtPayload = {
  id: number;
  name: string;
  email: string;
};

export const registerUser = createAsyncThunk<
  { token: string; user: JwtPayload },
  NewUser,
  { rejectValue: string }
>(
  'auth/register',
  async (
    { email, name, password, confirmPassword }: NewUser,
    { rejectWithValue },
  ) => {
    try {
      if (password !== confirmPassword) {
        return rejectWithValue('Passwords do not match');
      }

      const response = await fetch(`${BASE_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.error || `Registration failed with status ${response.status}`,
        );
      }

      const token = data.token;

      if (typeof token !== 'string' || !token) {
        return rejectWithValue('Invalid token received');
      }

      const user = jwtDecode<JwtPayload>(token);
      return { token, user };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong!';
      return rejectWithValue(message);
    }
  },
);

export const loginUser = createAsyncThunk<
  { token: string; user: JwtPayload },
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_API_URL}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(
        data.error || `Authorisation failed with status ${response.status}`,
      );
    }

    const token = data.token;

    if (typeof token !== 'string' || !token) {
      return rejectWithValue('Invalid token received');
    }

    const user = jwtDecode<JwtPayload>(token);
    return { token, user };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong!';
    return rejectWithValue(message);
  }
});

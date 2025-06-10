import { HashRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { Layout } from './pages/layout/Layout';
import { RegisterPage } from './pages/register/RegisterPage';
import { LoginPage } from './pages/login/LoginPage';
import { MoviesPage } from './pages/all-movies/MoviesPage';
import { AddMoviePage } from './pages/add-movie/AddMoviePage';
import { UploadMoviesPage } from './pages/upload-movies/UploadMoviesPage';

export function Routing() {
  return (
    <HashRouter basename="/movie-library/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="all-movies" element={<MoviesPage />} />
          <Route path="add-movie" element={<AddMoviePage />} />
          <Route path="add-file" element={<UploadMoviesPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

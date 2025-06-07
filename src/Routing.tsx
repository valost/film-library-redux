import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { Layout } from './pages/layout/Layout';
import { RegisterPage } from './pages/register/RegisterPage';
import { LoginPage } from './pages/login/LoginPage';
import { FilmsPage } from './pages/films/FilmsPage';

export function Routing() {
  return (
    <BrowserRouter basename="/movie-library">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="films" element={<FilmsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
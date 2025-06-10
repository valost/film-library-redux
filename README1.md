
# Film Library Redux

> Повноцінний React-додаток із Redux для роботи з бібліотекою фільмів.  
> Підтримується авторизація, рейтинг, пошук, взаємодія з API.  
> Готовий до деплою через Docker із підтримкою змінних оточення.

---

## 📦 Локальний запуск (development)

1. Встановити залежності:
    ```bash
    npm install
    ```

2. Запустити dev-сервер:
    ```bash
    npm run dev
    ```
    За замовчуванням — [http://localhost:5173](http://localhost:5173)

3. Для роботи з API створи файл `.env`:
    ```
    VITE_API_URL=http://localhost:8001/api/v1/
    ```
    (Або інший твій backend-ендпоінт)

---

## 🐳 Запуск у Docker (production)

### 1. Збірка Docker-образу:
```bash
docker build --no-cache -t valostrovska/movies .
```

### 2. Запуск контейнера:
```bash
docker run --name movie-lib -p 3000:3000 -e API_URL=http://localhost:8001/api/v1/ valostrovska/movies
```
- `API_URL` — посилання на твій бекенд
- За замовчуванням додаток доступний на [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Основні npm-скрипти

- `npm run dev` — дев-режим (локально)
- `npm run build` — продакшн-білд
- `npm run preview` — перегляд білда

---

## 📁 Структура проєкту

- `src/` — основний код (React, Redux)
- `public/` — favicon, dev-версія env.js
- `Dockerfile`, `entrypoint.sh` — для деплою

---

## 🔑 Змінні оточення

- У дев-режимі — через `.env` (`VITE_API_URL`)
- У Docker — через змінну оточення `API_URL`

У фронті використовується:
```js
window.environment.API_URL
```

---

## 📚 Автор

[github.com/valost](https://github.com/valost)

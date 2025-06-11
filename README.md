# Film Library Redux

---

## Локальний запуск

1. Встановити залежності:
  ```
  npm install
  ```

2. Запустити dev-сервер:
  ```
  npm run dev
  ```

3. Для робити з API створити файл .env :
  ```
  VITE_API_URL=http://localhost:8001/api/v1/
  ```

---

## Запуск у Docker

1. Docker-образ доступний за посиланням:

  [https://hub.docker.com/r/valostrovska/movies]

2. Збірка Docker-образу:
  ```
  docker build --no-cache -t valostrovska/movies .
  ```

3. Запуск контейнера: 
  ```
  docker run --name movie-lib -p 3000:3000 -e API_URL=http://localhost:8001/api/v1 valostrovska/movies
  ```

  - `API_URL` — посилання на бекенд
  - За замовчуванням додаток доступний на [http://localhost:3000]

---

## Структура проєкту

- `src/` — основний код (React, Redux)
- `public/` — favicon, dev-версія env.js
- `Dockerfile`, `entrypoint.sh` — для деплою

---

## Змінні оточення

- У дев-режимі через `.env` (`VITE_API_URL`)
- У Docker через змінну оточення `API_URL`

У фронті використовується:
```
window.environment.API_URL
```

---

## ! Note !

Імпорт .txt файлів виконаний через API `http://localhost:8000/api/v1/movies`. Користувач загружає файл через форму, додаток парсить данні файлу у формат JSON та відправляє на сервер. На данний момент додаток приймає лише файли в яких вірно вказані поля:
```
  title: string;
  year: number;
  format: 'DVD' | 'VHS' | 'Blu-ray';
  actors: string[];
```
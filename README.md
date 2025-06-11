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

Імпорт .txt файлів виконаний через API `http://localhost:8000/api/v1/movies`. Користувач загружає файл через форму, додаток парсить данні файлу у формат JSON та відправляє на сервер. Завантаження може зайняти деякий час, в залежності від розміру файлу. На данний момент додаток приймає лише файли в яких вірно вказані поля:

```
  title: string;
  year: number;
  format: 'DVD' | 'VHS' | 'Blu-ray';
  actors: string[];
```

Файли для перевірки:

[correct_format.txt](https://github.com/user-attachments/files/20689106/correct_format.txt)Title: Blazing Saddles
Year: 1974
Format: VHS
Actors: Mel Brooks, Clevon Little, Harvey Korman, Gene Wilder, Slim Pickens, Madeline Kahn


Title: Casablanca
Year: 1942
Format: DVD
Actors: Humphrey Bogart, Ingrid Bergman, Claude Rains, Peter Lorre


Title: Charade
Year: 1953
Format: DVD
Actors: Audrey Hepburn, Cary Grant, Walter Matthau, James Coburn, George Kennedy


Title: Cool Hand Luke
Year: 1967
Format: VHS
Actors: Paul Newman, George Kennedy, Strother Martin


Title: Butch Cassidy and the Sundance Kid
Year: 1969
Format: VHS
Actors: Paul Newman, Robert Redford, Katherine Ross


Title: The Sting
Year: 1973
Format: DVD
Actors: Robert Redford, Paul Newman, Robert Shaw, Charles Durning


Title: The Muppet Movie
Year: 1979
Format: DVD
Actors: Jim Henson, Frank Oz, Dave Geolz, Mel Brooks, James Coburn, Charles Durning, Austin Pendleton


Title: Get Shorty 
Year: 1995
Format: DVD
Actors: John Travolta, Danny DeVito, Renne Russo, Gene Hackman, Dennis Farina


Title: My Cousin Vinny
Year: 1992
Format: DVD
Actors: Joe Pesci, Marrisa Tomei, Fred Gwynne, Austin Pendleton, Lane Smith, Ralph Macchio


Title: Gladiator
Year: 2000
Format: Blu-Ray
Actors: Russell Crowe, Joaquin Phoenix, Connie Nielson


Title: Star Wars
Year: 1977
Format: Blu-Ray
Actors: Harrison Ford, Mark Hamill, Carrie Fisher, Alec Guinness, James Earl Jones


Title: Raiders of the Lost Ark
Year: 1981
Format: DVD
Actors: Harrison Ford, Karen Allen


Title: Serenity
Year: 2005
Format: Blu-Ray
Actors: Nathan Fillion, Alan Tudyk, Adam Baldwin, Ron Glass, Jewel Staite, Gina Torres, Morena Baccarin, Sean Maher, Summer Glau, Chiwetel Ejiofor


Title: Hooisers
Year: 1986
Format: VHS
Actors: Gene Hackman, Barbara Hershey, Dennis Hopper


Title: WarGames
Year: 1983
Format: VHS
Actors: Matthew Broderick, Ally Sheedy, Dabney Coleman, John Wood, Barry Corbin


Title: Spaceballs
Year: 1987
Format: DVD
Actors: Bill Pullman, John Candy, Mel Brooks, Rick Moranis, Daphne Zuniga, Joan Rivers


Title: Young Frankenstein
Year: 1974
Format: VHS
Actors: Gene Wilder, Kenneth Mars, Terri Garr, Gene Hackman, Peter Boyle


Title: Real Genius
Year: 1985
Format: VHS
Actors: Val Kilmer, Gabe Jarret, Michelle Meyrink, William Atherton


Title: Top Gun
Year: 1986
Format: DVD
Actors: Tom Cruise, Kelly McGillis, Val Kilmer, Anthony Edwards, Tom Skerritt


Title: MASH
Year: 1970 
Format: DVD
Actors: Donald Sutherland, Elliot Gould, Tom Skerritt, Sally Kellerman, Robert Duvall


Title: The Russians Are Coming, The Russians Are Coming
Year: 1966
Format: VHS
Actors: Carl Reiner, Eva Marie Saint, Alan Arkin, Brian Keith


Title: Jaws
Year: 1975 
Format: DVD
Actors: Roy Scheider, Robert Shaw, Richard Dreyfuss, Lorraine Gary 


Title: 2001: A Space Odyssey
Year: 1968
Format: DVD
Actors: Keir Dullea, Gary Lockwood, William Sylvester, Douglas Rain


Title: Harvey
Year: 1950 
Format: DVD
Actors: James Stewart, Josephine Hull, Peggy Dow, Charles Drake


Title: Knocked Up
Year: 2007
Format: Blu-Ray
Actors: Seth Rogen, Katherine Heigl, Paul Rudd, Leslie Mann


[wrong_format.txt](https://github.com/user-attachments/files/20689114/wrong_format.txt)Title: Blazing Saddles
Release Year: 1974
Format: VHS
Stars: Mel Brooks, Clevon Little, Harvey Korman, Gene Wilder, Slim Pickens, Madeline Kahn


Title: Casablanca
Release Year: 1942
Format: DVD
Stars: Humphrey Bogart, Ingrid Bergman, Claude Rains, Peter Lorre


Title: Charade
Release Year: 1953
Format: DVD
Stars: Audrey Hepburn, Cary Grant, Walter Matthau, James Coburn, George Kennedy


Title: Cool Hand Luke
Release Year: 1967
Format: VHS
Stars: Paul Newman, George Kennedy, Strother Martin


Title: Butch Cassidy and the Sundance Kid
Release Year: 1969
Format: VHS
Stars: Paul Newman, Robert Redford, Katherine Ross


Title: The Sting
Release Year: 1973
Format: DVD
Stars: Robert Redford, Paul Newman, Robert Shaw, Charles Durning


Title: The Muppet Movie
Release Year: 1979
Format: DVD
Stars: Jim Henson, Frank Oz, Dave Geolz, Mel Brooks, James Coburn, Charles Durning, Austin Pendleton


Title: Get Shorty 
Release Year: 1995
Format: DVD
Stars: John Travolta, Danny DeVito, Renne Russo, Gene Hackman, Dennis Farina


Title: My Cousin Vinny
Release Year: 1992
Format: DVD
Stars: Joe Pesci, Marrisa Tomei, Fred Gwynne, Austin Pendleton, Lane Smith, Ralph Macchio


Title: Gladiator
Release Year: 2000
Format: Blu-Ray
Stars: Russell Crowe, Joaquin Phoenix, Connie Nielson


Title: Star Wars
Release Year: 1977
Format: Blu-Ray
Stars: Harrison Ford, Mark Hamill, Carrie Fisher, Alec Guinness, James Earl Jones


Title: Raiders of the Lost Ark
Release Year: 1981
Format: DVD
Stars: Harrison Ford, Karen Allen


Title: Serenity
Release Year: 2005
Format: Blu-Ray
Stars: Nathan Fillion, Alan Tudyk, Adam Baldwin, Ron Glass, Jewel Staite, Gina Torres, Morena Baccarin, Sean Maher, Summer Glau, Chiwetel Ejiofor


Title: Hooisers
Release Year: 1986
Format: VHS
Stars: Gene Hackman, Barbara Hershey, Dennis Hopper


Title: WarGames
Release Year: 1983
Format: VHS
Stars: Matthew Broderick, Ally Sheedy, Dabney Coleman, John Wood, Barry Corbin


Title: Spaceballs
Release Year: 1987
Format: DVD
Stars: Bill Pullman, John Candy, Mel Brooks, Rick Moranis, Daphne Zuniga, Joan Rivers


Title: Young Frankenstein
Release Year: 1974
Format: VHS
Stars: Gene Wilder, Kenneth Mars, Terri Garr, Gene Hackman, Peter Boyle


Title: Real Genius
Release Year: 1985
Format: VHS
Stars: Val Kilmer, Gabe Jarret, Michelle Meyrink, William Atherton


Title: Top Gun
Release Year: 1986
Format: DVD
Stars: Tom Cruise, Kelly McGillis, Val Kilmer, Anthony Edwards, Tom Skerritt


Title: MASH
Release Year: 1970 
Format: DVD
Stars: Donald Sutherland, Elliot Gould, Tom Skerritt, Sally Kellerman, Robert Duvall


Title: The Russians Are Coming, The Russians Are Coming
Release Year: 1966
Format: VHS
Stars: Carl Reiner, Eva Marie Saint, Alan Arkin, Brian Keith


Title: Jaws
Release Year: 1975 
Format: DVD
Stars: Roy Scheider, Robert Shaw, Richard Dreyfuss, Lorraine Gary 


Title: 2001: A Space Odyssey
Release Year: 1968
Format: DVD
Stars: Keir Dullea, Gary Lockwood, William Sylvester, Douglas Rain


Title: Harvey
Release Year: 1950 
Format: DVD
Stars: James Stewart, Josephine Hull, Peggy Dow, Charles Drake


Title: Knocked Up
Release Year: 2007
Format: Blu-Ray
Stars: Seth Rogen, Katherine Heigl, Paul Rudd, Leslie Mann

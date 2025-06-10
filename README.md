docker build --no-cache -t valostrovska/movies .

docker run --name movie-lib -p 3000:3000 -e API_URL=http://localhost:8001/api/v1 valostrovska/movies

# docker pull postgres
# docker run --name [name] -d -p [port]:[port] -e POSTGRES_PASSWORD=[passwd] [image]
`docker run -it --name postgres -e POSTGRES_PASSWORD=postgres -d -p 2022:5432 postgres:latest`

# docker exec -it [id-container] psql -U postgres [name_db]
- \l 
<!-- de xam cac table trong postgres -->
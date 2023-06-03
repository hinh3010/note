# docker-compose.yml

- mysql
  
```sql
CREATE DATABASE IF NOT EXISTS xh_db;
```

``` js

version: "3.1" 
services:
    xh_db:
        image: mysql:5.7
        volumes:
            - ./mysql/init.sql:/docker-entrypoint-initdb.d/init.sql
        // đọc file init.sql  trong folder mysql và copy vào /docker-entrypoint-initdb.d/init.sql

        command: --init-file /docker-entrypoint-initdb.d/init.sql
        // lệnh chạy khởi tạo với những gì bên trong /docker-entrypoint-initdb.d/init.sql

        ports:
            - "3312:3306"
        environment:
            MYSQL_DATABASE: xh_db
            MYSQL_ROOT_USER: uxh
            MYSQL_USER: uxh
            MYSQL_ROOT_PASSWORD: hellocacbantre
            MYSQL_PASSWORD: hellocacbantre

```

* run 
`docker-compose up`

* docker ps
CONTAINER ID   IMAGE       COMMAND                  CREATED          STATUS          PORTS                               NAMES
0bc67bf1a9c5   mysql:8.0   "docker-entrypoint.s…"   35 minutes ago   Up 35 minutes   33060/tcp, 0.0.0.0:3312->3306/tcp   node_ts_docker-xh_db-1


# docker compose cach 2 buil docker file trước
```js
version: "3.2"
services:
    xh_db:
        image: postgres:12
        environment:
            POSTGRES_USER: hellocacbantre
            POSTGRES_PASSWORD: hellocacbantre
        volumes:
            - ./postgresql/init.sql:/docker-entrypoint-initdb.d/init.sql
            - db-data:/var/lib/postgresql/data

    node-app:
        image: adu   // tên image buld từ Dockerfile trước đó
        ports: -"8181:8080"
        depends_on:  // đợi cho xh_db chạy trước
            - xh_db

volumes:
    db-data:

```
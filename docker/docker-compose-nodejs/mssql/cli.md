# images
docker pull mcr.microsoft.com/mssql/server:2019-CU18-ubuntu-20.04 --name sqlserver

# compose
docker run \
-e "ACCEPT_EULA=Y" \
-e "MSSQL_SA_PASSWORD=Hellocacbantre@123" \
-p 1434:1433 \
--name sql-server \
-d mcr.microsoft.com/mssql/server:2019-CU18-ubuntu-20.04
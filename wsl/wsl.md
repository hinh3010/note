# sudo apt update && apt upgrade
# sudo apt remove [name]
- gỡ ứng dụng
- sudo apt autoremove
- gỡ bỏ package + rác của ứng dụng

# install 

# nvm 
- curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
- nvm install v16.18.0
- npm install -g yarn
- npm install -g typescript

# redis
- sudo apt install redis-server -y
- redis-server
- sudo service redis-server stop
- sudo service redis-server start

# apache
- sudo apt install apache2 -y
- sudo service apache2 start
- sudo service apache2 status
- sudo service apache2 stop

# mysql server
- sudo apt install mysql-server -y
- sudo service mysql start
- sudo service mysql status
- sudo service mysql stop
- config : sudo nano /etc/apache2/mods-enabled/dir.conf


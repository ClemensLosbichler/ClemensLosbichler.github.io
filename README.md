# ClemensLosbichler.github.io
## Setup
Copy all files from /conf to your /etc/nginx/sites-available
Change in all copied files the root directive to the repo location
```sh
root    /home/pi/ClemensLosbichler.github.io/public;
```

## Start
#### NGINX
```sh
sudo systemctl restart nginx
#### PHP Fast-CGI
```
For Linux
```sh
etc/php/7.2/fpm/php-cgi -b 127.0.0.1:9000
```
For Windows
```sh
c:\xampp\php\php-cgi.exe -b 127.0.0.1:9000
```

#### Node.js for tictactoe
```sh
node ../src/tictactoe-server.js
```
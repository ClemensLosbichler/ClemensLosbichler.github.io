# ClemensLosbichler.github.io
## Setup
Copy all files from /conf to your /etc/nginx/sites-available
Change in all copied files the root directive to the repo location
```sh
root    /home/pi/ClemensLosbichler.github.io/public;
```

## Start
For Linux
```sh
#/etc/php/7.2/fpm/php-cgi -b 127.0.0.1:9000
sudo systemctl start nginx
node ../src/tictactoe-server.js
```

For Windows
```sh
nginx.exe
c:\xampp\php\php-cgi.exe -b 127.0.0.1:9000
node ../src/tictactoe-server.js
```

## Logs
/var/logs/nginx/*.log
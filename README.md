# ClemensLosbichler.github.io
## Setup
In your nginx config add
```sh
include conf/website.conf;
```

## Start
#### PHP Fast-CGI
For Windows
```sh
etc/php/7.2/fpm/php-cgi -b 127.0.0.1:9000
```
For Linux
```sh
c:\xampp\php\php-cgi.exe -b 127.0.0.1:9000
```

#### Node.js for tictactoe
```sh
node ../src/tictactoe-server.js
```
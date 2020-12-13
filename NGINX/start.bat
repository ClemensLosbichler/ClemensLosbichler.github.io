@ECHO OFF
set PATH=C:\xampp\php;%PATH%
start c:\xampp\php\php-cgi.exe -b 127.0.0.1:9000
start nginx.exe
start node ../src/tictactoe-server.js
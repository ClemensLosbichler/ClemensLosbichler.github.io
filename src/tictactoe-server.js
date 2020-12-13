var TicTacToeGame = require('./tictactoe-game.js')
var io = require('socket.io').listen(5000);

var waitingRoom = null;

io.sockets.on('connection', function (socket) {
    socket.name = 'Player0';
    socket.on('config', config => {
        socket.name = config.name;
        socket.gameMode = config.gameMode;

        if (socket.gameMode == 'online')
            queueUp(socket);
    });

    socket.on('disconnect', function () {
        if (waitingRoom != null && waitingRoom.id == socket.id)
            waitingRoom = null;

        if (socket.game != undefined)
            queueUp(socket.game.playerLeft(socket));
    });
});

function queueUp(socket) {
    if (waitingRoom != null) {
        waitingRoom.game = new TicTacToeGame(waitingRoom, socket);
        socket.game = waitingRoom.game;
        waitingRoom = null;
    } else {
        waitingRoom = socket;
    }
}
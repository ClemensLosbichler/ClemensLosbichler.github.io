var TicTacToe = require('../public/js/tictactoe');

class TicTacToeGame {
    constructor(socket1, socket2) {
        this.socket1 = socket1;
        this.socket2 = socket2;
        this.tictactoe = new TicTacToe();
        this.proposeGameFirst();
    }

    proposeGameFirst() {
        this.socket2.emit('propose', {
            name: this.socket1.name
        });
        this.socket2.on('propose', data => {
            this.socket2.off('propose', function () {});
            if (data == 'accept')
                this.proposeGameSecond();
            else
                delete this;
        });
    }

    proposeGameSecond() {
        this.socket1.emit('propose', {
            name: this.socket2.name
        });
        this.socket1.on('propose', data => {
            this.socket1.off('propose', function () {});
            if (data == 'accept')
                this.createGame();
            else
                this.socket2.emit('propose', 'deny');
        });
    }

    playerLeft(socket) {
        if (socket.id == this.socket1.id) {
            this.deleteListeners(this.socket2);
            return this.socket2;
        } else {
            this.deleteListeners(this.socket1);
            return this.socket1;
        }
    }

    deleteListeners(socket) {
        socket.emit('left', '');
        socket.off('chat', function () {});
        socket.off('game', function () {});
        delete this;
    }

    createGame() {
        this.socket1.off('propose', function () {});
        this.socket2.off('propose', function () {});

        this.tictactoe.createFieldArray();
        this.socket1.emit('create', 'x');
        this.socket2.emit('create', 'o');

        this.socket1.on('chat', data => {
            this.socket2.emit('chat', data);
        });
        this.socket2.on('chat', data => {
            this.socket1.emit('chat', data);
        });

        this.socket1.on('game', data => {
            this.tictactoe.placeSymbol(data.x, data.y);
            this.socket2.emit('game', data);
        });
        this.socket2.on('game', data => {
            this.tictactoe.placeSymbol(data.x, data.y);
            this.socket1.emit('game', data);
        });
    }
}

module.exports = TicTacToeGame;
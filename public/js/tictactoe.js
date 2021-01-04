class TicTacToe {
    constructor() {
        this.currentPlayer = 'x';
        this.gamesWonByX = 0;
        this.gamesWonByO = 0;
        this.gamesPlayed = 0;
        this.createFieldArray();
    }

    createFieldArray() {
        this.field = [];
        for (let i = 0; i < 3; i++) {
            this.field[i] = [];
            for (let j = 0; j < 3; j++) {
                this.field[i][j] = {
                    node: null,
                    content: ''
                };
            }
        }
    }

    dCreateGameArea() {
        this.gameArea = $("#game-area");

        $('#current-symbol').html('currently: ' + this.currentPlayer);
        $("#winning-button").on('click', () => this.playAgain(this));

        this.svgCross = $('#svg-cross');
        this.svgCircle = $('#svg-circle');

        if (!this.gameArea.is(':empty'))
            this.gameArea.empty();

        for (let i = 0; i < this.field.length; i++) {
            let row = document.createElement("div");
            row.classList += "row gamerow";
            this.gameArea.append(row);

            for (let j = 0; j < this.field[i].length; j++) {
                let data = document.createElement("div");
                data.classList += "col gamecol";
                data.addEventListener('click', () => this.dPlaceSymbolAndAppend(i, j, true));
                row.append(data);

                this.field[i][j].node = data;
            }
        }
    }

    placeSymbol(field, i, j, currentPlayer) {
        if (i < 0 || i > 2 || j < 0 || j > 2)
            throw ("Indices out of bounce in placeSymbol(): " + i + "|" + j);

        if (field[i][j].content != '')
            return false;

        field[i][j].content = currentPlayer;
        return true;
    }

    alterSymbol(symbol) {
        if (symbol == 'o')
            return 'x';
        else
            return 'o';
    }

    dPlaceSymbolAndAppend(i, j, placedByHimself = false) {
        if (placedByHimself && this.lockedSymbol != undefined && this.currentPlayer == this.lockedSymbol)
            return;

        if(!this.placeSymbol(this.field, i, j, this.currentPlayer))
            return;
        if(this.currentPlayer == 'x')
            this.svgCross.clone(true).removeClass("d-none").appendTo(this.field[i][j].node);
        else
            this.svgCircle.clone(true).removeClass("d-none").appendTo(this.field[i][j].node);

        this.currentPlayer = this.alterSymbol(this.currentPlayer);
        $('#current-symbol').html('currently: ' + this.currentPlayer);

        this.onPlaceSymbolAndAppend(i, j);
        this.showMessageIfWon();

        if (this.getGameResult(this.field) == false && placedByHimself && this.playingAgainstAi) {
            let aiMove = this.getBestMove();
            this.dPlaceSymbolAndAppend(aiMove.x, aiMove.y);
        }
    }

    onPlaceSymbolAndAppend(i, j) {}

    getGameResult(field) {
        if (this.playerHasWon(field, 'o'))
            return 'o';
        if (this.playerHasWon(field, 'x'))
            return 'x';
        if (this.isTie(field))
            return true;
        return false;
    }

    showMessageIfWon() {
        switch (this.getGameResult(this.field)) {
            case 'o':
                this.gamesWonByO++;
                this.gamesPlayed++;
                this.dShowWinningScreen('Circles Won');
                break;
            case 'x':
                this.gamesWonByX++;
                this.gamesPlayed++;
                this.dShowWinningScreen('Crosses Won');
                break;
            case true:
                this.gamesPlayed++;
                this.dShowWinningScreen('Tie');
                break;
            case false:
                break;
        }
    }

    playerHasWon(field, player) {
        for (let i = 0; i < field.length; i++)
            if (this.playerOwnsRow(field, i, player))
                return true;

        for (let j = 0; j < field[0].length; j++)
            if (this.playerOwnsColumn(field, j, player))
                return true;

        if (this.playerOwnsDiagonal1(field, player) || this.playerOwnsDiagonal2(field, player))
            return true;

        return false;
    }

    playerOwnsRow(field, i, player) {
        for (let j = 0; j < field[i].length; j++)
            if (!this.playerOwnsField(field, i, j, player))
                return false;
        return true;
    }

    playerOwnsColumn(field, j, player) {
        for (let i = 0; i < field.length; i++)
            if (!this.playerOwnsField(field, i, j, player))
                return false;
        return true;
    }

    playerOwnsDiagonal1(field, player) {
        for (let i = 0, j = 0; i < field.length; i++, j++)
            if (!this.playerOwnsField(field, i, j, player))
                return false;
        return true;
    }

    playerOwnsDiagonal2(field, player) {
        for (let i = 0, j = 2; i < field.length; i++, j--)
            if (!this.playerOwnsField(field, i, j, player))
                return false;
        return true;
    }

    playerOwnsField(field, i, j, player) {
        return field[i][j].content == player;
    }

    isTie(field) {
        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                if (!this.playerOwnsField(field, i, j, 'x') && !this.playerOwnsField(field, i, j, 'o'))
                    return false;
            }
        }
        return true;
    }

    dShowWinningScreen(message) {
        $('#winning-message').html(message);
        $('#winning-screen').show('fast');
        $('#meta-game').show('slow');
    }

    dHideWinningScreen() {
        $('#winning-screen').hide('slow');
        $('#meta-game').hide('slow');
    }

    playAgain(tictactoe) {
        tictactoe.createFieldArray();
        tictactoe.dCreateGameArea();
        tictactoe.dHideWinningScreen();

        if (this.playingAgainstAi && this.gamesPlayed % 2 == 1) {
            this.currentPlayer = 'o';
            let move = this.getRandomMove();
            this.dPlaceSymbolAndAppend(move.x, move.y)
        }
    }

    lockSymbolPlacing(symbol) {
        this.lockedSymbol = symbol;
    }

    setAi(bool) {
        this.playingAgainstAi = bool;
    }

    cloneField(field) {
        let newField = [];
        for (let i = 0; i < field.length; i++) {
            newField[i] = [];

            for (let j = 0; j < field[i].length; j++) {
                newField[i][j] = {
                    content: field[i][j].content
                };
            }
        }
        return newField;
    }

    getRandomMove() {
        let field = this.cloneField(this.field);
        let move = {
            x: parseInt(Math.random() * 3),
            y: parseInt(Math.random() * 3)
        }
        if(!this.placeSymbol(field, move.x, move.y, this.currentPlayer))
            return this.getRandomMove();
        return move;
    }

    getBestMove() {
        let field = this.cloneField(this.field);
        let bestMovePlayer = this.currentPlayer;

        let bestScore = -Infinity;
        let bestMove = {
            x: -1,
            y: -1
        };

        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                if (!this.placeSymbol(field, i, j, this.currentPlayer))
                    continue;

                let score = this.minimax(field, bestMovePlayer, this.alterSymbol(this.currentPlayer), 0);
                field[i][j].content = '';

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = {
                        x: i,
                        y: j
                    };
                }
            }
        }

        return bestMove;
    }

    minimax(field, bestMovePlayer, currentPlayer, depth) {
        switch (this.getGameResult(field)) {
            case bestMovePlayer:
                return 100 - depth;
            case this.alterSymbol(bestMovePlayer):
                return -100;
            case true:
                return 0;
        }

        if (currentPlayer == bestMovePlayer) {
            let bestScore = -Infinity;
            for (let i = 0; i < field.length; i++) {
                for (let j = 0; j < field[i].length; j++) {
                    if (!this.placeSymbol(field, i, j, currentPlayer))
                        continue;

                    bestScore = Math.max(bestScore, this.minimax(field, bestMovePlayer, this.alterSymbol(currentPlayer), depth+1));
                    field[i][j].content = '';
                }
            }
            return bestScore;
        } else {
            let worstScore = Infinity;
            for (let i = 0; i < field.length; i++) {
                for (let j = 0; j < field[i].length; j++) {
                    if (!this.placeSymbol(field, i, j, currentPlayer))
                        continue;

                    worstScore = Math.min(worstScore, this.minimax(field, bestMovePlayer, this.alterSymbol(currentPlayer), depth+1));
                    field[i][j].content = '';
                }
            }
            return worstScore;
        }
    }

    getBoardFillState(field) {
        let fullTiles = 0;
        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                if(field[i][j] != '')
                    fullTiles++;
            }
        }
        return fullTiles;
    }
}

try {
    module.exports = TicTacToe;
} catch (e) {}
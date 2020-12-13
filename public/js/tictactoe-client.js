let chatOutput = $('#chat-output');
let chatInput = $('#chat-input');

let playerName = 'Player00';
let gameMode = null;
let socket;
let tictactoe = new TicTacToe();

$('#name-submit').on('click', submitName);
$('#name-input').on('keypress', e => {
    if (e.which == 13) submitName();
});

function startOfflineHumanGame() {
    tictactoe.dCreateGameArea();
    tictactoe.lockSymbolPlacing('');
    tictactoe.setAi(false);
    appendChatMessage({
        information: 'Hello ' + playerName + ', you are playing against human.',
        sender: 'Mr. Jänk'
    });
}

function startOfflineAIGame() {
    tictactoe.dCreateGameArea();
    tictactoe.lockSymbolPlacing('o');
    tictactoe.setAi(true);
    appendChatMessage({
        information: 'Hello ' + playerName + ', you are playing against ai.',
        sender: 'Mr. Jänk'
    });
}

function startOnlineGame(symbol) {
    $('#gamemode-status').html('Online');
    tictactoe.dCreateGameArea();
    tictactoe.lockSymbolPlacing(symbol);
    tictactoe.setAi(false);
    tictactoe.onPlaceSymbolAndAppend = function (i, j) {
        socket.emit('game', {
            x: i,
            y: j
        });
    };
    appendChatMessage('Game setup. Crosses begins!');
}

function showProposal(name) {
    $('#playing-proposal').html(name + " wants to play with you");
    $('#playing-proposal-div').show();
    $('#meta-game').show('slow');

    $('#playing-proposal-accept').prop('onclick', null).off('click');
    $('#playing-proposal-deny').prop('onclick', null).off('click');

    $('#playing-proposal-accept').on('click', e => {
        $('#playing-proposal-div').hide();
        $('#meta-game').hide('slow');
        socket.emit('propose', 'accept');
    });

    $('#playing-proposal-deny').on('click', e => {
        $('#playing-proposal-div').hide();
        $('#meta-game').hide('slow');
        socket.emit('propose', 'deny');
    });
}

function connect() {
    socket = io.connect();

    $('#connection-status').html('Disconnected');

    socket.on('connect', function () {
        $('#connection-status').html('Connected');
        socket.emit('config', {
            name: playerName,
            gameMode: gameMode
        });

        chatInput.on('keypress', function (e) {
            if (e.which == 13) {
                sendAndAppendMessage(chatInput.val());
                chatInput.val('');
            }
        });
    });

    socket.on('disconnect', function () {
        $('#connection-status').html('Disconnected');
        startOfflineAIGame();
    });

    if (gameMode == 'offline-ai') {
        $('#gammode-status').html('Local against AI');
        startOfflineAIGame();
        return;
    } else if (gameMode == 'offline-human') {
        $('#gammode-status').html('Local against Human');
        startOfflineHumanGame();
        return;
    } else if (gameMode == 'online') {
        $('#gammode-status').html('Waiting for Opponnent');
        startOfflineAIGame();
    }

    socket.on('chat', function (data) {
        appendChatMessage(data);
    });

    socket.on('propose', function (data) {
        if (data == 'deny') {
            appendChatMessage({
                information: 'The opponent denied.',
                sender: 'server'
            })
        } else {
            showProposal(data.name);
        }
    });

    socket.on('create', function (data) {
        $('#gamemode-status').html('Online');
        startOnlineGame(data);
    });

    socket.on('player-left', function (data) {
        startLocalGame();
    });

    socket.on('game', function (data) {
        tictactoe.placeSymbolAndAppend(data.x, data.y);
    });
}

function submitName() {
    let name = $('#name-input').val();

    if (name == "") {
        $('#name-input').addClass('is-invalid');
        return;
    }

    $('#meta-game').hide('slow');
    $('#name-input-div').hide('slow');

    playerName = name;
    gameMode = $("input[name='game-mode']:checked").val();
    connect();
}

function appendChatMessage(message) {
    let messageDiv = document.createElement("div");
    let timestamp = document.createElement("span", Date.now);
    let paragraph = document.createElement("p");

    timestamp.setAttribute("class", "chat-timestamp");
    messageDiv.className += "chat-message ";
    messageDiv.append(timestamp);
    messageDiv.append(paragraph);

    if (message.sender == undefined) {
        messageDiv.className += "chat-server ";
        paragraph.innerHTML = "<strong>Server: </strong>" + message;
    } else if (message.sender == "me") {
        messageDiv.className += "chat-my-message ";
        paragraph.innerHTML = "" + message.information;
    } else {
        messageDiv.className += "chat-opponent ";
        paragraph.innerHTML = "<strong>" + message.sender + ": </strong>" + message.information;
    }

    chatOutput.append(messageDiv);
    chatOutput.scrollTop(chatOutput[0].scrollHeight);
}

function sendAndAppendMessage(message) {
    let information = message;
    socket.emit('chat', information);
    appendChatMessage({
        information: information,
        sender: "me"
    });
}
<!doctype html>
<html lang="en">

<head>
  <?php include("meta.php"); ?>

  <link rel="stylesheet" href="/css/tictactoe.css">

  <title>TicTacToe</title>
</head>

<body>
  <?php include("header.php"); ?>

  <div class="container-fuid fill text-center" id="meta-game">
    <div id="name-input-div">
      <div style="font-size: 5vh;margin-bottom:20px">Input your name</div>
      <input placeholder="name" class="form-control d-inline" id="name-input">
      <input type="button" value="play" class="form-control d-inline" style="width: 5vw;" id="name-submit">
      <div id="game-mode-choice">
        <input type="radio" name="game-mode" value="online" id="game-mode-online" disabled="disabled">
        <label for="game-mode-online" class="text-danger">Online</label> <!-- class="not-available"-->

        <input type="radio" name="game-mode" value="offline-human" id="game-mode-ai">
        <label for="game-mode-ai">Offline against Human</label>

        <input type="radio" name="game-mode" value="offline-ai" id="game-mode-local" checked>
        <label for="game-mode-local">Offline against AI</label>
      </div>
    </div>
    <div id="playing-proposal-div" style="display: none">
      <div id="playing-proposal" style="font-size: 5vh"></div>
      <input type="button" value="deny" class="form-control d-inline btn-danger" style="width: 5vw;"
        id="playing-proposal-deny">
      <input type="button" value="accept" class="form-control d-inline btn-success" style="width: 5vw;"
        id="playing-proposal-accept">
    </div>
    <div id="winning-screen" style="display: none">
      <div class="text-center" id="winning-message"></div>
      <div class="text-center d-block">
        <button type="button" class="btn btn-light" id="winning-button">Play Again</button>
      </div>
    </div>
  </div>

  <div class="container-fuid fill">
    <div class="row h-100">
      <div class="col-12">
        <div class="h-100" id="game-area"></div>
      </div>
      <!--<div class="col-3 bg-light" id="chat">
        <div id="gammode-status">Waiting</div>
        <div id="connection-status">Disconnected</div>
        <div id="chat-output"></div>
        <div class="form-light">
          <input type="text" class="form-control" id="chat-input" width="auto">
        </div>
      </div>-->
      <div id="current-symbol"></div>
    </div>
  </div>

  <svg viewBox="0 0 100 100" class="symbol d-none" id="svg-circle">
    <circle cx="50" cy="50" r="45" fill="none" stroke="black" stroke-width="5" />
  </svg>

  <svg viewBox="0 0 100 100" class="symbol d-none" id="svg-cross">
    <line x1="0" y1="0" x2="100" y2="100" stroke="black" stroke-width="5" />
    <line x1="100" y1="0" x2="0" y2="100" stroke="black" stroke-width="5" />
  </svg>

  <?php include("footer.php"); ?>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.dev.js"></script>
  <script src="/js/tictactoe.js"></script>
  <script src="/js/tictactoe-client.js"></script>
</body>

</html>
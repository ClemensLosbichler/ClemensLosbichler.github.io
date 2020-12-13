<!doctype html>
<html lang="en">

<head>
  <?php include("meta.php"); ?>

  <link rel="stylesheet" href="/css/message.css">
  <link rel="stylesheet" href="https://use.typekit.net/scc0qnt.css">

  <title>Message</title>
</head>

<body>
  <?php include("header.php"); ?>


  <div class="container-fluid fill text-center" id="message-block">
    <div class="row h-100">
      <div class="col h-100 p-0">
        <span id="message"></span>
      </div>
    </div>
  </div>

  <div class="container-fluid fill">
    <div class="row h-100">
      <div class="col h-100 p-0">
        <form action="" method="" enctype="multipart/form-data" class="h-100" id="form">
          <div class="row">
            <textarea id="input" class="form-input"></textarea>
          </div>
          <div class="row">
            <div class="m-auto pt-4 text-center">
              <select class="form-input" id="type">
                <option value="clean" class="clean" selected>Clean</option>
                <option value="magic" cass="magic">Magic</option>
                <option value="chantal" class="chantal">Chantal</option>
              </select> 
              <input type="button" value="Anzeigen" id="submit" class="form-input">
              <span>CTRL-Enter</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <?php include("footer.php"); ?>
  <script src="/js/message.js"></script>
</body>

</html>
<!doctype html>
<html lang="en">

<head>
  <?php include("meta.php"); ?>

  <title>Ideas</title>
</head>

<body>
  <?php include("header.php"); ?>

  <div class="container-fuid fill">
    <div class="row h-100">
      <div class="col-12">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" id="ideas-tab" data-toggle="tab" href="#ideas" role="tab" aria-controls="ideas" aria-selected="true">Ideas</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="error-tab" data-toggle="tab" href="#error" role="tab" aria-controls="error" aria-selected="false">error.log</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="access-tab" data-toggle="tab" href="#access" role="tab" aria-controls="access" aria-selected="false">access.log</a>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane fade show active" id="ideas" role="tabpanel" aria-labelledby="ideas-tab">
            <?php echo readfile('/files/ideas.txt'); ?>
          </div>
          <div class="tab-pane fade show active" id="ideas" role="tabpanel" aria-labelledby="error-tab">
            <?php echo readfile('/files/ideas.txt'); ?>
          </div>
          <div class="tab-pane fade show active" id="ideas" role="tabpanel" aria-labelledby="access-tab">
            <?php echo readfile('/files/ideas.txt'); ?>
          </div>
        </div>
      </div>
    </div>
  </div>

  <?php include("footer.php"); ?>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.dev.js"></script>
</body>

</html>
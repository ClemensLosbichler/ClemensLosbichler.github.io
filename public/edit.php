<!doctype html>
<html lang="en">

<head>
  <?php include("meta.php"); ?>

  <link rel="stylesheet" href="/css/file-editor.css">

  <title>Ideas</title>
</head>

<body>
  <?php include("header.php"); ?>

  <?php 
    function fileEditor($path) {
      echo "<textarea id='file-editor-$path' class='file-editor'>";
      echo readFile($path);
      echo "</textarea>";
    }
  ?>

  <div class="container-fuid fill w-100">
    <div class="row h-100 mx-auto w-75 mt-5 mb-5">
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
        <div class="tab-content h-100">
          <div class="tab-pane fade show active" id="ideas" role="tabpanel" aria-labelledby="ideas-tab">
            <?php echo fileEditor('files/ideas.txt'); ?>
          </div>
          <div class="tab-pane fade show" id="error" role="tabpanel" aria-labelledby="error-tab">
            <?php echo fileEditor('../logs/error.log'); ?>
          </div>
          <div class="tab-pane fade show" id="access" role="tabpanel" aria-labelledby="access-tab">
            <?php echo fileEditor('../logs/access.log'); ?>
          </div>
        </div>
      </div>
    </div>
  </div>

  <?php include("footer.php"); ?>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.dev.js"></script>
</body>

</html>
<!doctype html>
<html lang="en">
  <head>
    <?php include("meta.php"); ?>

    <link rel="stylesheet" href="/css/filebrowser.css">
    <link rel="stylesheet" href="/css/upload.css">
    
    <title>Homepage</title>
  </head>
  <body>
    <?php include("header.php"); ?>

    <div class="container-fuid">
      <div class="row-md-12">
        <div class="col text-center p-0">
          <h1>NGINX Server</h1>
          <input placeholder="Search for file" class="form-control" id="search"/>
          <div id="upload">
            <?php include("upload.php"); ?>
          </div>
          <div id="filebrowser">
            <?php include("files.php"); ?>
          </div>
        </div>
      </div>
    </div>

    <?php include("footer.php"); ?>
    <script src="js/swirl.js"></script>
    <script src="js/search.js"></script>
    <script src="js/upload.js"></script>
  </body>
</html>
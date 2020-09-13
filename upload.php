<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <link rel="stylesheet" href="upload.css">
    <link rel="stylesheet" href="style.css">

    <script src="https://kit.fontawesome.com/3ac108b6ba.js" crossorigin="anonymous"></script>

    <title>Homepage - Upload</title>
  </head>
  <body>
    <?php include "./header.html" ?> 
  
    <div class="container-fluid fill">
      <div class="row h-100">
        <div class="col h-100 p-0">
          <form action="" method="POST" enctype="multipart/form-data" class="h-100">
            <div class="preview-zone hidden">
              <div class="box box-solid">
                <div class="box-body"></div>
              </div>
            </div>
            <div class="dropzone-wrapper">
              <div class="dropzone-desc">
                <i class="fas fa-upload"></i>
                <p>Choose an image file or drag it here.</p>
              </div>
              <input type="file" name="img_logo" class="dropzone">
              <canvas id="swirl"></canvas>
            </div>
          </form>
        </div>
      </div>
    </div>

    <?php include "./footer.html" ?>
    <script src="swirl.js"></script>
  </body>
</html>
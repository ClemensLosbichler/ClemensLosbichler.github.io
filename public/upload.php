<?php
  if (isset($_FILES['file'])) {
    move_uploaded_file($_FILES['file']['tmp_name'], "files/" . $_FILES['file']['name']);
    exit;
  }
?>

<form action="" method="POST" enctype="multipart/form-data" class="h-100">
  <div class="preview-zone hidden">
    <div class="box box-solid">
      <div class="box-body"></div>
    </div>
  </div>
  <div class="dropzone-wrapper not-available">
    <div class="dropzone-desc">
      <i class="fas fa-upload"></i>
      <p>Choose an image file or drag it here.</p>
    </div>
    <input type="file" name="img_logo" class="dropzone" disabled>
    <canvas id="swirl"></canvas>
  </div>
</form>

<div class="contextmenu">
  <ul class="menu-options">
    <li class="menu-option" id="open">Open</li>
    <li class="menu-option" id="open-blank">Open in new Window</li>
    <li class="menu-option" id="copy-link">Copy Link</li>
    <li class="menu-option" id="download">Download</li>
  </ul>
</div>
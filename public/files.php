<?php
    $file_dependencies = [
        "php" => "php.svg",
        "html" => "html.svg",
        "js" => "js.svg",
        "css" => "css.svg",
        "svg" => "img.svg",
        "png" => "img.svg",
        "jpg" => "img.svg",
        "jpeg" => "img.svg",
        "ico" => "img.svg",
    ];

    echoDirectory('./');

    function echoDirectory($path) {
        if ($handle = opendir($path)) {
            while (false !== ($entry = readdir($handle))) {
                if ($entry != "." && $entry != "..") {
                    if(is_dir($entry))
                        echoDirectory($entry);
                    else 
                        echoFile($entry, $path);
                }
            }
        
            closedir($handle);
        }
    }

    function echoFile($file, $path) {
        $path != './' ? $link = $path . '/' . $file : $link = $file;
        $img = 'img/file.svg';
        $tmp = explode(".", $file);
        $extension = end($tmp);

        if($extension) {
            foreach($GLOBALS['file_dependencies'] as $key => $value) {
                if($extension == $key) {
                    $img = 'img/' . $value;
                    break;
                }
            }
        }

        if($path == 'files')
            $img = 'img/uploaded-file.svg';

        echo '<a href="' . $link . '" class="file">';
            echo '<ul>';
                echo '<li><img src="' . $img .'"></li>';
                echo '<li><h4 class="filename" data-path="' . $path . '">' . $file . '</h4></li>';
            echo '</ul>';
        echo '</a>';
    }
?>
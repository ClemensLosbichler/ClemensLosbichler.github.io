function readFile(input) {
  var fd = new FormData();
  var xhr = new XMLHttpRequest();

  xhr.open("POST", "/", true);
  fd.append('file', input.files[0]);
  xhr.send(fd);
  window.location.reload(true);
}
  
function reset(e) {
  e.wrap('<form>').closest('form').get(0).reset();
  e.unwrap();
}

$(".dropzone").on('change', function() {
  readFile(this);
});

$('.dropzone-wrapper').on('dragover', function(e) {
  e.preventDefault();
  e.stopPropagation();
  $(this).addClass('dragover');
});

$('.dropzone-wrapper').on('dragleave', function(e) {
  e.preventDefault();
  e.stopPropagation();
  $(this).removeClass('dragover');
});

$('.remove-preview').on('click', function() {
  var boxZone = $(this).parents('.preview-zone').find('.box-body');
  var previewZone = $(this).parents('.preview-zone');
  var dropzone = $(this).parents('.form-group').find('.dropzone');
  boxZone.empty();
  previewZone.addClass('hidden');
  reset(dropzone);
});

const menu = $(".contextmenu");
let menuVisible = false;

const toggleMenu = command => {
  if(command === "show") {
    menu.css("display", "block");
    menuVisible = true;
  } else {
    menu.css("display", "none");
    menuVisible = false;
  }
};

const setPosition = ({ top, left }) => {
  menu.css({left: left, top: top});
  toggleMenu("show");
};

window.addEventListener("click", e => {
  if(menuVisible) {
    toggleMenu("hide");
    disableClickEvents();
  }
});

window.addEventListener('contextmenu', e => {
  e.preventDefault();
});

$(".file").contextmenu(e => {
  e.preventDefault();
  const origin = {
    left: e.pageX,
    top: e.pageY
  };
  setPosition(origin);
  disableClickEvents();

  let file = e.target.childNodes[0].nodeValue;
  let path = e.target.dataset.path;
  let uri = window.location.href + path + '/' + file;
  
  $('#open').on('click', element => {
    window.open(uri, "_self");
  });

  $('#open-blank').on('click', element => {
    window.open(uri, "_blank");
  });

  $('#copy-link').on('click', element => {
    navigator.clipboard.writeText(uri);
  });

  $('#download').on('click', element => {
    var link = document.createElement("a");
    link.download = file;
    link.href = uri;
    link.click();
  });

  return false;
});

function disableClickEvents() {
  $('#download').on('click', null).off("click");
  $('#copy-link').on('click', null).off("click");
  $('#open-blank').on('click', null).off("click");
  $('#open').on('click', null).off("click");
}
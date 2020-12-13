var starNum = 1000;
var speed = 2;

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

var canvas = document.getElementById("swirl");
var ctx = canvas.getContext('2d');

canvas.width = $(".dropzone-wrapper").width();
canvas.height = $(".dropzone-wrapper").height();

$("#swirl").fadeOut(0);

$(".dropzone-wrapper").on("dragover", function() {
    $("#swirl").fadeIn(600);
});

$(".dropzone-wrapper").on("dragleave", function() {
    $("#swirl").fadeOut(600);
});

$(".dropzone-wrapper").on("drop", function() {
  $("#swirl").fadeOut(600);
});

var particles = [];
for(var x = 0; x < starNum; x++) {
    let px = Math.sin(x*0.1) * 1.2 * canvas.width/2 + canvas.width/2;
    let py = Math.cos(x*0.1) * 1.2 * canvas.height/2 + canvas.height/2;
    let randpx = Math.sin(x*0.1) * 1.2 * canvas.width/2 * Math.random() + canvas.width/2;
    let randpy = Math.cos(x*0.1) * 1.2 * canvas.height/2 * Math.random() + canvas.height/2;
    particles.push(new particle(px, py, randpx, randpy));
}

function particle(x, y, randx, randy) {
  this.x = randx;
  this.y = randy;

  this.x0 = x;
  this.y0 = y;

  this.vx = 0;
  this.vy = 0;
    
  this.color = "rgb(0, 0, 0, 0.8)";
}

function draw() {
  requestAnimFrame(draw);

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for(t = 0; t < particles.length; t++) {
    var p = particles[t];
    var dist = Math.sqrt(Math.pow(canvas.width/2 - p.x, 2) + Math.pow(canvas.height/2 - p.y, 2));
    var size = dist/150;

    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, size, Math.PI * 2, false);
    ctx.fill();

    p.x += (canvas.width/2 - p.x) * speed * 0.01;
    p.y += (canvas.height/2 - p.y) * speed * 0.01;

    if(dist < 30 * Math.random() + 10) {
        p.x = p.x0;
        p.y = p.y0;
    }
  }
}

draw();


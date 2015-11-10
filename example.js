var Canvas = require('./');
var now = require('performance-now');

var n = 20;
var a = 40;
var t = 2;
var pi = Math.PI;
var pi2 = pi/2;
var sin = Math.sin;
var cos = Math.cos;

var c;
var flush;

var canvas = new Canvas();
c = canvas.getContext('2d');

if (typeof document !== 'undefined') {
  document.body.appendChild(canvas);
  flush = function() {};
}
else {
  flush = function() {
    console.log(c.toString());
  };
}

function draw() {
  var w = canvas.width / 2;
  var start = now();
  // c.fillRect(-100, -100, 5000, 5000);
  // var end = now();
  // console.log(end - start);

  c.clearRect(0, 0, canvas.width, canvas.height);
  c.save();
  c.translate(w, w);
  for(var i = 1; i < n; i++) {
    var r = i*(w/n);
    c.beginPath();
    c.moveTo(-r, 0);
    var tt = start*pi/1000/t;
    var p = (sin(tt-pi*(cos(pi*i/n)+1)/2)+1)*pi2;
    for(var j = 0; j < a; j++) {
      var ca = pi*j/(a-i);
      if(p > ca) {
        c.lineTo(-cos(ca)*r, -sin(ca)*r);
      } else {
        c.lineTo(-cos(p)*r, -sin(p)*r);
      }
    }
    c.stroke();
  }
  c.restore();

  c.strokeRect(0,0,canvas.width, canvas.height);
  c.fillText('☼', canvas.width - 20, 20, 20);

  flush();
}

setInterval(draw, 1000/30);

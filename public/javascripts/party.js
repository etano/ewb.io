var cycle_u = 0.0;
var cycle_i = 0;
var cycle_j = 1;
function cycle(elements, colors) {
  if (cycle_u > 1.0) {
    cycle_u = 0.0;
    cycle_i = (cycle_i+1) % colors.length;
    cycle_j = (cycle_j+1) % colors.length;
  }
  var steps = 60;
  var du = 1.0/steps;
  var start = colors[cycle_i];
  var end = colors[cycle_j];
  var r = parseInt((1-cycle_u)*start.r + cycle_u*end.r);
  var g = parseInt((1-cycle_u)*start.g + cycle_u*end.g);
  var b = parseInt((1-cycle_u)*start.b + cycle_u*end.b);
  var colorname = 'rgb('+r+','+g+','+b+')';
  for(var i=0; i<elements.length; i++) {
    elements[i].style.setProperty('color', colorname);
  }
  cycle_u += du;
}

function party(e) {
  var links = document.getElementsByTagName("a");
  cycle(links, [{r: 248, g: 117, b: 114}, {r: 20, g: 126, b: 204}, {r: 253, g: 255, b: 25}]);
  setTimeout(function() {
    cycle(links, [{r: 51, g: 51, b: 51}, {r: 51, g: 51, b: 51}, {r: 51, g: 51, b: 51}]);
  }, 50);
}

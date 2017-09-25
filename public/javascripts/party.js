function squeeze(x, max_x, max_val) {
  return Math.round((x/max_x)*max_val);
}

function party_links(x, y) {
  var links = document.getElementsByTagName("a");
  var g = squeeze(x, document.body.scrollWidth, 255);
  var b = squeeze(x, document.body.scrollHeight, 255);
  for(var i=0; i<links.length; i++) {
    links[i].style.color = 'rgb(0,'+g+','+b+')';
  }
}

function party(e) {
  party_links(e.pageX, e.pageY);
}

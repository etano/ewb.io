$(function(){
  var fit = function(x,max){
    return Math.round((x/max)*255);
  };
  $(document).mousemove(function(e){
    var x = fit(e.pageX,$(document).width());
    var y = fit(e.pageY,$(document).height());
    currentColors = {
      x: x,
      y: y
    };
    updateColors();
  });
});

function updateColors() {
  var x = currentColors.x;
  var y = currentColors.y;
  $('h2 a').css({color: '#aaa'});
  $('.module:hover h2 a, h2 a:hover').css({color: '#555'});
  $('.lifestream a, .name:hover').css({color: 'rgb(228,'+x+','+y+')'});
  $('p a:link, p a:visited, p a:hover, p a:active, .via a').css({color: 'rgb(0,'+x+','+y+')'});
};

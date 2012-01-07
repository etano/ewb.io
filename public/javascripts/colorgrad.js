$(function(){
  var fit = function(x,max){
    return Math.round((x/max)*255);
  };
  $(document).mousemove(function(e){
    var x = fit(e.pageX,$(document).width());
    var y = fit(e.pageY,$(document).height());
    $('h2 a').css({color: '#ccc'});
    $('p a:link, p a:visited, p a:hover, p a:active, #lifestream li span a').css({color: 'rgb(0,'+x+','+y+')'});
    $('.module:hover h2 a, h2 a:hover, .date, .name:hover').css({color: 'rgb(256,'+x+','+y+')'});
  });
});


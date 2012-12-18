$(function(){
  var spt = $('span.mailme');
  var at = / foo /;
  var dot = / bar /g;
  var addr = $(spt).text().replace(at,"@").replace(dot,".");
  $(spt).before('<a href="mailto:'+addr+'" title="Email me or something">Email me</a> ')
  .hover(function(){window.status="Click this link or something.";}, function(){window.status="";});
  $(spt).remove();
});

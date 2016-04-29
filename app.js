// var _ = require('underscore');

function getClass() {
  var classes = ['bg-success', 'bg-info', 'bg-warning', 'bg-danger'];
  var cl = _.sample(classes);

  return cl === getClass.last ? getClass() : getClass.last = cl;
}
getClass.last = null;

$(document).ready(function(){
  var $body = $('body');
  $body.html('');
  $('<div class="jumbotron"><h1>Twittler<small>  a place for twits</small></h1>\
     <img src="twit.jpg"></div>').appendTo($body);
  $('<div class="table-responsive"><table class="table"><tbody id="tweets"></tbody><table></div').appendTo($body);
  var $tweets = $('#tweets');

  var index = streams.home.length - 1;

  while(index >= 0){
    var tweet = streams.home[index];

    var $tweet = $('<tr class =' + getClass() + '></tr>');
    $tweet.html('<td>@' + tweet.user + ': </td><td>' + tweet.message + '</td>');
    $tweet.appendTo($tweets);
    index -= 1;
  }

});

// var _ = require('underscore');

function randomColor() {
  var classes = ['bg-success', 'bg-info', 'bg-warning', 'bg-danger'];
  var cl = _.sample(classes);

  return cl === randomColor.last ? randomColor() : randomColor.last = cl;
}
randomColor.last = null;

function showTweet(tweet) {
  var $tweets = $('#tweets');
  var $tweet = $('<tr class =' + randomColor() + '></tr>');
  var time = tweet.created_at;
  var timeFromNow = moment(tweet.created_at).fromNow();
  $tweet.html('<td>@' + tweet.user + ': <span>\
    <small class="time text-muted" time="' + time + '">' + timeFromNow + '</small></span></td>\
    <td>' + tweet.message + '</td>');
  $tweet.appendTo($tweets);
}

function initTweets(num) {
  var recent = _.last(streams.home, num);
  _.each(recent, showTweet);
}

function moreTweets() {
  $('#tweets').empty();
  initTweets(12);
}

function updateTime() {
  $('.time').each(function(i) {
    var time = $(this).attr('time');
    var timeFromNow = moment(time).fromNow();
    $(this).text(timeFromNow);
  });


}

function initPage(){

  function appendElements() {
    _.each(arguments, function($el) { $el.appendTo($body); });
  }

  var $body = $('body').html('');
  var $header = $('<div class="container"><div class="page-header col-sm-8"><h1>Twittler\
    <small>  a place for twits</small></h1></div><div class="container col-sm-4">\
    <img src="twit.jpg"></div></div>');
  var $tweetContainer = $('<div class="container"><div class="table-responsive"><table class="table">\
    <tbody id="tweets"></tbody><table></div></div>');
  // $('<div class="container"><button type="button" class="btn btn-default btn-lg" id="more">\
  //    Get More</button><div class="form-group col-sm-8"><form><label class="control-label col-sm-1" for="tweet">Make Tweet:</label>\
  //    <div class="col-sm-6"><input type="tweet" class="form-control" id="tweet" placeholder="Twit">\
  //    </form></div></div></div><br>').appendTo($body);


  appendElements($header, $tweetContainer);

  initTweets(12);

  $('#more').on('click', moreTweets);
}

$(document).ready(initPage);

setInterval(updateTime, 60000);

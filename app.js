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
  var user = tweet.user;
  var timeFromNow = moment(tweet.created_at).fromNow();
  $tweet.html('<td><a class="user" data-user="' + user + '" data-toggle="modal" data-target="#myModal">@' + user + ':</a> <span>\
    <small class="time text-muted" time="' + time + '">' + timeFromNow + '</small></span></td>\
    <td>' + tweet.message + '</td>');
  $tweet.appendTo($tweets);
}

function initTweets(num) {
  var recent = _.last(streams.home, num).reverse();
  _.each(recent, showTweet);
  $('.user').click(displayTimeline);
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

function login() {
  visitor = $('#login').val().toLowerCase();
  $('.new-tweet').show();
  $('.login').hide();
}

function newTweet() {
  var $newTweet = $('#new-tweet');
  var message = $newTweet.val();
  $newTweet.val('');
  writeTweet(message);
}

function displayTimeline(e) {
  var user = $(e.target).data('user');
  var stream = streams.users[user];
  var $label = $('#timeline-label');
  var $modalBody = $('.modal-body');
  var currentDay, dayId, $table;
  $modalBody.empty();
  $label.text('@' + user + '\'s timeline:');

  _.each(stream, function(tweet) {
    var day = moment(tweet.created_at).format('dddd, MMMM Do');
    var $message = $('<tr class="' + randomColor() + '"><td>' + tweet.message + '</td></tr>');
    if (day !== currentDay) {
      dayId = day.replace(/\s|\,/g, '');
      $table = $('<div class="table-responsive"><h4>' + day + '</h4><table class="table">\
        <tbody id="timeline-' + dayId + '"></tbody></table></div>');
      $table.appendTo($modalBody);
      currentDay = day;
    }
    $message.appendTo($table);
  });
}

function initPage(){

  function appendElements() {
    _.each(arguments, function($el) { $el.appendTo($body); });
  }

  var $body = $('body');
  var $header = $('<div class="container jumbotron"><div class="page-header col-sm-8"><h1>Twittler\
    <small>  a place for twits</small></h1></div><div class="container col-sm-4">\
    <img class="img-responsive" src="twit.jpg"></div></div>');
  var $tweetContainer = $('<div class="container" id="tweet-container"><div class="table-responsive"><table class="table table-hover">\
    <tbody id="tweets"></tbody><table></div></div>');
  var $features = $('<br><div class="container"><form class="form-inline"><div class="form-group">\
    <input class="btn btn-default" id="more" type="button" value="Load More"></div>\
    <div class="form-group"><input type="text" class="form-control login" id="login" placeholder="Enter your name"></div>\
    <div class="form-group"><input type="text" class="form-control new-tweet" id="new-tweet" placeholder="Whats happening?"></div>\
    <input type="button" class="btn btn-default login" id="login-button" value="Log In">\
    <input type="button" class="btn btn-default new-tweet" id="new-tweet-button" value="Tweet">\
    </form></div><br>');

  appendElements($header, $features, $tweetContainer);

  var visitor;

  $('.new-tweet').hide();

  initTweets(12);

  $('#more').click(moreTweets);
  $('#login-button').click(login);
  $('#new-tweet-button').click(newTweet);
}

$(document).ready(initPage);

setInterval(updateTime, 60000);

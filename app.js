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

var moreTweets = function (event) {
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

function login() {}

function newTweet() {}

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
  var $features = $('<br><div class="container"><form class="form-inline"><div class="form-group">\
    <input class="btn btn-default" id="more" type="button" value="Load More"></div>\
    <div class="form-group"><input type="text" class="form-control login" placeholder="Enter your name"></div>\
    <div class="form-group"><input type="text" class="form-control new-tweet" placeholder="Whats happening?"></div>\
    <button type="submit" class="btn btn-default login" id="login-button">Log In</button>\
    <button type="submit" class="btn btn-default new-tweet" id="new-tweet-button">Tweet</button>\
    </form></div><br>');

  appendElements($header, $features, $tweetContainer);

  var loggedIn = false;
  $('.new-tweet').hide();

  initTweets(12);

  $('#more').click(moreTweets);
  $('login-button').click(login);
  $('new-tweet-button').click(newTweet);
}

$(document).ready(initPage);

setInterval(updateTime, 60000);

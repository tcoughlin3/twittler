function randomColor() {
  const classes = ['bg-success', 'bg-info', 'bg-warning', 'bg-danger'];
  let cl = _.sample(classes);

  return cl === randomColor.last ? randomColor() : randomColor.last = cl;
}
randomColor.last = null;

function showTweet(tweet) {
  const $tweets = $('#tweets');
  let $tweet = $(`<tr class =${randomColor()}></tr>`);
  let time = tweet.created_at;
  let user = tweet.user;
  let message = tweet.message;
  let timeFromNow = moment(tweet.created_at).fromNow();
  $tweet.html(`
    <td>
      <a class="user" data-user=${user} data-toggle="modal" data-target="#myModal">
        @${user}:
      </a>
      <span>
        <small class="time text-muted" time="${time}">
          ${timeFromNow}
        </small>
      </span>
    </td>
    <td>
      ${message}
    </td>
  `);
  $tweet.appendTo($tweets);
}

function initTweets(num) {
  let recent = _.last(streams.home, num).reverse();
  _.each(recent, showTweet);
  $('.user').click(displayTimeline);
}

function moreTweets() {
  $('#tweets').empty();
  initTweets(12);
}

function updateTime() {
  $('.time').each(function(i) {
    let time = $(this).attr('time');
    let timeFromNow = moment(time).fromNow();
    $(this).text(timeFromNow);
  });
}

function login() {
  window.visitor = $('#login').val().toLowerCase();
  $('.new-tweet').show();
  $('.login').hide();
}

function newTweet() {
  const $newTweet = $('#new-tweet');
  let message = $newTweet.val();
  $newTweet.val('');
  writeTweet(message);
}

function displayTimeline(e) {
  let user = $(e.target).data('user');
  let stream = streams.users[user];
  const $label = $('#timeline-label');
  const $modalBody = $('.modal-body');
  let currentDay, dayId, $table;
  $modalBody.empty();
  $label.text('@' + user + '\'s timeline:');

  _.each(stream, function(tweet) {
    let day = moment(tweet.created_at).format('dddd, MMMM Do');
    let time = moment(tweet.created_at).format('h:mm a');
    let message = tweet.message;
    let $message = $(`
      <tr>
        <td>
          ${message}
          <small class="text-muted">
            ${time}
          </small>
        </td>
      </tr>
    `);
    if (day !== currentDay) {
      dayId = day.replace(/\s|\,/g, '');
      $table = $(`
        <div class="table-responsive">
          <h4>
            ${day}
          </h4>
          <table class="table">
            <tbody id="timeline-${dayId}">
            </tbody>
          </table>
        </div>
      `);
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

  const $body = $(`body`);
  const $header = $(`
    <div class="container jumbotron">
      <div class="page-header col-sm-8">
        <h1>Twittler<small>  a place for twits</small></h1>
      </div>
      <div class="container col-sm-4">
        <img class="img-responsive" src="twit.jpg">
      </div>
    </div>
  `);
  const $tweetContainer = $(`
    <div class="container" id="tweet-container">
      <div class="table-responsive">
        <table class="table table-hover">
          <tbody id="tweets"></tbody>
        </table>
      </div>
    </div>
  `);
  const $features = $(`
    <br>
    <div class="container">
      <form class="form-inline">
        <div class="form-group">
          <input class="btn btn-default" id="more" type="button" value="Load More">
        </div>
        <div class="form-group login">
          <input type="text" class="form-control login" id="login" placeholder="Enter your name">
        </div>
        <div class="form-group new-tweet"><input type="text" class="form-control new-tweet" id="new-tweet" placeholder="Whats happening?">
        </div>
        <input type="button" class="btn btn-default login" id="login-button" value="Log In">
        <input type="button" class="btn btn-default new-tweet" id="new-tweet-button" value="Tweet">
      </form>
    </div>
    <br>
  `);

  appendElements($header, $features, $tweetContainer);

  $('.new-tweet').hide();

  initTweets(12);

  $('#more').click(moreTweets);
  $('#login-button').click(login);
  $('#new-tweet-button').click(newTweet);
}

$(document).ready(initPage);

setInterval(updateTime, 60000);

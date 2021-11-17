/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = ({ user, content, created_at }) => {
  //destructuring for easy variable naming
  const { name, handle, avatars } = user;
  const { text } = content;

  // Using Timeago JQuery library to convert UNIX epoch into timeago see: $.timeago(created_at)

  return $(`<article class="tweet">
  <div class="container">
    <header>
      <div>
        <img src="${avatars}">
        <p class="name">${name}</p>
      </div>
      <div>
        <p class="handle">${handle}</p>
      </div>
    </header>
    <div class="content">
      <p>
       ${text}
      </p>
    </div>
    <footer>
      <div><p>${$.timeago(created_at)}</p></div>
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fas fa-retweet"></i><i class="fas fa-heart"></i>
      </div>
    </footer>
  </div>
</article>`);
};

//renders the tweets to index.html in the #tweets-container id

const renderTweets = (tweets) => {
  tweets.forEach((tweet) => {
    const $tweet = createTweetElement(tweet);
    $("#tweets-container").append($tweet);
  });
};

//Loads tweets from /tweets using AJAX

const loadTweets = () => {
  $.ajax(" /tweets", { method: "GET" }).then(function (tweets) {
    renderTweets(tweets);
  });
};

const newTweetHandler = () => {
  $("#post-tweet").submit(function (event) {
    event.preventDefault();

    $.ajax({
      url: "/tweets/",
      type: "POST",
      data: jQuery(this).serialize(),
    })
      .done(function () {
        // Handle Success
        console.log("success");
      })
      .fail(function (xhr, status, error) {
        console.log(error, "status:", status);
      });
  });
};

$(document).ready(function () {
  //loads and renders all  the tweets in the db to index.html
  loadTweets();

  newTweetHandler(); //initilizes the new tweet form behaviour
});

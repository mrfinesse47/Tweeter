/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//to prevent cross site scripting attacks
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
    <p>${escape(text)}</p>
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
  $("#tweets-container").html("");
  const newestToOldest = tweets.sort((a, b) => b.created_at - a.created_at); //sorts tweets newest to oldest
  newestToOldest.forEach((tweet) => {
    const $tweet = createTweetElement(tweet);
    $("#tweets-container").append($tweet);
  });
};

//Loads tweets from /tweets using AJAX

const loadTweets = (callback) => {
  $.ajax(" /tweets", { method: "GET" }).then(function (tweets) {
    callback(tweets);
  });
};

//function to check if the tweetText is valid

const isValidTextInput = (tweetText) => {
  if (tweetText.length === 0) {
    errorHandler(true, "You must input some text in order to tweet!");
    return false;
  }

  if (tweetText.length >= 140) {
    errorHandler(
      true,
      "characters of tweet length exceeds allowed limit! Please use less than 140 characters."
    );
    return false;
  }
  return true;
};

const errorHandler = (isError, message) => {
  if (isError) {
    $("#error-message").slideDown();
    $("#error-message p").text(message);
  } else {
    $("#error-message").slideUp();
  }
};

//renders the UI

const render = () => {
  $("#tweet-text").val("");
  $(".counter").val(0);
  loadTweets(renderTweets);
  errorHandler(false);
};

//initilizes the  JQuery Event listener for form submission

const newTweetHandler = () => {
  $("#post-tweet").submit(function (event) {
    event.preventDefault();

    const textArea = $(this).find("#tweet-text");
    const tweetText = textArea.val();

    if (isValidTextInput(tweetText)) {
      //if the input text is valid perform the  AJAX  request

      $.ajax({
        url: "/tweets/",
        type: "POST",
        data: jQuery(this).serialize(),
      })
        .done(function () {
          // Handle Success
          render(this); //re render tweets
        })
        .fail(function (xhr, status, error) {
          console.log(error, "status:", status);
        });
    }
  });
};

//prevents the user from pressing enter on the text area which messes up the count length
//and makes the text disappear

$(document).ready(function () {
  //hide the error message on page load
  $("#error-message").hide();

  $("#tweet-text").keypress(function (event) {
    if (event.keyCode === 10 || event.keyCode === 13) {
      event.preventDefault();
    }
  });

  //loads and renders all  the tweets in the db to index.html
  //render tweets is passed in as a callback

  newTweetHandler(); //initilizes the new tweet form behaviour

  render(); //renders the tweets from db
});

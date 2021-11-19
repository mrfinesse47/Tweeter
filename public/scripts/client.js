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
  $("#tweets-container").empty();
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

//controls the error message box, if isError is true it will display with message
// if it is false it will remove the error message box

const errorHandler = (isError, message) => {
  if (isError) {
    $("#error-message").slideDown("slow");
    $("#error-message p").text(`⚠️  ${message}   ⚠️`);
  } else {
    $("#error-message").slideUp("slow");
  }
};

//used to re-render the UI after the user  submits a tweet
//or renders the tweets on page load

const render = () => {
  $("#tweet-text").val("");
  $(".counter").val(140);
  $(".new-tweet").slideUp();
  loadTweets(renderTweets);
  $("html, body").animate({ scrollTop: 0 }, 1200);
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
          render(); //re render tweets
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

  //hide the new tweet input box on page load
  $(".new-tweet").hide();

  //hides the double arrow up icon that  appears when user is scrolled half way down the page

  $("#scroll-up").hide();

  //this shows or hides the new tweet textarea based on the  "write a new tweer button"

  $("#show-new-tweet").click(function () {
    const $newTweet = $(".new-tweet");
    if ($newTweet.is(":visible")) {
      $newTweet.slideUp();
    } else {
      $newTweet.slideDown();
    }
  });

  //prevent the user from using the enter key in the text area

  $("#tweet-text").keydown(function (event) {
    if (event.keyCode === 10 || event.keyCode === 13) {
      event.preventDefault();
    }
  });

  //this makes the scroll up button appear once  the  user is half way down the page

  $(window).scroll(function () {
    const scrollBarPos = $(this).scrollTop();
    if (scrollBarPos > 200) {
      $("#scroll-up").fadeIn(1000);
      $("#navigation").slideUp("slow");
    } else {
      $("#scroll-up").fadeOut(1000);
      $("#navigation").slideDown("slow");
    }
  });

  $("#scroll-up").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1200);
  });

  newTweetHandler(); //new-tweet form submission set up
  render(); //renders the tweets from db and resets counter and input text
});

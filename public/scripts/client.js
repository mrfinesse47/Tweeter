/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  //creates the tweet element in JQuery html form

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

  $("#post-tweet").submit(function (event) {
    alert("Handler for .submit() called.");
    event.preventDefault();
  });

  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  };

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)

  $("#tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});

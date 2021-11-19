//Will ensure that the document loads before JQuery functions are called.
$(document).ready(function () {
  //On the keyup event
  $("#tweet-text").keyup(function () {
    //works better with key up so I can count after the character is in
    let charCount = this.value.length;
    //using DOM traversal to find the counter
    const counter = $(this).parentsUntil(".new-tweet").find(".counter");
    if (charCount > 140) {
      const charLeft = 140 - charCount;
      counter.addClass("over-limit");
      counter.text(charLeft);
    } else {
      counter.text(140 - charCount);
      counter.removeClass("over-limit");
    }
  });
});

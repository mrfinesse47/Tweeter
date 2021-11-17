//Name:   Character count Javascript file
//Written By: Rohit Dhand
// Written on: 15th Nov, 2021
// Purpose: This script actualy.....
// Change Log:
// 1. Changed by : Alex Date: 19th Nov.2021
//What was changed:

//Will ensure that the document loads before JQuery functions are called.
$(document).ready(function () {
  // --- our code goes here ---
  //On the key change event where we are capturing the total number of characters left and changing the color to red if they go less than 0
  $("#tweet-text").keydown(function () {
    let charCount = this.value.length;
    const counter = $(this).parentsUntil(".new-tweet").find(".counter");
    if (charCount > 140) {
      const charLeft = 140 - charCount;
      counter.addClass("over-limit");
      counter.text(charLeft);
    } else {
      counter.text(charCount);
      counter.removeClass("over-limit");
    }
  });
  //On the key change event function finishes.
});

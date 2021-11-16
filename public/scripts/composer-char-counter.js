$(document).ready(function () {
  // --- our code goes here ---
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
});

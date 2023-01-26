// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var now = dayjs(); // Get current date from day.js
  var currentHour = now.get("hour"); // Get current hour
  var timeBlocks = $(".time-block");
  var savedTimeBlockEvents = JSON.parse(
    // Check whether timeBlockEvent is saved in the local storage
    localStorage.getItem("timeBlockEvents") ?? "{}"
  );
  var today = dayjs().format("dddd, MMMM D"); // Show current date in the header of the page
  $("#currentDay").text(today);

  timeBlocks.each(function () {
    var timeBlockId = $(this).attr("id");
    var timeBlockHour = parseInt(timeBlockId.replace(/^\D+/g, ""));

    // Check whether each time-block equals to the current hour and
    // assign correspondent classes
    if (timeBlockHour === currentHour) {
      $(this).addClass("present");
    } else if (timeBlockHour < currentHour) {
      $(this).addClass("past");
    } else {
      $(this).addClass("future");
    }

    $(this)
      .find("button")
      .click(function () {
        var hourEvent = textArea.val();
        console.log(hourEvent);
        var timeBlockEvents = Object.assign(savedTimeBlockEvents, {
          [timeBlockHour]: hourEvent,
        });

        localStorage.setItem(
          "timeBlockEvents",
          JSON.stringify(timeBlockEvents)
        );

        $("#saved").show();
      });
});

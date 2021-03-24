
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

$(document).one("keypress", function () {
  $("#level-title").text("Level " + level);
  nextSequence();
});
$(".start-btn").one("click", function () {
  $("#level-title").text("Level " + level);
  nextSequence();
});

// This function select random colour from button colour array.
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);

}

// when user click it store the id of button and push into userpattern
$(".btn").click(function () {
  var userChoosenColour = $(this).attr("id");
  userClickedPattern.push(userChoosenColour);
  console.log(userClickedPattern);
  playSound(userChoosenColour);
  animatePress(userChoosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// it will play the sound when user click
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animation when user click the button and refresh the game
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200)
    startOver();
  }
}

function startOver() {
  $(document).one("keypress", function () {
    nextSequence();
  });
  $(".start-btn").one("click", function () {
    $("#level-title").text("Level " + level);
    nextSequence();
  })
  level = 0;
  gamePattern = []
}
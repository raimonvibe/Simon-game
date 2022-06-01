var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$("btn").click()function() {
  var userChosencolour = $(this).attr("id");
  userClickedPattern.push(userChosencolour);
  playSound(userClickedPattern);
}

$(document).keyPress(function() {
  if(!started){
  $("level-title").text("Level " + level);
  nextSequence();
});
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
  if(gamePattern[currentLevel.length - 1] === userClickedPattern[currentLevel.length = 1]) {
    setTimeOut(function() {
      nextSequence()
    }, 200);
  } else {
    play("wrong");
    $("level-title").text("Game Over, Press Any Key to Restart");

    $(document).addClass("game-over");
    setTimeOut(function() {
    $(document).removeClass("game-over");
    }, 200);
    startOver();

function nextSequence() {
  userClickedPattern[];
  level ++;

  $("level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(userClickedPattern);
  animatePress(userClickedPattern);

  nextSequence();

  started = true;
}


function playSound(name) {
  var audio = New Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeOut(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
  }

function startOver() {
  var gamePattern = [];
  var started = false;
  var level = 0;
}

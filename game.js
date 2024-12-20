var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//2. Create a new variable called level and start at level 0.
var level = 0;

// Voeg een score variabele toe bovenaan
var highScore = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  } else {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    setTimeout(function() {
      checkAnswer(userClickedPattern.length-1);
    }, 100);
  }
});



//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        // Update high score if current level is higher
        if (level > highScore) {
          highScore = level;
          $("#high-score").text("High Score: " + highScore);
        }

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      console.log("wrong");

      //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
      playSound("wrong");

      $("body").addClass("game-over");
      // Update game over message with high score in English
      $("#level-title").text("Game Over! High Score: " + highScore + " - Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 800);

      //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.

      startOver();
}
}


function nextSequence() {

  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Pas de animatiesnelheid aan op basis van het level
  var animationSpeed = Math.max(50, 100 - (level * 2));

  $("#" + randomChosenColour).fadeIn(animationSpeed).fadeOut(animationSpeed).fadeIn(animationSpeed);

  // Wait for animation to complete before playing sound
  setTimeout(function() {
    playSound(randomChosenColour);
  }, animationSpeed * 3);
}

//2. Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {

  //3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.onerror = function() {
    console.error("Error loading sound: " + name);
  };
  audio.play().catch(function(error) {
    console.error("Error playing sound: " + error);
  });
}

//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {

  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//1. Create a new function called startOver().
function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}

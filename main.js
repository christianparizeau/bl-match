$(document).ready(init);
var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 7;
var games_played = 0;
var attempts = null;
const CARDS = [
  "buttStallion",
  "jack",
  "tina",
  "badonkL",
  "badonkR",
  "zero",
  "zero",
  "zero",
  "psycho",
  "psycho",
  "maya",
  "maya",
  "flak",
  "flak",
  "lillith",
  "lillith",
  "roland",
  "roland"
];
var zeroHaiku = [""];
var zerosFound = 0;
var damselsSafe = false;
function init() {
  $(".gameboard").on("click", ".card-back", handleCardClick);
  var cards = [...CARDS];
  randomizeCardLocations(cards);
}

function randomizeCardLocations(cardArray) {
  //cardArray is an array of strings that correspond to css classes that have background images
  var gameboard = $(".gameboard");
  for (var i = 0; i < 3; i++) {
    //For each row
    var currentRow = $("<div>").addClass("row"); //Create a div with class row
    for (var cardIndex = 0; cardIndex < 6; cardIndex++) {
      //Loop 6 times
      let currentCard = $("<div>").addClass("card-container"); //Create a div with class contanier
      let cardBack = $("<div>").addClass("card-back"); //Create a div with class card back
      currentCard.append(cardBack); //Append card back div to container div
      let randomIndex = Math.floor(Math.random() * cardArray.length); //find a random index in an array of cardArray param. Shrinks along with the length of the array during the next step
      let randomClass = cardArray.splice(randomIndex, 1); //return the array @ random index and delete it from the array
      let cardFront = $("<div>").addClass(randomClass); // make a div with class that is added from the array
      currentCard.append(cardFront); //append the card front to the container div
      currentRow.append(currentCard); //append the container div to the row
    }
    gameboard.append(currentRow); //at the end of each row, append it to the gameboard
  }
}
function handleCardClick(event) {
  var card = $(this);
  if (!firstCardClicked) {
    firstCardClicked = $(card);
    firstCardClicked.toggleClass("shrink");
    if (firstCardClicked[0].nextSibling.className === "tina") {
      damselsSafe = true;
      resetCards();
      setTimeout(function() {
        $(".tina").addClass("quiet");
      }, 700);
      $(".damselstatus .statstext")
        .removeClass("notsafe")
        .addClass("safe");
      //add a dom element that tells them damsels are now safe to match
    } else if (firstCardClicked[0].nextSibling.className === "zero") {
      var thisZero = firstCardClicked;
      resetCards();
      setTimeout(function() {
        $(thisZero[0].nextSibling).addClass("quiet");
      }, 700);
    }
    return;
  } else if (secondCardClicked) {
    return;
  } else {
    attempts++;
    secondCardClicked = $(card);
    secondCardClicked.toggleClass("shrink");
    var firstClass = firstCardClicked[0].nextSibling.className;
    var secondClass = secondCardClicked[0].nextSibling.className;
    switch (secondClass) {
      case "jack":
        if (firstClass === "buttStallion") {
          matches++;
          winCondition();
          setTimeout(function() {
            $(firstCardClicked[0].nextSibling).addClass("quiet");
            $(secondCardClicked[0].nextSibling).addClass("quiet");
            resetCards();
          }, 700);
        }
        break;
      case "buttStallion":
        if (firstClass === "jack") {
          matches++;
          winCondition();
          setTimeout(function() {
            $(firstCardClicked[0].nextSibling).addClass("quiet");
            $(secondCardClicked[0].nextSibling).addClass("quiet");
            resetCards();
          }, 700);
        }
      case "psycho":
        matches++;
        if (firstClass === "psycho" && matches !== max_matches) {
          matches--;
          loseCondition();
        } else if (firstClass === "psycho" && matches === max_matches) {
          winCondition();
        } else {
          matches--;
          setTimeout(function() {
            firstCardClicked.toggleClass("shrink");
            secondCardClicked.toggleClass("shrink");
            resetCards();
          }, 1500);
        }
        break;
      case "zero":
        setTimeout(function() {
          $(secondCardClicked[0].nextSibling).addClass("quiet");
          firstCardClicked.toggleClass("shrink");
          resetCards();
        }, 700);
        break;
      case "badonkL":
        if (firstClass === "badonkR") {
          if (!damselsSafe) {
            loseCondition();
          } else {
            matches++;
            winCondition();
            setTimeout(function() {
              $(firstCardClicked[0].nextSibling).addClass("quiet");
              $(secondCardClicked[0].nextSibling).addClass("quiet");
              resetCards();
            }, 700);
          }
          break;
        } else {
          setTimeout(function() {
            firstCardClicked.toggleClass("shrink");
            secondCardClicked.toggleClass("shrink");
            resetCards();
          }, 1500);
        }
      case "badonkR":
        if (firstClass === "badonkL") {
          if (!damselsSafe) {
            loseCondition();
          } else {
            matches++;
            winCondition();
            setTimeout(function() {
              $(firstCardClicked[0].nextSibling).addClass("quiet");
              $(secondCardClicked[0].nextSibling).addClass("quiet");
              resetCards();
            }, 700);
          }
        } else {
          setTimeout(function() {
            firstCardClicked.toggleClass("shrink");
            secondCardClicked.toggleClass("shrink");
            resetCards();
          }, 1500);
        }
        break;
      case "tina":
        damselsSafe = true;
        //add a dom element that tells them damsels are now safe to match
        setTimeout(function() {
          $(secondCardClicked[0].nextSibling).addClass("quiet");
          firstCardClicked.toggleClass("shrink");
          resetCards();
        }, 700);
        break;
      default:
        if (firstClass === secondClass) {
          matches++;
          winCondition();
          setTimeout(function() {
            $(firstCardClicked[0].nextSibling).addClass("quiet");
            $(secondCardClicked[0].nextSibling).addClass("quiet");
            resetCards();
          }, 700);
        } else {
          setTimeout(function() {
            firstCardClicked.toggleClass("shrink");
            secondCardClicked.toggleClass("shrink");
            resetCards();
          }, 1500);
        }
    }

    displayStats();
  }
}
// if (
//   firstCardClicked[0].nextSibling.className ===
//   secondCardClicked[0].nextSibling.className
// ) {
//   matches++;
//   switch (firstCardClicked[0].nextSibling.className) {
//     case "psycho":
//       if (matches === max_matches) {
//         loseCondition();
//       }
//   }
//   winCondition();
//   setTimeout(function() {
//     $(firstCardClicked[0].nextSibling).addClass("quiet");
//     $(secondCardClicked[0].nextSibling).addClass("quiet");
//     resetCards();
//   }, 700);
// } else {
//   setTimeout(function() {
//     firstCardClicked.toggleClass("shrink");
//     secondCardClicked.toggleClass("shrink");
//     resetCards();
//   }, 1500);
// }

function sameChecker(card) {
  if (!firstCardClicked) {
    firstCardClicked = $(card);
    firstCardClicked.toggleClass("shrink");
    return;
  } else if (secondCardClicked) {
    return;
  } else {
    attempts++;
    secondCardClicked = $(card);
    secondCardClicked.toggleClass("shrink");
  }
}
function loseCondition() {
  var modal = $(".victoryModal-background");
  modal.css({
    display: "block"
  });
  $(".verdict").text("You lose!");
  $(".victoryModal-content > .final-attempts").text(
    "You lost in " + attempts + " attempts. Try harder next time grinder!"
  );
  $(".close").on("click", function(e) {
    modal.css({
      display: "none"
    });
    resetStats();
    $(".gameboard").empty();
    var cards = [...CARDS];
    randomizeCardLocations(cards);
  });
  resetCards();
  games_played++;
}

function winCondition() {
  if (matches === max_matches - 1) {
    $(".psychostatus statstext")
      .removeClass("notsafe")
      .addClass("safe");
  }
  if (matches === max_matches) {
    var modal = $(".victoryModal-background");
    modal.css({
      display: "block"
    });
    $(".victoryModal-content > .final-attempts").text(
      "It took you " + attempts + " attempts to match all the pairs"
    );
    $(".victoryModal-content > .final-accuracy").text(
      "Your accuracy was " + calcAccuracy() + "%"
    );
    $(".close").on("click", function(e) {
      modal.css({
        display: "none"
      });
      resetStats();
      $(".gameboard").empty();
      var cards = [...CARDS];
      randomizeCardLocations(cards);
    });
    games_played++;
  }
}

function resetCards() {
  firstCardClicked = null;
  secondCardClicked = null;
}

function calcAccuracy() {
  var percent = (matches * 100) / attempts;
  var rounded = Math.round(percent);
  return rounded;
}

function displayStats() {
  $("#attemptsDiv").text(attempts);
  if (!attempts) {
    $("#accuracyDiv").text(" ");
  } else {
    var accuracy = calcAccuracy();
    $("#accuracyDiv").text(accuracy + "%");
  }
  $("#gamesPlayedDiv").text(games_played);
}

function resetStats() {
  attempts = 0;
  matches = 0;
  $("*").removeClass("hidden");
  $("*").removeClass("quiet");
  $("div").removeClass("blocker");
  displayStats();
}

$(document).ready(init);
let firstCardClicked = null;
let secondCardClicked = null;
let matches = null;
let games_played = 0;
let attempts = null;
const max_matches = 7;
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
const zeroHaikus = [
  [
    "Haiku's are quite rad,",
    "But sometimes they don't make sense,",
    "Refridgerator."
  ],
  [
    "Your eyes deceive you,",
    "An illusion foold you all,",
    "I move for the kill"
  ],
  [
    "How hilarious.",
    "You just set off my trap card,",
    "Your death approaches."
  ],
  [
    "Bor-ed, bor-ed, bored.",
    "Bored bored bored bored bored bored bored.",
    "I am really BORED!!"
  ],
  ["I am everywhere.", "And yet I am no where too,", "I am infinite"],
  ["Disgusting, this slag", "Inelegant chemical,", "Increases damage."],
  ["Can we start moving?", "I grow tired of this spot,", "I long to explore."],
  ["We made them angry", "Prepare for counterattack", "Maliwan dickheads"]
];
let zerosFound = 0;
let damselsSafe = false;
let zeroClone = Array.from(zeroHaikus);
let zeroHaiku;
function init() {
  $(".gameboard").on("click", ".card-back", handleCardClick);
  var cards = [...CARDS];
  randomizeCardLocations(cards);
  zeroPicker();
  $(".close").on("click", function() {
    $(".startModal-background").css({ display: "none" });
  });
}

function zeroPicker() {
  let randomIndex = Math.floor(Math.random() * zeroClone.length);
  zeroHaiku = zeroClone[randomIndex];
}

function randomizeCardLocations(cardArray) {
  var gameboard = $(".gameboard");
  for (var i = 0; i < 3; i++) {
    var currentRow = $("<div>").addClass("row");
    for (var cardIndex = 0; cardIndex < 6; cardIndex++) {
      let currentCard = $("<div>").addClass("card-container");
      let cardBack = $("<div>").addClass("card-back");
      currentCard.append(cardBack);
      let randomIndex = Math.floor(Math.random() * cardArray.length);
      let randomClass = cardArray.splice(randomIndex, 1);
      let cardFront = $("<div>").addClass(randomClass);
      currentCard.append(cardFront);
      currentRow.append(currentCard);
    }
    gameboard.append(currentRow);
  }
}
function handleCardClick() {
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
    } else if (firstCardClicked[0].nextSibling.className === "zero") {
      var thisZero = firstCardClicked;
      resetCards();
      setTimeout(function() {
        cardClear($(thisZero[0].nextSibling));
      }, 700);
      var selector = ".zerohaiku .haiku" + zerosFound;
      $(selector).text(zeroHaiku[zerosFound++]);
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
          setTimeout(function() {
            cardClear(
              $(firstCardClicked[0].nextSibling),
              $(secondCardClicked[0].nextSibling)
            );
            resetCards();
          }, 700);
        } else {
          setTimeout(function() {
            cardReset(firstCardClicked, secondCardClicked);
            resetCards();
          }, 1500);
        }
        break;
      case "buttStallion":
        if (firstClass === "jack") {
          matches++;
          setTimeout(function() {
            cardClear(
              $(firstCardClicked[0].nextSibling),
              $(secondCardClicked[0].nextSibling)
            );
            resetCards();
          }, 700);
        } else {
          setTimeout(function() {
            cardReset(firstCardClicked, secondCardClicked);
            resetCards();
          }, 1500);
        }
        break;
      case "psycho":
        matches++;
        if (firstClass === "psycho" && matches !== max_matches) {
          matches--;
          loseCondition("psycho");
        } else if (firstClass === "psycho" && matches === max_matches) {
          winCondition();
        } else {
          matches--;
          setTimeout(function() {
            cardReset(firstCardClicked, secondCardClicked);
            resetCards();
          }, 1500);
        }
        break;
      case "zero":
        $(".zerohaiku .haiku" + zerosFound).text(zeroHaiku[zerosFound++]);
        setTimeout(function() {
          cardClear($(secondCardClicked[0].nextSibling));
          cardReset(firstCardClicked);
          resetCards();
        }, 700);
        break;
      case "badonkL":
        if (firstClass === "badonkR") {
          if (!damselsSafe) {
            loseCondition("tina");
          } else {
            matches++;
            setTimeout(function() {
              cardClear(
                $(firstCardClicked[0].nextSibling),
                $(secondCardClicked[0].nextSibling)
              );
              resetCards();
            }, 700);
          }
        } else {
          setTimeout(function() {
            cardReset(firstCardClicked, secondCardClicked);
            resetCards();
          }, 1500);
        }
        break;
      case "badonkR":
        if (firstClass === "badonkL") {
          if (!damselsSafe) {
            loseCondition("tina");
          } else {
            matches++;
            setTimeout(function() {
              cardClear(
                $(firstCardClicked[0].nextSibling),
                $(secondCardClicked[0].nextSibling)
              );
              resetCards();
            }, 700);
          }
        } else {
          setTimeout(function() {
            cardReset(firstCardClicked, secondCardClicked);
            resetCards();
          }, 1500);
        }
        break;
      case "tina":
        damselsSafe = true;
        setTimeout(function() {
          cardClear($(secondCardClicked[0].nextSibling));
          cardReset(firstCardClicked);
          resetCards();
        }, 700);
        $(".damselstatus .statstext")
          .removeClass("notsafe")
          .addClass("safe");
        break;
      default:
        if (firstClass === secondClass) {
          matches++;
          setTimeout(function() {
            cardClear(
              $(firstCardClicked[0].nextSibling),
              $(secondCardClicked[0].nextSibling)
            );
            resetCards();
          }, 700);
        } else {
          setTimeout(function() {
            cardReset(firstCardClicked, secondCardClicked);
            resetCards();
          }, 1500);
        }
    }
    winCondition();
    displayStats();
  }
}

function cardClear() {
  for (var cardIndex = 0; cardIndex < arguments.length; cardIndex++) {
    arguments[cardIndex].addClass("quiet");
  }
}
function cardReset() {
  for (var cardIndex = 0; cardIndex < arguments.length; cardIndex++) {
    arguments[cardIndex].toggleClass("shrink");
  }
}

function loseCondition(typeString) {
  let sentence;
  let imageSrc;
  $(".show-board").on("click", function() {
    $(".victoryModal-background").css({
      visibility: "hidden"
    });
    $(".gameboard").css({
      "pointer-events": "none"
    });
    $(".title > h4")
      .text("Show Stats")
      .on("click", function() {
        $(".victoryModal-background").css({
          visibility: "visible"
        });
      });
  });
  if (typeString === "tina") {
    sentence = "Find an explosives expert before matching the damsels!";
    imageSrc = "./assets/images/tina.png";
  } else if (typeString === "psycho") {
    sentence = "Match the psychos last!";
    imageSrc = "./assets/images/psycho.png";
  }
  var modal = $(".victoryModal-background");
  modal.css({
    display: "block"
  });
  $(".lossType").text(sentence);
  $(".verdict").text("You lose!");
  $(".victoryModal-content > .final-attempts").text(
    "Try harder next time grinder!"
  );
  const lossImage = $(`<img src=${imageSrc} />`).addClass("info-picture-big");
  $(".loss-image").append(lossImage);
  if (typeString === "tina") {
    const extraInfo = $("<div>")
      .append("<p>Before</p>")
      .append(
        $('<img class="info-picture-small" src="./assets/images/badonkR.png"/>')
      )
      .append($("<span>/</span>"))
      .append(
        $("<img class='info-picture-small' src='./assets/images/badonkL.png'/>")
      );
    $(".victoryModal-content").append(extraInfo);
  }
  $(".close").on("click", function() {
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
    $(".psychostatus .statstext")
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
    $(".close").on("click", function() {
      modal.css({
        display: "none"
      });
      resetStats();
      resetCards();
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
  $(".attemptsDivText").text(attempts);
  if (!attempts) {
    $(".accuracyDivText").text(" ");
  } else {
    var accuracy = calcAccuracy();
    $(".accuracyDivText").text(accuracy + "%");
  }
  $(".gamesPlayedDivText").text(games_played);
}

function resetStats() {
  attempts = 0;
  matches = 0;
  zerosFound = 0;
  damselsSafe = false;
  $(".title > h4").text("Borderlands Matching Game");
  $(".gameboard").css({
    "pointer-events": "auto"
  });
  $(".loss-image").empty();
  $("*").removeClass("hidden");
  $("*").removeClass("quiet");
  $("div").removeClass("blocker");
  displayStats();
  $(".haiku0").text("");
  $(".haiku1").text("");
  $(".haiku2").text("");
  $(".psychostatus .statstext").removeClass("safe");
  $(".damselstatus .statstext").removeClass("safe");
  $(".psychostatus .statstext").addClass("notsafe");
  $(".damselstatus .statstext").addClass("notsafe");
}

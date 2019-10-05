$(document).ready(init)
var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var games_played = 0;
var attempts = null;
var CARDS = ['buttStallion','tina','zero','roland','psycho','maya','lillith','jack','flak']
function init(){
    $('.gameboard').on('click','.card-back',handleCardClick)
    var cards = CARDS.concat(CARDS);
    randomizeCardLocations(cards);

}

function randomizeCardLocations(cardArray){
    //cardArray is an array of strings that correspond to css classes that have background images
    var gameboard = $('.gameboard')
    for(var i=0; i<3;i++){ //For each row
        var currentRow = $('<div>').addClass('row'); //Create a div with class row
        for(var cardIndex=0;cardIndex<6;cardIndex++){ //Loop 6 times
            let currentCard = $('<div>').addClass('card-container'); //Create a div with class contanier
            let cardBack = $('<div>').addClass('card-back'); //Create a div with class card back
            currentCard.append(cardBack); //Append card back div to container div
            let randomIndex = Math.floor(Math.random()*cardArray.length) //find a random index in an array of cardArray param. Shrinks along with the length of the array during the next step
            let randomClass = cardArray.splice(randomIndex,1); //return the array @ random index and delete it from the array
            let cardFront = $('<div>').addClass(randomClass) // make a div with class that is added from the array
            currentCard.append(cardFront); //append the card front to the container div
            currentRow.append(currentCard); //append the container div to the row
        }
        gameboard.append(currentRow); //at the end of each row, append it to the gameboard
    }
}
function handleCardClick(event){
    // $(event.delegateTarget).addClass(this.nextSibling.className)
    if(!firstCardClicked){
            // $(this).toggleClass('hidden');
        firstCardClicked= $(this);
        firstCardClicked.toggleClass('shrink')
        return;
    }
    else if (secondCardClicked){
        return;
    }
    else{
        // $(this).toggleClass('hidden');
        attempts++;
        secondCardClicked = $(this);
        secondCardClicked.toggleClass('shrink')
        if(firstCardClicked[0].nextSibling.className === secondCardClicked[0].nextSibling.className){
            matches++;
            debugger;
            if($(firstCardClicked[0].nextSibling).hasClass('psycho') && matches !== max_matches){
                loseCondition();
            }
            else{ 
            winCondition();
            setTimeout(function(){
            $(firstCardClicked[0].nextSibling).addClass('quiet');
            $(secondCardClicked[0].nextSibling).addClass('quiet');
            resetCards();
            }, 700)
        }
        }
        else{
            setTimeout(function(){
                // firstCardClicked.toggleClass('hidden');
                // secondCardClicked.toggleClass('hidden');
                firstCardClicked.toggleClass('shrink');
                secondCardClicked.toggleClass('shrink')
                resetCards();            
            },1500)
            
        }
        displayStats();
        

    }
    
}


function loseCondition(){
    console.log("You suck!")
    var modal = $('.victoryModal-background')
    modal.css({
        'display': 'block'
    })
    $('.verdict').text('You lose!')
    $('.victoryModal-content > .final-attempts').text('You lost in ' +attempts+ ' attempts. Try harder next time grinder!');
    $('.close').on('click',function(e){
        modal.css({
            'display':'none'
        })
        resetStats();
        $('.gameboard').empty();
        var cards = CARDS.concat(CARDS)
        randomizeCardLocations(cards);
    })
    games_played++;
}

function winCondition(){
    if (matches === max_matches){
        console.log("You won!")
        var modal = $('.victoryModal-background')
        modal.css({
            'display': 'block'
        })
        $('.victoryModal-content > .final-attempts').text('It took you '+attempts+ ' attempts to match all the pairs');
        $('.victoryModal-content > .final-accuracy').text('Your accuracy was '+ calcAccuracy()+'%');
        $('.close').on('click',function(e){
            modal.css({
                'display':'none'
            })
            resetStats();
            $('.gameboard').empty();
            var cards = CARDS.concat(CARDS)
            randomizeCardLocations(cards);
        })
        games_played++;

    }; 
}


function resetCards(){
    firstCardClicked=null;
    secondCardClicked=null;
}

function calcAccuracy(){
    var percent = matches * 100 / attempts
    var rounded = Math.round(percent)
    return rounded;
}

function displayStats(){
    $('#attemptsDiv').text(attempts);
    if (!attempts){
        $('#accuracyDiv').text(' ');
    }
    else{
        var accuracy = calcAccuracy();
        $('#accuracyDiv').text(accuracy + '%')
    }
    $('#gamesPlayedDiv').text(games_played);
}

function resetStats(){
    attempts=0;
    matches=0;
    $('*').removeClass('hidden');
    $('*').removeClass('quiet');
    $('div').removeClass('blocker');
    displayStats();
    
}



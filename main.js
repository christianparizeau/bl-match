$(document).ready(init)
var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 2;
var games_played = 0;
var attempts = null;
var CARDS = ['buttStallion','tina','zero','roland','psycho','maya','lillith','jack','flak']
function init(){
    $('.gameboard').on('click','.card-back',handleCardClick)
    var cards = CARDS.concat(CARDS);
    randomizeCardLocations(cards);

}

function randomizeCardLocations(cardArray){
    var gameboard = $('.gameboard')
    for(var i=0; i<3;i++){
        var currentRow = $('<div>').addClass('row');
        for(var cardIndex=0;cardIndex<6;cardIndex++){
            let currentCard = $('<div>').addClass('card-container');
            let cardBack = $('<div>').addClass('card-back');
            currentCard.append(cardBack);
            let randomIndex = Math.floor(Math.random()*cardArray.length)
            let randomClass = cardArray.splice(randomIndex,1);
            let cardFront = $('<div>').addClass(randomClass)
            currentCard.append(cardFront);
            currentRow.append(currentCard);
        }
        gameboard.append(currentRow);
    }
}
function handleCardClick(event){
    // $(event.delegateTarget).addClass(this.nextSibling.className)
    if(!firstCardClicked){
        $(this).toggleClass('hidden');
        firstCardClicked= $(this);
        return;
    }
    else if (secondCardClicked){
        return;
    }
    else{
        $(this).toggleClass('hidden');
        attempts++;
        secondCardClicked = $(this);
      
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
                firstCardClicked.toggleClass('hidden');
                secondCardClicked.toggleClass('hidden');
                resetCards();            
            },700)
            
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



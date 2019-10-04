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

// function findRandomIndex(array){
//     return Math.floor(Math.random()*array.length)
// }


function handleCardClick(event){
    // $(event.delegateTarget).addClass(this.nextSibling.className)
    if(!firstCardClicked){
        $(this).toggleClass('hidden');
        firstCardClicked= $(this);
        return
    }
    else if (secondCardClicked){
        return
    }
    else{
        $(this).toggleClass('hidden');
        attempts++;
        secondCardClicked = $(this);
      
        if(firstCardClicked[0].nextSibling.className === secondCardClicked[0].nextSibling.className){
            matches++;
            winCondition();
            $(firstCardClicked[0].nextSibling).addClass('quiet');
            $(secondCardClicked[0].nextSibling).addClass('quiet');
            resetCards();
       
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

function winCondition(){
    if (matches === max_matches){
        console.log("You won!")
        $('victoryModal-background').css({
            'display': 'block'
        })
    //     $('.modal').modal({
    //         fadeDuration: 100,
    //         fadeDelay: 0.5,
    //         escapeClose:false,
    //         showClose:false,
    //         clickClose: false
        };
    games_played++;   
    
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
    $('.modal').modal({
        fadeDuration: 100,
        fadeDelay: 0.5,
        escapeClose:false,
        showClose:false,
        clickClose: false
    });
    $('div').removeClass('blocker');
    displayStats();
    
}



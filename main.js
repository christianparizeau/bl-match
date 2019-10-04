$(document).ready(init)
var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 2;
var games_played = 0;
var attempts = null;
function init(){
    $('.gameboard').on('click','.card-back',handleCardClick)
}

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
            },500)
            
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



$(document).ready(init)
var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 2;
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
    else if (!secondCardClicked){
        $(this).toggleClass('hidden');

        secondCardClicked = $(this);
      
        if(firstCardClicked[0].nextSibling.className === secondCardClicked[0].nextSibling.className){
            matches++;
            winCondition();
            setTimeout(function(){
                $(firstCardClicked[0].nextSibling).addClass('quiet');
                $(secondCardClicked[0].nextSibling).addClass('quiet');
                resetCards();
            }, 300)
        }
        else{
            setTimeout(function(){
                firstCardClicked.toggleClass('hidden');
                secondCardClicked.toggleClass('hidden');
                resetCards();            
            },500)
            
        }
        

    }
    
}

function winCondition(){
    if (matches === max_matches){
        $('.modal').modal({
            fadeDuration: 100,
            fadeDelay: 0 
        });
    }
}


function resetCards(){
    firstCardClicked=null;
    secondCardClicked=null;
}




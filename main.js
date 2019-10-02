$(document).ready(init)
var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
function init(){
    $('.gameboard').on('click','.card-back',handleCardClick)
}

function handleCardClick(event){
    $(event.delegateTarget).addClass(this.nextSibling.className)
    $(this).toggleClass('hidden');
    if(!firstCardClicked){
        firstCardClicked= $(this);
        return
    }
    else{
        secondCardClicked = $(this);
      
        if(firstCardClicked[0].nextSibling.className === secondCardClicked[0].nextSibling.className){
            console.log("It's a match!");
            matches++;
            resetCards();
        }
        else{
            setTimeout(function(){
                firstCardClicked.toggleClass('hidden');
                secondCardClicked.toggleClass('hidden');
                resetCards();            
            },1500)
            
        }
        

    }
    
}

function resetCards(){
    firstCardClicked = null;
    secondCardClicked = null;
}


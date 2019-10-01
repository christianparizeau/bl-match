$(document).ready(init)

function init(){
    $('.card-back').on('click', handleCardClick)
}

function handleCardClick(event){
    $(event.currentTarget).toggleClass('hidden');
}
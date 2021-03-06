/*
 * Create a list that holds all of your cards
 */

var list = document.querySelector('.deck');
var restart = document.getElementsByClassName('restart');
//Restart button
restart[0].addEventListener('click', function() {
    mix()
});

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

number = 0;
var fullstars = 5;
var stars = document.getElementsByClassName('fa-star');
var firstCard = "";
var match = 0;
var isClicked = false;
var second = 0;
var cards = document.querySelectorAll(".card");
//Count number of moves and add/removes classes on success/fail
mix();
for(var x = 0; x < cards.length; x++) {
    cards[x].addEventListener('click', function(event) {
        number += 1;
        count(number);
        star(number);
        var open = document.querySelectorAll(".open").length;
        //Call time function if true
        if (!isClicked){time();isClicked = true;};
        if(open != 0 && open % 2 == 0) {
            // DO noting 
        } else {//Opens card
            event.path[0].className += (' open show');
            //if card with class open already assigned go throw matching algoritm, else assign it to firstCard
            if(document.querySelectorAll(".show").length > 1) {
                if(firstCard.path[0].childNodes[1].className == event.path[0].childNodes[1].className) {
                    event.path[0].className += (' match');
                    firstCard.path[0].className += (' match');
                    firstCard.path[0].classList.remove('open');
                    firstCard.path[0].classList.remove('show');
                    event.path[0].classList.remove('show');
                    event.path[0].classList.remove('open');
                    match += 1;
                    matched(match);
                }
                else {
                    event.path[0].className += (' incorrect');
                    event.path[0].className += (' incorrect');
                    firstCard.path[0].className += (' incorrect');
                    firstCard.path[0].className += (' incorrect');
                    setTimeout(function(){
                        event.path[0].classList.remove('open');
                        event.path[0].classList.remove('show');
                        event.path[0].classList.remove('incorrect');
                        firstCard.path[0].classList.remove('open');
                        firstCard.path[0].classList.remove('show');
                        firstCard.path[0].classList.remove('incorrect');
                    }, 800)
                }
            } else {
                firstCard = event
            }
        }
    })
}
//Time count
var interval = null;
function time() {
    interval = setInterval(function() {
        second++;
        document.querySelector('.time').textContent = second + " seconds"
    }, 1000);
};
//Check how many cards matched
function matched(match) {
    if (match == 8) {
        clearInterval(interval);
        // setTimeout(function(){
        congratulationEndOfTheGame();
        // }, 200);
    }
};
function congratulationEndOfTheGame() {
    // https://stackoverflow.com/a/6247331
    document.querySelector('body').innerHTML =
        '<div class="container">' +
        '<h1>U WON!!!</h1>' +
        '<br/>' +
        '<i class="fa fa-thumbs-up"></i>' +
        '<i class="fa fa-thumbs-up"></i>' +
        '<i class="fa fa-thumbs-up"></i>' +
        '</br>' +
        '<h3>It took you '+ second +' seconds</h3>' +
        '<h2 class="foobar">Stars ' + '</h2>' +
        '<input type="button" value="Play Again" onClick="document.location.reload()">' +
        '</div>';
    document.querySelector('.foobar').appendChild(winStars(fullstars));

};
function mix() {
    nodes = Array.prototype.slice.call(list.children);
    nodes = shuffle(nodes);
    count(0);
    match = 0;
    second = 0;
    var i = 0;
    while(i < nodes.length)
    {
        list.appendChild(nodes[i]);
        //Flip all cards upside down
        nodes[i].classList.remove('open');
        nodes[i].classList.remove('show');
        nodes[i].classList.remove('incorrect');
        nodes[i].classList.remove('match');
        ++i;
    }
    //Fade out stars become full stars
    fullstars = 5;
    for (var c = 4; c >= 0; c--) {
        if(stars[c].classList.contains('fa-star-o')) {
            stars[c].classList.remove('fa-star-o');
        }

    }
}
//Count number of moves
function count(num) {
    var moves = document.getElementsByClassName('moves')[0];
    moves.innerHTML = num;
    number = num;
};
//After 17 moves adds class to fade out a star
function star(number) {
    if(number % 17 == 0) {
        if(fullstars > 0) {
            fullstars-=1;
            stars[fullstars].classList.add('fa-star-o')
        }
    }
    return fullstars;
};
function winStars(fullstars) {
    var fragment = document.createElement('div');
    console.log(fullstars)
    for(var j = 0; j < fullstars; j++){
        var element
        element = document.createElement('i');
        element.className += "fa fa-star"; 
        fragment.appendChild(element);
    }
    return fragment;
};

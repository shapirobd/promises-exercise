// Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
.then(resp => {
    let card = resp.data.cards[0]
    console.log(`${card.value} of ${card.suit}`)
})
.catch(err => {
    console.log(`ERROR: ${err}`)
})


// Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.
// Once you have both cards, console.log the values and suits of both cards.

let deck
let cards = []

axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
.then(resp => {
    cards.push(resp.data.cards[0])
    return resp.data.deck_id
})
.then(deck => {
    axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
    .then(resp => {
        cards.push((resp.data.cards[0]))
        for (let card of cards) {
            console.log(`${card.value} of ${card.suit}`)
        }
    })
})
.catch(err => {
    console.log(`ERROR: ${err}`)
})

// Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.


// I also allowed for a reset button once all the cards are gone

let drawDeck
let drawnCard
$('#draw-btn').on('click', function(evt) {
    evt.preventDefault()
    if (!drawDeck) {
        axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
        .then(resp => {
            drawnCard = resp.data.cards[0]
            drawDeck = resp.data.deck_id
            $('#card-div').append(`<img src=${drawnCard.image} />`)
        })
    } else {
        axios.get(`https://deckofcardsapi.com/api/deck/${drawDeck}/draw/?count=1`)
        .then(resp => {
            if (!resp.data.success) {
                $('#card-div').empty()
                $('#card-div').append(`<h1 class="col-12 text-center">All Cards Drawn!</h1>`)
                $('#card-div').append(`<button class="btn btn-dark" id="reshuffle-btn">Reshuffle Deck</button>`)
                $('#reshuffle-btn').on('click', function(evt) {
                    evt.preventDefault()
                    $('#card-div').empty()
                    drawDeck = undefined
                    drawnCard = undefined
                })
            } else {
                drawnCard = resp.data.cards[0]
                $('#card-div').empty()
                $('#card-div').append(`<img src=${drawnCard.image} />`)
            }
        })
    }
})

// FURTHER STUDY

// Figure out how to make a single request to the Pokemon API to get names and URLs for every pokemon in the database.

axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1050')
.then(resp => {
    console.log(resp)
})

// Once you have names and URLs of all the pokemon, pick three at random and make requests to their URLs. Once those requests are complete, console.log the data for each pokemon.



// Start with your code from 2, but instead of logging the data on each random pokemon, store the name of the pokemon in a variable and then make another request, this time to that pokemon’s species URL (you should see a key of species in the data). Once that request comes back, look in the flavor_text_entries key of the response data for a description of the species written in English. If you find one, console.log the name of the pokemon along with the description you found.

// ^^ Example: “ducklett: They are better at swimming than flying, and they happily eat their favorite food, peat moss, as they dive underwater.”



// BONUS Instead of relying on console.log, let’s create a UI for these random pokemon. Build an HTML page that lets you click on a button to generate data from three randomly chosen pokemon. Include the name of the pokemon, an image of the pokemon, and the description of its species which you found in 3.

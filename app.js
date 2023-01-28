// ////////////////////////
// // PART ONE
// ////////////////////////

const url = 'http://numbersapi.com'

// 1.
let numInfo = axios.get(`${url}/52?json`)

numInfo
    .then(fact => console.log(fact))
    .catch(err => console.log(err));

// 2.
let fourFacts = axios.get(`${url}/52..54?json`)
fourFacts
    .then(facts => console.log(facts))
    .catch(err => console.log(err))

// 3.
let multipleFacts = [];
for (let i = 1; i < 5; i++) {
    multipleFacts.push(axios.get(`${url}/52?json`))
}

Promise.all(multipleFacts)
    .then(facts => facts.forEach(fact => {
        let li = document.createElement('li')
        li.innerText = fact.data.text
        document.getElementById('facts').append(li)}))
    .catch(err => console.log(err))


////////////////////////
// PART TWO
////////////////////////

// 1. Get one card from the deck
const oneCard = axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')

oneCard
    .then(card => console.log(card.data.cards[0].value + ' of ' + card.data.cards[0].suit))

// 2. Get one card from a new shuffled deck and then draw another card from the same deck
const shuffledDeck = axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    
shuffledDeck
    .then(deck => {
        let deckId = deck.data.deck_id
        let drawCard = axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        return drawCard})
    .then(cards => {
        res = cards.data
        console.log(`${res.cards[0].value} of ${res.cards[0].suit}`)
        console.log(`${res.cards[1].value} of ${res.cards[1].suit}`)
    })
    .catch(err => console.log(err))

// 3. On button click, get a new shuffled deck, and then display a new card each time the button is clicked
const deckBtn = document.getElementById('deck-btn')
const deck = document.getElementById('deck')

deckBtn.addEventListener('click', () => {
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => {
        let deckId = res.data.deck_id
        let drawCard = axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        return drawCard
    })
    .then(card => {
        let img = document.createElement('img')
        img.src = card.data.cards[0].image
        deck.append(img)
    })
    .catch(err => console.log(err))
})






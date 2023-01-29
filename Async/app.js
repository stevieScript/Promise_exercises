//////////////////
//Part 1 
/////////////////

//1
const url = 'http://numbersapi.com'

async function numFact() {
    let res = await axios.get(`${url}/52?json`)
    console.log(res.data.text)
}
numFact()

//2
async function multipleNumFacts() {
let {data} = await axios.get(`${url}/22..25?json`)
    for(let key in data) {
        let li = document.createElement('li')
        li.innerText = data[key]
        document.getElementById('facts').append(li)
        console.log(data[key])
    }
}
multipleNumFacts()

//3
async function fourFacts() {
    let facts = []
    for(let i = 0; i < 4; i++) {
        let res = await axios.get(`${url}/52?json`)
        facts.push(res.data)
    }
    Promise.all(facts).then(facts => {
        for(let fact of facts) {
            let li = document.createElement('li')
            li.innerText = fact.text
            document.getElementById('facts').append(li)
        }
    })
}
fourFacts()

////////////////////////
// PART TWO
////////////////////////
//1 Get one card from the deck
async function getCard() {
    let res = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
    let card = res.data.cards[0]
    console.log(`${card.value} of ${card.suit}`)
}
getCard()

// 2. Get one card from a new shuffled deck and then draw another card from the same deck

async function getCard() {
    let res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    let deckId = res.data.deck_id
    let res2 = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    let card = res2.data.cards[0]
    let card2 = res2.data.cards[1]
    console.log(`${card.value} of ${card.suit}`)
    console.log(`${card2.value} of ${card2.suit}`)
}
getCard()

// 3. On button click, get a new shuffled deck, and then display a new card each time the button is clicked

const btn = document.querySelector('#deck-btn')
const deck = document.querySelector('#deck')


btn.addEventListener('click', async function() {
    let res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    let deckId = res.data.deck_id
    let res2 = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    let card = res2.data.cards[0]
    let img = document.createElement('img')
    img.src = card.image
    deck.append(img)

    console.log(`${card.value} of ${card.suit}`)
})

getCard()
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
// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

const base_url = 'https://deckofcardsapi.com/api/deck';
axios.get(`${base_url}/new/shuffle/?deck_count=1`)
    .then((p1) => {
        return axios.get(`${base_url}/${p1.data.deck_id}/draw/?count=1`);
    })
    .then((p2) => {
        value = p2.data.cards[0].value;
        suit = p2.data.cards[0].suit;
        console.log(`${value} of ${suit}`);
    })
    .catch(err => {
        console.log(err);
    });

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

// Once you have both cards, console.log the values and suits of both cards.

cards = []

axios.get(`${base_url}/new/shuffle/?deck_count=1`)
    .then((p1) => {
        return axios.get(`${base_url}/${p1.data.deck_id}/draw/?count=1`);
    })
    .then((p2) => {
        value = p2.data.cards[0].value;
        suit = p2.data.cards[0].suit;
        cards.push(`${value} of ${suit}`);
        return axios.get(`${base_url}/${p2.data.deck_id}/draw/?count=1`);
    })
    .then((p3) => {
        value = p3.data.cards[0].value;
        suit = p3.data.cards[0].suit;
        cards.push(`${value} of ${suit}`);
        return cards
    })
    .then(() => console.log(cards[0],",", cards[1]))
    .catch(err => {
        console.log(err);
    });

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

const button = document.querySelector('button')
const card_area = document.querySelector('ul')
deckId = null

axios.get(`${base_url}/new/shuffle/?deck_count=1`)
    .then((res) => {
        deckId = res.data.deck_id
    })

button.addEventListener("click", function(event) {
    card_area.removeChild(card_area.firstChild)
    axios.get(`${base_url}/${deckId}/draw/?count=1`)
        .then((card) => {
            value = card.data.cards[0].value;
            suit = card.data.cards[0].suit;
            console.log(card.data.remaining);
            const next_card = document.createElement('li');
            next_card.innerText = `${value} of ${suit}`;
            card_area.append(next_card);

            if (card.data.remaining === 0) {
                button.hidden = true;
            };
        });
});
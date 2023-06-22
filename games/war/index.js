const { Deck } = require('../../cards');
const {getInputWithPrompt, getNumberWithPrompt, getBooleanWithPrompt} = require('../../input');
const { MENU_TEXT, GAME_TEXT } = require('./warValues');

class Player{
    constructor(name){
        this.name = name;
        this.hand = [];
    }
}

function convertAceToHigh(deck){
    for(let card of deck) if(card.value === 1) card.value = 14;
}

function dealCards(deck, players){
    while(deck.length){
        for(let player of players){
            if(!deck.length) break;
            player.hand.push(Deck.pullTopCard(deck));
        }
    }
}

async function setUpPlayers(){
    const You = new Player('USER');
    const npcCount = await getNumberWithPrompt(MENU_TEXT.getPlayers);
    const players = [You];
    for(let i=0; i<npcCount; i++) players.push(new Player(`Player${i+2}`));
    return players;
}

async function WAR (){
    let simToEnd = false;
    const myDeck = new Deck().shuffle();
    const highAcess = await getBooleanWithPrompt(MENU_TEXT.highAces);
    if(highAcess) convertAceToHigh(myDeck);
    const players = await setUpPlayers();
    dealCards(myDeck, players);
    let winner = null;
    while(!winner){
        if(!simToEnd){
            const input = await getInputWithPrompt(GAME_TEXT.nextHand);
            if( input == 'SIM') simToEnd = true;
        }
        const cardsInMiddle = [];
        for(let player of players) {
            if(player.hand.length) cardsInMiddle.push({player, card:player.hand.pop()});
        }
        let handWinner = undefined;
        console.log('\n');
        for(let i of cardsInMiddle){
            const hand = `${i.card.display} of ${i.card.suit}S`;
            console.log(`${i.player.name }: ${hand}`);
            if(handWinner === undefined || i.card.value > handWinner.card.value){
                handWinner = i;
            }
        }
        console.log(`\n\x1b[3m${handWinner.player.name} wins this round\x1b[0m\n`);
        for(let i of cardsInMiddle) handWinner.player.hand = [i.card, ...handWinner.player.hand];
        const playersInGame = [];
        for(let player of players){
            if(player.hand.length) playersInGame.push(player);
        }
        if(playersInGame.length===1) winner = playersInGame[0];
    }
    console.log(`\n\x1b[3m${winner.name} WINS!\x1b[0m\n`);
}

module.exports = WAR;
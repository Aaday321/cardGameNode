const { LETTERS, SUITS } = require( "./values");

const [ J,Q,K,A ] = LETTERS;

class Card{
    constructor(value, suit){
        this.value = value;
        this.suit = suit;
    };
    build(){
        switch(this.value){
            case 11: this.display = J; break;
            case 12: this.display = Q; break;
            case 13: this.display = K; break;
            case 1: this.display = A; break;
            default: this.display = this.value;
        }
        return this;
    };
}

class Deck{
    constructor(){
        this.deck = [];
        const nums = [];
        for(let i=1;i<=13;i++) nums.push(i);
        for(let i of nums) for(let j of SUITS) this.deck.push(new Card(i,j).build());
    };
    shuffle(){
        //Stolen straight from Rudy's code ;)
        let currentIndex = this.deck.length;
        let temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          temporaryValue = this.deck[currentIndex];
          this.deck[currentIndex] = this.deck[randomIndex];
          this.deck[randomIndex] = temporaryValue;
        }
        return this.deck;
    };
    static pullTopCard(deck){
        deck = deck || this.deck;
        return deck.pop();
    };
};
module.exports = {
    Card, Deck
};
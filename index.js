const {getInputWithPrompt} = require('./input');
const { MENU_TEXT } = require('./values');

async function run(){
    let loadedGame = null;
    let attempts = 0;
    while(!loadedGame){
        if(attempts) console.log(MENU_TEXT.gameNotFound);
        const gameSelection = await getInputWithPrompt(MENU_TEXT.introText);
        switch(gameSelection.toLowerCase()){
            case 'war': loadedGame = require('./games/war/index'); break;  
        }
        attempts++;
    }
    loadedGame();
};

run();
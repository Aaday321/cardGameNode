const {getInputWithPrompt} = require('./input');
const { MENU_TEXT } = require('./values');

async function run(){
    let loadedGame = null;
    let attempts = 0;
    while(!loadedGame){
        if(attempts) console.log(MENU_TEXT.gameNotFound);
        let gameSelection = await getInputWithPrompt(MENU_TEXT.introText);
        gameSelection = gameSelection.toLowerCase();
        try{
            loadedGame = require(`./games/${gameSelection}/index`);
        }catch(err){
            attempts++
        }
    }
    loadedGame();
};

run();
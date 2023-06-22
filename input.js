const { resolve } = require('path');
const readline = require('readline');



const getInputWithPrompt = prompt => {
    if(!prompt) prompt = '$';
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve=>{
        rl.question(prompt + ': ', input => {
            rl.close();
            resolve(input);
        });
    });
};

const getNumberWithPrompt = async (prompt) => {
    let input = await getInputWithPrompt(prompt);
    while(isNaN(Number(input))) {
        console.log("Sorry, that's not a number try again");
        input = await getInputWithPrompt(prompt);
    }
    return input;
}

const getBooleanWithPrompt = async (prompt) => {
    let input = await getInputWithPrompt(prompt);
    input = input.toLowerCase();
    const acceptableYes = ['y','yes'];
    const acceptableNo = ['n','no'];
    while(true){
        if([...acceptableYes, ...acceptableNo].includes(input)){
            return acceptableYes.includes(input);
        }
        console.log('Sorry, only yes or no is accepted');
        input = await getInputWithPrompt(prompt);
    }
};

module.exports = {
    getInputWithPrompt, getNumberWithPrompt, getBooleanWithPrompt
};
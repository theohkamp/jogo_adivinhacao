let difficulty = 100;

function generateSecretNumber(dif){
    return parseInt(dif*Math.random()+1);
}

generateSecretNumber(difficulty);
let secretNumber = generateSecretNumber(difficulty);

let tries = 1
console.log(secretNumber);

function showTextOnScreen(tag, text){
    let title = document.querySelector(tag);
    title.innerHTML = text;
}

function showInitialText(){
    showTextOnScreen('h1', 'Quantas entregas o Chris fez hoje?');
    showTextOnScreen('p',`Amazon mandou entre 1 e ${difficulty} paradas`)
}

showInitialText();

function checkGuess(){
    let guess = document.querySelector('input').value;
    if (guess == secretNumber){
        showTextOnScreen('h1', 'Acertou!');
        if(secretNumber > difficulty/2){
            let wordTries = tries > 1 ? 'tentativas' : 'tentativa';
            let messageTries = `Ele trabalhou bastante hoje! Você acertou em ${tries} ${wordTries}`;
            showTextOnScreen('p', messageTries);
        }else{
            let wordTries = tries > 1 ? 'tentativas' : 'tentativa';
            let messageTries = `Isso nem é trabalho, é descanso! Você acertou em ${tries} ${wordTries}`;
            showTextOnScreen('p', messageTries);
        }
        
        document.getElementById('restart').removeAttribute('disabled');
    }else{
        if(guess > secretNumber){
            showTextOnScreen('p', `Ele não trabalha tudo isso não... Menos que ${guess}`);
        }else{
            showTextOnScreen('p', `Ish... Um pouco mais que ${guess}`);
        }
        tries++;
        cleanShield();

    }
}

function cleanShield(){
    guess = document.querySelector('input');
    guess.value = '';
}

function restartGame(){
    secretNumber = generateSecretNumber(difficulty);
    document.getElementById('restart').setAttribute('disabled', true)
    console.log(secretNumber);
    cleanShield();
    tries = 1;
    showInitialText();
}
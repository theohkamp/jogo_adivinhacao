let drawnNumberList = [];

let difficulty = 100;

function generateSecretNumber(){
    let generatedNumber = parseInt(difficulty*Math.random()+1);
    let generateNumberQuantity = drawnNumberList.length

    if(generateNumberQuantity == difficulty){
        drawnNumberList = []
    }

    if (drawnNumberList.includes(generatedNumber)){
        return generateSecretNumber();
    }else {
        drawnNumberList.push(generatedNumber);
        console.log(drawnNumberList)
        return generatedNumber
    }
}

let secretNumber = generateSecretNumber();

let tries = 1

function showTextOnScreen(tag, text){
    let title = document.querySelector(tag);
    title.innerHTML = text;
    responsiveVoice.speak(text, "Brazilian Portuguese Male", {rate:1.8})
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
            showTextOnScreen('p', `Pisa no freio!! Foram menos que ${guess} entregas`);
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
    secretNumber = generateSecretNumber();
    document.getElementById('restart').setAttribute('disabled', true)
    console.log(secretNumber);
    cleanShield();
    tries = 1;
    showInitialText();
}
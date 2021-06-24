let clock = document.querySelector('.game__clock h1');
let playBtn = document.querySelector('.btn__play');
let chooseBtns = document.querySelectorAll('.game__btns button:not(.btn__play)');
let point = document.querySelector('.points__player p');
let selectedValues = [];

//Start the game 
playBtn.addEventListener('click', () => {

    clock.innerHTML = 5;
    job().then(choose).then(showChooseBtns);
});

//clock timer
function job() {
    return new Promise((resolve, reject) => {
        playBtn.disabled = true;
        playBtn.style.background = "grey";
        let i = 1;
        const interval = setInterval(() => {
            clock.innerHTML = i;
            i--;
            if (i < 0) {
                resolve('new job created');
                clock.style.visibility = "hidden";
                clearInterval(interval);
            }
        }, 1000)
    });
}
//when timer is 0, show pics, hide playBtn
function choose() {
    let gamers = document.querySelectorAll('.game div:not(.game__clock)');
    gamers.forEach((gamer) => {
        gamer.style.visibility = "initial";
    })
    playBtn.style.display = "none";

    //when hovering on the button, its pair's border helps to choose
    let playerChoices = document.querySelectorAll('.game__player img');
    let computerChoices = document.querySelectorAll('.game__computer img');
    for (let i = 0; i < chooseBtns.length; i++) {
        //:hover outline start here
        chooseBtns[i].addEventListener('mouseenter', (e) => {
            e.stopPropagation();
            playerChoices[i].style.border = "3px solid lightseagreen";
        })
        chooseBtns[i].addEventListener('mouseout', (e) => {
            e.stopPropagation();
            playerChoices[i].style.border = "3px solid transparent";
        })

        //:hover outline ends here
        //remove the buttons that were not selected 
        chooseBtns[i].addEventListener('click', (e) => {
            chooseBtns.forEach((chooseBtn) => {
                if (chooseBtn != chooseBtns[i]) {
                    chooseBtn.style.display = "none";
                }
            })

            //select fighters
            let fighterType = playerChoices[i].dataset.fighter;
            let fighterChoose = playerChoices[i];
            //random computer figher
            let randomNum = Math.floor(Math.random() * computerChoices.length);
            let randomFighter = computerChoices[randomNum]
            let randomFighterType = computerChoices[randomNum].dataset.fighter;
            //player is selected (highlighted)
            playerChoose(fighterType, fighterChoose);
            computerChoose(randomFighterType);
            let prepareFight = setTimeout(function () {
                startFight(computerChoices, playerChoices, chooseBtns[i]);
                setTimeout(function () {
                    displaySelected(fighterChoose, randomFighter);
                    console.log(selectedValues); //declared at the top
                }, 2600)
                setTimeout(playerWinner, 4000);
//                setTimeout(computerWinner, 4000);
            }, 1000);

            chooseBtns[i].disabled = true;
        })
    }

    function playerChoose(fighterType, fighterChoose) {
        fighterChoose.style.animation = "selecting 0.5s forwards linear";
        let selection = allType.find((selected) => {
            return selected.name === fighterType;
        })
        selectedValues.push(selection);

    }

    function computerChoose(randomFighterType) {
        let selection = allType.find((selected) => {
            return selected.name === randomFighterType;
        })
        selectedValues.push(selection);
    }
}

function startFight(computer, player, hideButton) {
    computer.forEach((computerChoice) => {
        if (computerChoice != computer[0]) {
            computerChoice.style.display = "none";
        }
    })
    computer[0].style.animation = "prepFight 1.5s linear";
    player.forEach((playerChoice) => {
        if (playerChoice != player[0]) {
            playerChoice.style.display = "none";
        }
    })
    player[0].style.animation = "prepFight 1.5s linear";
    hideButton.style.display = "none";

}

function displaySelected(player, computer) {
    let gamePlayer = document.querySelector('.game__player');
    gamePlayer.innerHTML = "";
    gamePlayer.appendChild(player);
    player.style.display = "block";
    player.style.border = "none";
    player.style.animation = "";
    let compPlayer = document.querySelector('.game__computer');
    compPlayer.innerHTML = "";
    compPlayer.appendChild(computer);
    computer.style.display = "block";
    computer.style.animation = "";
}
//show choose buttons
function showChooseBtns() {
    chooseBtns.forEach((chooseBtn) => {
        chooseBtn.style.display = "block";
    })
}

function playerWinner() {
    if (selectedValues[1].name === selectedValues[0].beats) {
        console.log('You won!');
    } else if (selectedValues[0].name === selectedValues[1].beats){
        console.log('You loose!');
    } else {
        console.log(`It's a tie!`);
    }
}
//function computerWinner() {
//    if (selectedValues[0].name === selectedValues[1].beats) {
//        console.log('Computer won!');
//    } else {
//        console.log('Computer lose!');
//    }
//}


let allType = [
    {
        name: 'rock',
        beats: 'scissors'
},
    {
        name: 'paper',
        beats: 'rock'
},
    {
        name: 'scissors',
        beats: 'paper'
}
]

let ages = [15, 12, 18, 22, 23];
//function checkAdult(age){
//    return age>18;
//}
//console.log(ages.find(checkAdult));









//
//let clock = document.querySelector('.game__clock h1');
//let playBtn = document.querySelector('.btn__play');
//let chooseBtns = document.querySelectorAll('.game__btns button:not(.btn__play)');
//let point = document.querySelector('.points__player p');
//let selectedValues = [];
//
////Start the game 
//playBtn.addEventListener('click', () => {
//
//    clock.innerHTML = 5;
//    job().then(choose).then(showChooseBtns);
//});
//
////clock timer
//function job() {
//    return new Promise((resolve, reject) => {
//        playBtn.disabled = true;
//        playBtn.style.background = "grey";
//        let i = 1;
//        const interval = setInterval(() => {
//            clock.innerHTML = i;
//            i--;
//            if (i < 0) {
//                resolve('new job created');
//                clock.style.visibility = "hidden";
//                clearInterval(interval);
//            }
//        }, 1000)
//    });
//}
////when timer is 0, show pics, hide playBtn
//function choose() {
//    let gamers = document.querySelectorAll('.game div:not(.game__clock)');
//    gamers.forEach((gamer) => {
//        gamer.style.visibility = "initial";
//    })
//    playBtn.style.display = "none";
//
//    //when hovering on the button, its pair's border helps to choose
//    let playerChoices = document.querySelectorAll('.game__player img');
//    let computerChoices = document.querySelectorAll('.game__computer img');
//    for (let i = 0; i < chooseBtns.length; i++) {
//        //:hover outline start here
//        chooseBtns[i].addEventListener('mouseenter', (e) => {
//            e.stopPropagation();
//            playerChoices[i].style.border = "3px solid lightseagreen";
//        })
//        chooseBtns[i].addEventListener('mouseout', (e) => {
//            e.stopPropagation();
//            playerChoices[i].style.border = "3px solid transparent";
//        })
//
//        //:hover outline ends here
//        //remove the buttons that were not selected 
//        chooseBtns[i].addEventListener('click', (e) => {
//            chooseBtns.forEach((chooseBtn) => {
//                if (chooseBtn != chooseBtns[i]) {
//                    chooseBtn.style.display = "none";
//                }
//            })
//
//            //select fighters
//            let fighterType = playerChoices[i].dataset.fighter;
//            let fighterChoose = playerChoices[i];
//            //random computer figher
//            let randomNum = Math.floor(Math.random() * computerChoices.length);
//            let randomFighter = computerChoices[randomNum]
//            let randomFighterType = computerChoices[randomNum].dataset.fighter;
//            //player is selected (highlighted)
//            playerChoose(fighterType, fighterChoose);
//            computerChoose(randomFighterType);
//            let prepareFight = setTimeout(function () {
//                startFight(computerChoices, playerChoices, chooseBtns[i]);
//                setTimeout(function () {
//                    displaySelected(fighterChoose, randomFighter);
//                    console.log(selectedValues); //declared at the top
//                }, 2600)
//                setTimeout(sayhi, 4000);
//            }, 1000);
//
//            chooseBtns[i].disabled = true;
//        })
//    }
//
//    function playerChoose(fighterType, fighterChoose) {
//        fighterChoose.style.animation = "selecting 0.5s forwards linear";
//        selectedValues.push(fighterType);
//    }
//
//    function computerChoose(randomFighterType) {
//        selectedValues.push(randomFighterType);
//    }
//}
//
//function startFight(computer, player, hideButton) {
//    computer.forEach((computerChoice) => {
//        if (computerChoice != computer[0]) {
//            computerChoice.style.display = "none";
//        }
//    })
//    computer[0].style.animation = "prepFight 1.5s linear";
//    player.forEach((playerChoice) => {
//        if (playerChoice != player[0]) {
//            playerChoice.style.display = "none";
//        }
//    })
//    player[0].style.animation = "prepFight 1.5s linear";
//    hideButton.style.display = "none";
//
//}
//
//function displaySelected(player, computer) {
//    let gamePlayer = document.querySelector('.game__player');
//    gamePlayer.innerHTML = "";
//    gamePlayer.appendChild(player);
//    player.style.display = "block";
//    player.style.border = "none";
//    player.style.animation = "";
//    let compPlayer = document.querySelector('.game__computer');
//    compPlayer.innerHTML = "";
//    compPlayer.appendChild(computer);
//    computer.style.display = "block";
//    computer.style.animation = "";
//}
////show choose buttons
//function showChooseBtns() {
//    chooseBtns.forEach((chooseBtn) => {
//        chooseBtn.style.display = "block";
//    })
//}
//
//function sayhi() {
//    if (selectedValues[0] == "rock") {
//        if (selectedValues[1] == "scissors") {
//            console.log('Player won!');
//        } else if (selectedValues[1] == "paper") {
//            console.log("Computer won!");
//        } else {
//            console.log("It's a tie!");
//        }
//
//    }
//}

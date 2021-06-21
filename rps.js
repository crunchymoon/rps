//if click on play game button, every other buttons toggles to display block, by default those buttons are hidden
//use classes
//use promises
//use regex
//maybe setTimeout() function as well 


let clock = document.querySelector('.game__clock h1');
let playBtn = document.querySelector('.btn__play');
let chooseBtns = document.querySelectorAll('.game__btns button:not(.btn__play)');
let point = document.querySelector('.points__player p');

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
            playerChoose(fighterType, fighterChoose);
            computerChoose();
            chooseBtns[i].disabled = true;
            
            if(point.innerHTML=="rock"){
                console.log('jajajaja');
            }
        })
    }

    function playerChoose(fighterType, fighterChoose) {
        console.log(fighterType);
        fighterChoose.style.animation = "selecting 0.5s forwards linear";
        
        return point.innerHTML= fighterType;
    }

    function computerChoose() {
        let randomNum = Math.floor(Math.random() * computerChoices.length);
        let randomFighter = computerChoices[randomNum].dataset.fighter;
        console.log(randomFighter);
    }



}
//show choose buttons
function showChooseBtns() {
    chooseBtns.forEach((chooseBtn) => {
        chooseBtn.style.display = "block";
    })

}

//let randomNum=Math.floor(Math.random() * 3);
//console.log(randomNum);

//function chbg(element,color) {        document.querySelector(element).style.backgroundColor = color;
//    }

//btn

///////////////////////////////////////////////////




//click-> promise(resolve)-> clock-- --> clock == clock-1 == true --> 

//showCards --> hover: outline red, click --> choosed --> animation start.




//let clock = document.querySelector('.game__clock h1');
//let playBtn = document.querySelector('.btn__play');
//
//playBtn.addEventListener('click', () => {
//    clock.style.visibility = "initial";
//    clock.innerHTML = 5;
//    decreClock();
//    animate();
//
//});
//
//function decreClock() {
//    let interval = setInterval(() => {
//        if (clock.innerHTML) {
//            animate();
//            clock.innerHTML--;
//
//            if (clock.innerHTML == 0) {
//                clearInterval(interval);
//                stopAnimate();
//                clock.innerHTML = " ";
//
//                let gamePlayer = document.querySelectorAll('.game div:not(.game__clock)');
//                gamePlayer.forEach((gamer) => {
//                    gamer.style.visibility = "initial";
//                })
//            }
//        }
//    }, 1000)
//}
//
//function animate() {
//    clock.style.animation = "jump 1s ease-in infinite";
//}
//
//function stopAnimate() {
//    clock.style.animation = "none";
//}

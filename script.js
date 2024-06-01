let boxs = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGame = document.querySelector("#new");
let result = document.querySelector("#result");
let comm = document.querySelector("#command");
let selectBtn = document.querySelectorAll(".sltbtn");
let pair = [
    [0, 3, 6],
    [0, 1, 2],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
let turn1 = true
let turn2 = false;
let completed = false;
let count = 0;
let player1, player2;
let token1, token2;
reset.style.visibility = "hidden";
selectBtn[0].style.visibility = "hidden";
selectBtn[1].style.visibility = "hidden";
let play = () => {
    comm.innerText = `--!!Game Begins!!--`;
    reset.style.visibility = "visible";
    if (turn1) {
        console.log(`${player1} turns`);
        comm.innerText += `\n--!!${player1} turns!!--`;
    } else {
        console.log(`${player2} turns`);
        comm.innerText += `\n--!!${player2} turns!!--`;
    }
    boxs.forEach(i => {
        i.addEventListener("click", () => {
            if (!i.innerText) {
                selectBtn[0].style.visibility = "hidden";
                selectBtn[1].style.visibility = "hidden";
                if (turn1) {
                    i.innerText = token1;
                    i.style.color = "darkblue";
                    turn1 = false;
                    turn2 = true;
                } else if (turn2) {
                    i.innerText = token2;
                    i.style.color = "rgb(228, 30, 2)";
                    turn2 = false;
                    turn1 = true;
                }
                checkWinner();
                checkDraw();
                if (!completed && count != 9) {
                    // console.log(turn1 ? `${player1} turns` : `${player2} turns`);
                    if (turn1) {
                        console.log(`${player1} turns`);
                        comm.innerText = `--!!${player1} turns!!--`;
                    } else {
                        console.log(`${player2} turns`);
                        comm.innerText = `--!!${player2} turns!!--`;
                    }
                }
                i.disabled = true;
            }
        }, { once: true }); // Ensures the click event is only attached once
    });
}
let checkWinner = () => {
    for (let p of pair) {
        if (boxs[p[0]].innerText === token1 && boxs[p[1]].innerText === token1 && boxs[p[2]].innerText === token1) {
            console.log(`${player1} wins`);   //0
            result.innerText = `---!!!${player1} Wins!!!---`;
            comm.innerText = `--!! Congratulations !!--`;
            turn2 = false;
            turn1 = true;
            completed = true;
        }
        else if (boxs[p[0]].innerText === token2 && boxs[p[1]].innerText === token2 && boxs[p[2]].innerText === token2) {
            console.log(`${player2} wins`);
            result.innerText = `---!!!${player2} Wins!!!---`;
            comm.innerText = `--!! Congratulations !!--`;
            turn1 = false;
            turn2 = true;
            completed = true;
        }
    }
    if (completed == true) {
        disabledBoxs();
    }
}
let disabledBoxs = () => {
    for (let i of boxs) {
        i.disabled = true;
    }
}
let checkDraw = () => {
    count = 0;
    for (let i of boxs) {
        if (i.innerText != "") {
            count++;
        }
    }
    if (count == 9 && !completed) {
        console.log(`Game Draw!!!...`);
        result.innerText = "---!!! GAME DRAW !!!---";
        comm.innerText = `--!! Oops !!--`;
        // if(turn1==true){
        //     turn1=false;
        //     turn2=true;
        // }
        // else{
        //     turn1=true;
        //     turn2=false;
        // }
        disabledBoxs();
    }
}
let resetfn = () => {
    for (let i of boxs) {
        i.innerText = "";
        i.disabled = false;
    }
    completed = false;
    result.innerText = "";
    play();
}
let input = () => {
    for (let i of boxs) {
        i.innerText = "";
        i.disabled = false;
    }
    for (let i of selectBtn) {
        i.disabled = false;
        i.style.backgroundColor = "rgb(27, 8, 173)";
    }
    turn1 = true;
    turn2 = false;
    completed = false;
    result.innerText = "";
    player1 = prompt("enter the name of player1");
    player2 = prompt("enter the name of player2");
    comm.innerText = `${player1} ,please select the token : `;
    selectBtn[0].style.visibility = "visible";
    selectBtn[1].style.visibility = "visible";
    selectBtn[0].addEventListener("click", () => {
        token1 = "X"; token2 = "O";
        selectBtn[0].style.backgroundColor = "red";
        selectBtn[1].style.backgroundColor = "lightslategray";
        selectBtn[1].disabled = true;
        play();
    });
    selectBtn[1].addEventListener("click", () => {
        token1 = "O"; token2 = "X";
        selectBtn[1].style.backgroundColor = "red";
        selectBtn[0].style.backgroundColor = "lightslategray";
        selectBtn[0].disabled = true;
        play();
    });
}
reset.addEventListener("click", resetfn);
newGame.addEventListener("click", input);

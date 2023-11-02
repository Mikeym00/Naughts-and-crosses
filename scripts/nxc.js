const square = document.querySelectorAll(".square");
const playerTurn = document.querySelector(".player");
const playButton = document.querySelector(".play");
const controlPanel = document.querySelector(".controls");
const singlePlayerToggle = document.getElementById("1player");
// ##########################################################################################################################



const p1Symbol = "X";
const p2Symbol = "O";
let board2;
let turn;
const bind = (e) => game(e);
// ##########################################################################################################################

playButton.addEventListener("click", playReset);
playButton.addEventListener("click", playResetDisplay);
// ##########################################################################################################################

function playReset(){
    turn = 1;
    board2 = {
        "00":"", "01":"", "02":"",
        "10":"", "11":"", "12":"",
        "20":"", "21":"", "22":""
    };
    playerTurn.innerHTML = ` Turn: Player 1 (${p1Symbol})`;
    square.forEach((ans) =>{
        ans.addEventListener("click", bind);
        ans.classList.add("squarehover");
        ans.innerHTML = "";
    });
}
// ##########################################################################################################################

function playResetDisplay(){
    if(controlPanel.classList.contains("inplay")){
        controlPanel.classList.remove("inplay");
    }else{
        controlPanel.classList.add("inplay");
    }
}
// ##########################################################################################################################

function computerPlayer(){
    let choice = Object.keys(board2)[Math.floor(Math.random() * Object.keys(board2).length)];
    const choiceBoard = document.getElementById(`${choice}`);
    if(choiceBoard.innerHTML === ""){
        choiceBoard.innerHTML = p2Symbol;
        choiceBoard.removeEventListener("click", bind);
        choiceBoard.classList.remove("squarehover");
        board2[choice] = p2Symbol;
    }else{
        computerPlayer();
    }
}

// ##########################################################################################################################

function game(idd){

    let currentPlayer;

    if(turn % 2 != 0){
        currentPlayer = p1Symbol;
      
        playerTurn.innerHTML = `Turn: Player 2 (${p2Symbol})`;
    }else{
        currentPlayer = p2Symbol;
        playerTurn.innerHTML = ` Turn: Player 1 (${p1Symbol})`;
    }

    if(singlePlayerToggle.checked && currentPlayer === p2Symbol){
        computerPlayer();

    }else{
        idd.currentTarget.innerHTML = currentPlayer;
        idd.currentTarget.removeEventListener("click", bind);
        idd.currentTarget.classList.remove("squarehover");
        board2[idd.currentTarget.id] = currentPlayer; 
    }

    if(winCheck(currentPlayer)) return;
    turn++;
    if(turn === 10 && !playerTurn.innerHTML.includes("wins!")){
        playerTurn.innerHTML = `It's a draw!`;
        playResetDisplay();
        return;
    }
    
    if(singlePlayerToggle.checked && turn % 2 === 0){
        console.log("Player computer turn");
        game(idd);
    }
}

// ##########################################################################################################################

function winCheck(currentPlayer){
    const winCombos = [
        [board2["00"],board2["01"],board2["02"]],
        [board2["10"],board2["11"],board2["12"]],
        [board2["20"],board2["21"],board2["22"]],
        [board2["00"],board2["10"],board2["20"]],
        [board2["01"],board2["11"],board2["21"]],
        [board2["02"],board2["12"],board2["22"]],
        [board2["00"],board2["11"],board2["22"]],
        [board2["20"],board2["11"],board2["02"]]
    ];

    const equalCheck = i => i.every(letter => letter === currentPlayer);
    for(let i of winCombos){
        if(equalCheck(i)){
            console.log(currentPlayer + " wins!");
            playerTurn.innerHTML = `Player ${currentPlayer} wins!`;
            square.forEach((ans) =>{
                ans.removeEventListener("click", bind);
                ans.classList.remove("squarehover");
           
            }); 
            playResetDisplay();
            return true;
        }
    }
}

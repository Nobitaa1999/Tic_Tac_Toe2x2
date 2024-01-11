const boxes=document.querySelectorAll('.box');
const btnNewGame=document.querySelector('.btn');
const gameInfo=document.querySelector('.player');
const popTab=document.querySelector('.popup');

let currentPlayer;
let gameStat;
const winposition=[
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];

function initGame(){
    currentPlayer="X";
    gameStat=["","","","","","","","",""];
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
    btnNewGame.classList.remove("active");
    popTab.innerText="";
    popTab.classList.remove("active");
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        box.classList=`box${index+1} box`;
    })
    
}
initGame();

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleclick(index)})
});

function handleclick(index){
    if(gameStat[index]===""){
        boxes[index].innerText=currentPlayer;
        boxes[index].style.pointerEvents="none";
        gameStat[index]=currentPlayer;
        btnNewGame.classList.add("active");
        turnChange();
        gameInfo.innerText=`Current Player - ${currentPlayer}`;
        
        checkWinner();
    }
}

function turnChange(){
    if(currentPlayer==="X"){
        currentPlayer="O"
    }
    else{
        currentPlayer="X";
    }
}

function checkWinner(){
    let answer="";
    winposition.forEach((positon)=>{
        if((gameStat[positon[0]]!="" || gameStat[positon[1]]!="" || gameStat[positon[2]]!="")&&((gameStat[positon[0]]===gameStat[positon[1]])&&(gameStat[positon[1]]===gameStat[positon[2]]))){
            if(gameStat[positon[0]]==="X")
            answer="X";
            else
            answer="O";

        boxes.forEach((box)=>{
            box.style.pointerEvents="none";
        })
        
        boxes[positon[0]].classList.add("win");
        boxes[positon[1]].classList.add("win");
        boxes[positon[2]].classList.add("win");
        }
    })
    if(answer!==""){
        gameInfo.innerText=`Winner - ${answer}`;
        popTab.innerText=`Winner - ${answer}`;
        popTab.classList.add("active");
        btnNewGame.classList.add("active");
        return;
    }

    let countentry=0;
    gameStat.forEach((box)=>{
        if(box!=="")
        countentry++;
    })
    if(countentry===9){
        gameInfo.innerText=`TIE!!!!`;
        popTab.innerText=`TIE!!!!`;
        popTab.classList.add("active");
        btnNewGame.classList.add("active");
        return;
    }

}
btnNewGame.addEventListener('click',()=>initGame());
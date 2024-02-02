const boxs=document.querySelectorAll('.box');
const statusTxt=document.querySelector('#status');
const btnRestart=document.querySelector('#restart');

let x="<img src='./images/x.png'>"; 
let o="<img src='./images/o.png'>";

const win=[
    
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

]

let options=["","","","","","","","",""];
let currentPlayer=x;
let running=false;
let player="X";
init();

function init(){
   boxs.forEach(box=>box.addEventListener('click',boxClick));
   btnRestart.addEventListener('click',restartGame);
   statusTxt.textContent=`${player} Your Turn`;
   running=true;
}

function boxClick(){
     const index=this.dataset.index; 
     if(options[index]!="" || !running){
        return;
     }

     updateBox(this,index);
     checkWinner();
}

function updateBox(box,index){
     options[index]=player;
     box.innerHTML=currentPlayer;

}

function chengePlayer(){
    player=(player=='X') ? "O" : "X";
    currentPlayer=(currentPlayer==x) ? o : x;
    statusTxt.textContent=`${player} Your Turn`;
}

function checkWinner(){
    let isWon=false;
    for(let i=0;i<win.length;i++){
        const condition=win[i];
        const box1=options[condition[0]];
        const box2=options[condition[1]];
        const box3=options[condition[2]];
        if(box1=="" || box2=="" || box3==""){
            continue;
        }
        if(box1==box2 && box2==box3){
            isWon=true;
            boxs[condition[0]].classList.add('win');
            boxs[condition[1]].classList.add('win');
            boxs[condition[2]].classList.add('win');
        }
    }
    if(isWon){
        statusTxt.textContent=`${player} Won`
        running=false;
    }else if(!options.includes("")){
      statusTxt.textContent=`Game Draw...!`
      running=false;
    }else{
        chengePlayer();
    }
}

function restartGame(){
      options=["","","","","","","","",""];
      currentPlayer=x;
      running=true;
      player="X";
      statusTxt.textContent=`${player} Your Turn`;

      boxs.forEach(box=>{
        box.innerHTML="";
        box.classList.remove('win');
      })
}
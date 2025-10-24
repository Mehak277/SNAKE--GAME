//game constants
let inputDir={x:0,y:0};
const foodsound=new Audio('foodsound.mp3');
const gameover=new Audio('gameover.mp3');
const movesound= new Audio('movesnake.mp3')
let speed=5;
let lastPaintTime=0
let snakearr=[
    { x:13,y:15}
]
let food={x:2,y:3};
let score=0;
let a=2;
let b=16


//game functions


function main(ctime){
    window.requestAnimationFrame(main);
     //console.log(ctime);
    if((ctime-lastPaintTime)/1000<1/speed){
      return ;
    }
    lastPaintTime=ctime;
    gameEngine();
    
}



function isCollide(sarr){
    //if snake comes into itself
    for (let i = 1; i <snakearr.length; i++) {
      if(snakearr[i].x===snakearr[0].x && snakearr[i].y===snakearr[0].y){
        return true;
      }
       
    }
    //if it bump ijnto the wall
     if(snakearr[0].x>=18 || snakearr[0].x<=0 || snakearr[0].y>=18 || snakearr[0].y<=0){
          return true;
      }
   return false;
     

}



function gameEngine(){
    //part 1: updating the snake array & food
      if(isCollide(snakearr)){
        gameover.play();
        inputDir={x:0,y:0};
        alert("Game Over: Play any key to play again");
        snakearr=[{x:13,y:15}]
        score=0;
      }
      //if you have eaten the food increase the score ND REGENERATE THE FOOOD

      if(snakearr[0].y==food.y && snakearr[0].x==food.x){
        foodsound.play()
        score++;
        if(highscoreval<score){
          highscoreval=score;
          localStorage.setItem("highscore",JSON.stringify(highscoreval))
            highscorebox.innerHTML="High Score "+ highscoreval;
        }
        scoreBox.innerHTML="Score :"+ score;
        snakearr.unshift({x:snakearr[0].x+inputDir.x,y:snakearr[0].y+inputDir.y})
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
           
      }
      //moving the snake (updating the )
      for (let i = snakearr.length-2; i>=0; i--) {
        snakearr[i+1]={...snakearr[i]}      // to  create a new object
      }
      snakearr[0].x+=inputDir.x;
      snakearr[0].y+=inputDir.y;


    //part2:
    //display the snake
     board.innerHTML="";
     snakearr.forEach((e,index) => {
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
       
        if(index==0){
            snakeElement.classList.add("head")
        }
        else{
           snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

     });
     // display the  food
         foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);


}



//Main Logic starts here 
let highscoreval=0;
highscorebox.innerHTML="High Score "+0;
let highscore=localStorage.getItem("highscore");
if(highscore===null){
  highscoreval=0;
  localStorage.setItem("highscore",JSON.stringify(highscore))
}else{
  highscoreval=JSON.parse(highscore)
  highscorebox.innerHTML="High Score "+ highscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
   inputDir={x:0,y:1}  //start the game
   movesound.play();
   switch(e.key){
    case"ArrowUp":
         console.log("ArrowUp");
         inputDir.x=0;
         inputDir.y=-1;
         break;
    case"ArrowDown":
         console.log("ArrowDown");
          inputDir.x=0;
         inputDir.y=1;
         break; 
    case"ArrowLeft":
         console.log("ArrowLeft");
          inputDir.x=-1;
         inputDir.y=0;
         break; 
    case"ArrowRight":
         console.log("ArrowRight");
        inputDir.x=1;
         inputDir.y=0;
         break;
    default:
        break;
   }
});
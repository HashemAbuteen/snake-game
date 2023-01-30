//dynamic size of the board 
const size = {height:20 , width:20};

//the board element
const board = document.getElementById("board");

//generate the board
for(let i = 0 ; i < size.height ; i++){
    const row = document.createElement("div");
    board.appendChild(row);
    row.classList.add("row");
    for(let j=0 ; j< size.width ; j++){
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = "cell-" +i + "-" + j;
        cell.x = i;
        cell.y = j;
        row.appendChild(cell);
    }
}


//generate the snake head in the middle of the board
let y = Math.floor(size.height/2);
let x = Math.floor(size.width/2);
const snake = {length: 2 , x , y };
snake.headCell = document.getElementById("cell-"+snake.x+"-"+snake.y);
snake.headCell.classList.add("snake-head");

//these four functions changes the location of the head in four directions
const moveUp = ()=> {
    if(snake.headCell.x == 0){
        lose();
    }
    else{
        snake.x--;
        move();
    }
}
const moveDown = ()=> {
    if(snake.headCell.x == size.height-1){
        lose();
    }
    else{
        snake.x++;
        move();
    }
}

const moveRight = ()=> {
    if(snake.headCell.y == size.height-1){
        lose();
    }
    else{
        snake.y++;
        move();
    }
}
const moveLeft = ()=> {
    if(snake.headCell.y == 0){
        lose();
    }
    else{
        snake.y--;
        move();
    }
}

//event lisner
document.addEventListener("keydown" , (e)=> {
    if(e.key === "ArrowUp"){
        moveUp();
    }
    else if (e.key === "ArrowDown"){
        moveDown();
    }
    else if (e.key === "ArrowRight"){
        moveRight();
    }
    else if (e.key === "ArrowLeft"){
        moveLeft();
    }
});

//this function decide what to do when player lose
const lose = ()=>{
    console.log("You lost");
}


//this function moves the snake
const move = ()=> {
    //remove head class from old head
    snake.headCell.classList.remove("snake-head");
    //snake was changed in moveUp , moveDown , ... 
    //so we get the new head based on new location
    const newHead = getHeadCell(snake);
    newHead.classList.add("snake-head");

    //checks if the location we are moving to has food
    //then increse snake length and create a new food
    if(newHead.classList.contains("food")){
        newHead.classList.remove("food");
        generateFood();
        snake.length++;
    }
    
    //get all body cells then iterate on them and increase the tailIndex
    //tailIndex is the distance between the snake head and the snake body part
    //if the tail index is equal to the snake length then 
    //the cell shouldn't be a body part anymore
    const bodyCells = document.querySelectorAll(".snake-body");
    bodyCells.forEach((cell) => {
        if(cell.tailIndex === snake.length-1){
            cell.classList.remove("snake-body");
            cell.tailIndex = -1;
        }
        else {
            cell.tailIndex++;
        }
    });
    if(newHead.classList.contains("snake-body")){
        lose();
    }

    
    //declare the old head as snake body and set the tailIndex to zero
    snake.headCell.classList.add("snake-body");
    snake.headCell.tailIndex = 0;
    snake.headCell = newHead;
}

//generic function to get a cell based on its coordinates
const getCell = (x , y) => {
    return document.getElementById("cell-"+x+"-"+y);
}

//function to get the snake head
const getHeadCell = ()=> {
    return document.getElementById("cell-"+snake.x+"-"+snake.y);
}

//function to generate food in a random place
//the random place shpuld't be a body part or a body cell
const generateFood = ()=> {
    let foodCell;
    while(!foodCell){
        let x = Math.floor(Math.random()*size.width);
        let y = Math.floor(Math.random()*size.height);
        const cell = getCell(x,y);
        if(!cell.classList.contains("snake-body") && !cell.classList.contains("snake-head")){
            foodCell = cell;
            cell.classList.add("food");
        }
    }
}

generateFood();



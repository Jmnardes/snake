// snake game with js and canvas

const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');


// creating unit
const u = 32;


// creating snake on the center
let snake = [];

snake[0] = {
    x : 9 * u,
    y : 10 * u
};


// creating fruit
let fruitLoc = {
    x : Math.floor(Math.random()*17+1) * u,
    y : Math.floor(Math.random()*15+3) * u
}


// score
let sc = 0;
function score(sc) {
    ctx.fillStyle = 'white';
    ctx.fillRect(48, 12, u*2, u*2);

    sc++;

    ctx.fillStyle = 'black';
    ctx.font = '45px Changa one';
    ctx.fillText(sc, 2 * u, 1.6 * u);
    return sc;
}

// high score
let hs = 0;
function highScore(score){
    if ( score > hs ){
        ctx.fillStyle = 'white';
        ctx.fillRect(498, 12, u*2, u*2);

        ctx.fillStyle = 'black';
        ctx.font = '45px Changa one';
        ctx.fillText(score, 16*u, 1.6*u);

        hs = score;
    }
}


// snake control
let d;


// create ground
function ground() {
    ctx.fillStyle = 'white';
    ctx.fillRect(32, 96, 544, 480);

    ctx.strokeStyle = 'black';
    ctx.strokeRect(32, 96, 544, 480);
}


// showing dead
function dead() {
    ctx.fillStyle = 'red';
    ctx.fillRect(32, 96, 544, 480);

    ctx.fillStyle = 'black';
    ctx.font = '45px Changa one';
    ctx.fillText('You Died', 7 * u, 10.5 * u);
}


// keys for direction
document.addEventListener('keydown', direction);

function direction(e){
    let key = e.keyCode;

    if( key == 37 && d != 'RIGHT') {
        d = 'LEFT';
    } else if( key == 38 && d != 'DOWN' ) {
        d = 'UP'
    } else if( key == 39 && d != 'LEFT' ) {
        d = 'RIGHT'
    } else if( key == 40 && d != 'UP' ) {
        d = 'DOWN'
    }
}


// check collision
function collision(head, array) {

    for( let i = 0; i < array.length; i++ ) {
        if( head.x == array[i].x && head.y == array[i].y ) {
            return true;
        }
    }
    return false;
}


// drawing everything on canvas
function draw(){

    ground();

    for( let i = 0; i < snake.length; i++ ) {
        ctx.fillStyle = 'black';
        ctx.fillRect(snake[i].x, snake[i].y, u, u); // dimensions ( axis x, axis y, width, height)
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(fruitLoc.x, fruitLoc.y, u, u);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    // which direction
    if( d == 'LEFT' ) snakeX -= u;
    if( d == 'UP' ) snakeY -= u;
    if( d == 'RIGHT' ) snakeX += u;
    if( d == 'DOWN' ) snakeY += u;
    

    // if the snake eats the food
    if( snakeX == fruitLoc.x && snakeY == fruitLoc.y ){
        sc = score(sc);
        fruitLoc = {
            x : Math.floor(Math.random()*17+1) * u,
            y : Math.floor(Math.random()*15+3) * u
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }


    // add new head
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    
    // game over
    if( snakeX < u || snakeX > 17 * u || snakeY < 3 * u || snakeY > 17 * u || collision(newHead, snake) ) {
        clearInterval(tempo);
        dead();
        highScore(sc);
    }

    snake.unshift(newHead);

    ctx.fillStyle = 'black';
    ctx.font = '45px Changa one';
    ctx.fillText(sc, 2 * u, 1.6 * u);
}

let tempo = 0;
function game() {
    tempo = setInterval(draw, 100);
}

game();
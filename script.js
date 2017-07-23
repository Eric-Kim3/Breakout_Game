var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');


var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleH = 10;
var paddleW = 75;
var paddleX = (canvas.width - paddleW)/2;
var rightPress = false;
var leftPress = false;
var brickRowCount = 3;
var brickColCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var bricks = [];
var lives = 3;

for (c=0; c< brickColCount; c++){
    bricks[c] = [];
    for (r=0; r<brickRowCount; r++){
        bricks[c][r] = {x: 0, y:0, status: 1}
    }
}





document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e){
    if(e.keyCode == 39)
        rightPress = true;
    else if(e.keyCode == 37){
        leftPress = true;
    }
}
function keyUpHandler(e){
    if(e.keyCode == 39)
        rightPress = false;
    else if(e.keyCode == 37){
        leftPress = false;
    }
}
function collisionDetection() {
    for(c=0; c<brickColCount; c++){
        for(r=0; r<brickRowCount; r++){
            var b = bricks[c][r];
            if(b.status == 1){
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y + brickHeight){
                    dy = -dy;
                    b.status = 0;
                    score ++;
                }
            }
                
            if(score == brickColCount * brickRowCount){
                alert("YOU WIN!")
                document.location.reload();
            }
            
        }
    }
}

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " +score, 8,20);
}
function drawLives(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " +lives, canvas.width-65,20);
}
function draw() {
    // drawing code
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();
    drawLives();
    
    if(y + dy < 10 ){ dy = -dy; }
    else if(y + dy > canvas.height-10){
        if(x > paddleX && x < paddleX + paddleW && y >= paddleH + 10){
            dy = -dy;
        }
        else{
            lives--;
            if(!lives){
                alert("GAME OVER");
                document.location.reload();
            }
            else{
                x = canvas.width/2
                y = canvas.height-30;
                dx=2;
                dy=-2;
                paddleX = (canvas.width - paddleW)/2;
            }
        }
        
    }
    if(x + dx < 10 || x + dx > canvas.width-10){ dx = -dx; }
    
    if(rightPress && paddleX < canvas.width-paddleW) { paddleX += 7;}
    else if(leftPress && paddleX > 0) { paddleX -= 7;}
    
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

function drawBricks(){
    for(c=0; c< brickColCount; c++){
        for(r=0; r< brickRowCount; r++){
            if(bricks[c][r].status == 1){
                var bX = (c *(brickWidth + brickPadding)) + brickOffsetLeft;
                var bY = (r *(brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = bX;
                bricks[c][r].y = bY;

                ctx.beginPath()
                ctx.rect(bX, bY, brickWidth, brickHeight);
                ctx.fillStyle = "#0096DD";
                ctx.fill()
                ctx.closePath();
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0, Math.PI*2 );
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle(){
    ctx.beginPath()
    ctx.rect(paddleX, canvas.height-paddleH, paddleW, paddleH);
    ctx.fillStyle = "#0096DD";
    ctx.fill()
    ctx.closePath();
}

document.addEventListener("mousemove", mouseMoveHandler);
function mouseMoveHandler(e){
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX - paddleW/2> +0 && relativeX + paddleW/2 < canvas.width){
        paddleX = relativeX - paddleW / 2;
    }
}

draw();

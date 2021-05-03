var ball;
var database, position;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,15,15);
    ball.shapeColor = "red";

    database = firebase.database();
    position = database.ref("ball");
    position.on("value",readPosition,showError);
}

function draw(){
    background("grey");
    if(keyDown(LEFT_ARROW)){
        writePosition(-3,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(3,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-3);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+3);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function writePosition(x,y){
    database.ref("ball").set({
        'x':position.x+x,
        'y':position.y+y
    })
}

function readPosition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
    console.log("error")
}


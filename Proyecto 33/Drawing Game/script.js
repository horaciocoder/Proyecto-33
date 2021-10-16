var canvas;
var pen;
var drawedSpace;
var penColor;
var penPath;
var mouse;
var balls = [];
var cons = [];
var amount;
var score = 1000;
var won;
var gameState;
function setup() {
    canvas = new Canvas(screen.width, screen.height);
    penColor = "black";
    drawedSpace = [];
    mouse = new Mouse();
    amount = 10;
    for (var i = 0; i < amount; i++) {
        balls.push(physics.circle(random(50,canvas.width - 50), random(50, canvas.height - 50), 30, {isStatic: true, restitution: 1}));
    }
    /*for (var i = 0; i < balls.length - 1; i++) {
        var e = i + 1;
        cons.push(physics.restriction(balls[i].body, balls[e].body, null, null, 0.06, 70));
    }*/
    gameState = "pause";
}
function draw() {
    style.noStrokeColor();
    canvas.color(colorStock.rgb(255, 255, 0));
    style.fillColor(penColor);
    pen = shape.circle(mouseX, mouseY, 14);
    if (input.mousePressed("left")) {
        penPath = physics.circle(mouseX, mouseY, 7, {isStatic: true});
        penPath.color = penColor;
        drawedSpace.push(penPath);
    }
    for (var i = 0; i < drawedSpace.length; i++) {
        drawedSpace[i].display();
    }
    style.fillColor("blue");
    if (input.keyWentPressed("space")) {
        for (var i = 0; i < balls.length; i++) {
            physics.setStatic(balls[i].body, false);
            gameState = "play";
        }
    }
    for (var i = 0; i < balls.length; i++) {
        if (balls[i] != null) {
        balls[i].display();
        }
    }
    /*for (var i = 0; i < cons.length; i++) {
        cons[i].display();
        console.log(`Elemento ${i} = ${cons[i]}`);
    }*/
    for (var i = 0; i < balls.length; i++) {
        if (balls[i] != undefined && balls[i].body.position.y > canvas.height + 15) {
            balls.splice(balls[i]);
        }
    }
    score = balls.length;
    console.log(score);
    if (score === 0) {
        textAlign(CENTER);
        textSize(50);
        text("You Lose!", canvas.width / 2, canvas.height / 4);
    }
    else if (gameState === "play" && frameCount % 200 === 0 && score === 10) {
        won = true;
    }
    if (won === true) {
        textAlign(CENTER);
        textSize(50);
        text("You Win!", canvas.width / 2, canvas.height / 4);
    }
}
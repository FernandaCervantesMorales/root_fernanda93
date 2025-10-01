var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
document.querySelector("#gameBox").appendChild(canvas);

//Load sprites
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.src = "img/background.png";
bgImage.onload = function () {
	bgReady = true; 
};

var winReady = false;
var winImage = new Image(); 
winImage.src = "img/win.png"; 
winImage.onload = function () {
	winReady = true; 
};

var playerReady = false;
var playerImage = new Image(); 
playerImage.src = "img/player.png"; 
playerImage.onload = function () {
	playerReady = true; 
};

var goodyReady = false;
var goodyImage = new Image(); 
goodyImage.src = "img/goody.png"; 
goodyImage.onload = function () {
	goodyReady = true; 
};

var baddieReady = false;
var baddieImage = new Image();
baddieImage.src = "img/baddie.png";
baddieImage.onload = function(){
    baddieReady = true;
};

var loseReady = false;
var loseImage = new Image();
loseImage.src = "img/lose.png";
loseImage.onload = function () {
	loseReady = true;
};

//global game objects 
var player = {
	speed: 5, // movement in pixels per second 
	width: 32,
	height: 32
};
var goodies = [ 
	{ width: 32, height: 32 },
	{ width: 32, height: 32 },
	{ width: 32, height: 32 }
];
var baddies = [];

var gameOver;

var vX = 0;
var vY = 0;

//keyboard controls
addEventListener("keydown", function (e) {
	
	if (e.keyCode == 38) { // UP
		vX = 0;
		vY = -player.speed;
	}
	if (e.keyCode == 40) { // DOWN
		vX = 0;
		vY = player.speed;
	}
	if (e.keyCode == 37) { // LEFT
		vX = -player.speed;
		vY = 0;
	}
	if (e.keyCode == 39) { // RIGHT
		vX = player.speed;
		vY = 0;
	}
	if (e.keyCode == 32) { // STOP spacebar
		vX = 0;
		vY = 0;
	}
}, false);

// Handle touch controls
addEventListener("touchstart", function (e) {
	if (e.target.id == "uArrow") { // UP
		vX = 0;
		vY = -player.speed;
	}
	else if (e.target.id == "dArrow") { // DOWN
		vX = 0;
		vY = player.speed;
	}
	else if (e.target.id == "lArrow") { // LEFT
		vX = -player.speed;
		vY = 0;
	}
	else if (e.target.id == "rArrow") { //RIGHT
		vX = player.speed;
		vY = 0;
	}
	else { // STOP This stops if you touch anywhere else
		vX = 0;
		vY = 0;
	}
});

//Set initial state
var init = function () {
	
	player.x = (canvas.width - player.width) / 2; 
	player.y = (canvas.height - player.height) / 2;
	 
	for (var i in goodies) {
		goodies[i].x = (Math.random() * 
			(canvas.width - goodies[i].width));
		goodies[i].y = (Math.random() * 
			(canvas.height - goodies[i].height));
	}

	for (var i in baddies){
        baddies[i].y = (Math.random() *
            (canvas.height - baddies[i].height));
        baddies[i].x = canvas.width; //start goodies at the top
    }
    gameOver=false;
    pts = 0;
};


// loop
var main = function () {
	//spawns randomly
    if (Math.random() > 0.99) {
        spawnBaddie();
         //the function that generates a new goodie, line 214
	}
	if (checkWin()) {
		
		if (winReady) {
			//ctx.drawImage(winImage, 0, 0);
			ctx.drawImage(winImage, 
				(canvas.width-winImage.width)/2, 
				(canvas.height-winImage.height)/2);
		}
	}
	if (gameOver) {
        //LOSE display lose frame
        if (loseReady) {
            ctx.drawImage(loseImage, (canvas.width - loseImage.width) / 2,
                (canvas.height - loseImage.height) / 2);
        }
        //if (loseAudioReady) {
            //bgAudio.pause();
            //loseAudio.play();
        //}
     }
	else {
		
		if (player.x > 0 && 
			player.x < canvas.width - player.width) {
			player.x += vX;
		}
		else {
			player.x -= vX;
			vX = -vX; //bounce
		}
		if (player.y > 0 && 
			player.y < canvas.height - player.height) {
			player.y += vY
		}
		
		else {
			player.y -= vY;
			vY = -vY; //bounce
		}
		//check collisions
		for (var i in goodies) {
			
			if (checkCollision(player,goodies[i])) {
				goodies.splice(i,1);
			}
		}
		for (var i in baddies){
            baddies[i].x--;
            if (checkCollision(player,baddies[i])) {
				gameOver = true; /// Game is Over
            }
        }
       

		render();
		window.requestAnimationFrame(main);
	}
};

var render = function () {
	if (bgReady) {
		ctx.fillStyle = ctx.createPattern(bgImage, 'repeat');
		ctx.fillRect(0,0,canvas.width,canvas.height);
	}
	if (playerReady) {
		ctx.drawImage(playerImage, player.x, player.y);
	}
	if (goodyReady) {
		for (var i in goodies) {
			ctx.drawImage(goodyImage, goodies[i].x, goodies[i].y);
		}
	}
	if (baddieReady){
        for (var i in baddies){
            ctx.drawImage(baddieImage, baddies[i].x, baddies[i].y);
        }
    }

	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.fillText("Items left: "+goodies.length, 32, 32);
};

var checkCollision = function (obj1,obj2) {
	if (obj1.x < (obj2.x + obj2.width) && 
		(obj1.x + obj1.width) > obj2.x && 
		obj1.y < (obj2.y + obj2.height) && 
		(obj1.y + obj1.height) > obj2.y
		) {
			return true;
	}
};

var checkWin = function () {
	if (goodies.length > 0) { 
		return false;
	} else { 
		return true;
	}
};

var render_end = function () {
    if (bgReady) {
		ctx.drawImage(bgImage, b, canvas.height-bgImage.height);

        // Set the initial x-coordinate for drawing
        let x = b;

        // Repeat the drawing of the background image along the x-axis
        while (x < canvas.width) {
            ctx.drawImage(bgImage, x, canvas.height - bgImage.height);
            x += bgImage.width - 5; // Adjust this value to control the overlap
            ctx.drawImage(bgImage, x, canvas.height - bgImage.height);
        }
        document.getElementById("lose").style.display="block";
	}
};

var spawnBaddie = function () {
	//push() adds an item to the array, a new goodie
	baddies.push({
		//We need to set the new goodie’s init properties
		width: 32,
		height: 32,

		//and place it at a random position at the top
		x: canvas.width,
		y: (Math.random() * (canvas.height - 100))
	});
};

init();
window.requestAnimationFrame(main);
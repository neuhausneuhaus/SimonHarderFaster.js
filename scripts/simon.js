console.log("js&html are all linked up");

//computerSequence: starts as blank array
var computerSequence = [];

//function that randomly generates next comp color, and adds it to computerSequence array.
var generateNextCompColor = function(){
	var nextMoveValue = Math.floor((Math.random() *4)+1);
	var nextMove = "";
	if (nextMoveValue === 1){
		nextMove = "r";
	} else if (nextMoveValue === 2){
		nextMove = "y";
	} else if (nextMoveValue === 3){
		nextMove = "g";
	} else if (nextMoveValue === 4){
		nextMove = "b";
	}
	computerSequence.push(nextMove);
	console.log(computerSequence);
};

//Object containing Player data
var Player = function Player(){
	this.playerAlive = true;
	this.playerSequence = [];
	this.name = window.prompt("What is your name?");
	this.endScore = 0;
};

//new BLANK player
// var player = new Player;


var $roundCount = $("#roundCount");
//prototype for Player Object:
// -- checks if each step of playerSequence is correct so far.
// -- If more than 0 steps in array is wrong, Player.isAlive becomes false
// -- If playersequence length is same as comp length
	//-- window.alert to start next level
// (To be run at every player press)
Player.prototype.isCorrect = function(){
	var incorrectSteps = 0;
	for (var i=0; i<this.playerSequence.length; i++){
		console.log("this.playerSequence[i]: "+this.playerSequence[i]);
		console.log("computerSequence[i]: "+computerSequence[i]);
		if (this.playerSequence[i]!= computerSequence[i]){	
			incorrectSteps += 1;
			console.log("incorrectSteps: "+incorrectSteps);
		} 
	}	
		if (incorrectSteps > 0){
			gameOver();
	} else if (this.playerSequence.length === computerSequence.length) {
		this.playerSequence = [];
		generateNextCompColor();
		$roundCount.text("Round: " + (computerSequence.length - 1)); //updates the roundCounter
		window.setTimeout(function(){flashASequence(computerSequence);} , 1100);
	
	}

};
// Hall of Fame Entry Func
	$hallOl = $("#hall");
	hallArray = [];
var enterHoF = function(){
hallArray.push(player); //pushes entire player object (inlcudes .name and .endScore) to an array
hallArray.sort(function(a,b) {return parseFloat(a.endScore) - parseFloat(b.endScore);}); //sorts that array by the .endScore of each player item
hallArray.reverse();
$hallOl.empty(); //empties the current HoF ol
//vvvvv//loop that renders each index of HoF array, and enters it as a li in the HoF ol.
for (var i =0; i<hallArray.length; i++){ 
var $score = $("<li></li>").text(hallArray[i].name + ": " + hallArray[i].endScore+" points");
$hallOl.append($score);
}
};

//GAME OVER FUNCTION
//--resets sequences
//--START button reappears.
var gameOver = function(){
	player.endScore = (computerSequence.length - 1);
	enterHoF();
	player.playerSequence = [];
	computerSequence = [];
	incorrectSteps = 0;
	$roundCount.text("");
	over1.play();
	window.setTimeout(function(){over2.play();} , 1);
	window.alert("GAME OVER. Click START to try again.");
	$startButton.css("visibility", "visible");
};

//func that flashes"this" box on , then off.
// should work for both clicks and callouts
var flashes = function(box){
	box.toggleClass("lit");
	setTimeout(function(){
		box.toggleClass("lit");}, 500);
};

// function to flash latest computer sequence

var fruitLoops = function(n, seq){
            window.setTimeout(function(){
                
                if (seq[n] === "r"){
                	flashes($box1);
                	workIt1.play();
                } else if (seq[n] === "y"){
                	flashes($box2);
                	makeIt1.play();
                } else if (seq[n] === "g"){
                	flashes($box3);
                	harder1.play();
                } else if (seq[n] === "b"){
                	flashes($box4);
                	faster1.play();
                }
                
            }, (n * 1250));
        };

var flashASequence = function(seq){
	for (var i = 0; i < seq.length; i++) {
        fruitLoops(i, seq);
    }
};

flashASequence(computerSequence);




//sets up "box"s and "boxOn"s as jquery variables
var $box1 = $("#box1");
var $box2 = $("#box2");
var $box3 = $("#box3");
var $box4 = $("#box4");
var $startButton = $("#startButton");

//events for START button
// --generates first CompColor
// ++button fades away?
$startButton.click(function(){
	console.log("START!");
	player = new Player();
	generateNextCompColor();
	flashASequence(computerSequence);
	$startButton.css("visibility", "hidden");
});

//audioElements
var workIt1 = new Audio('audio/WorkIt1.mp3');
var workIt2 = new Audio('audio/WorkIt2.mp3');
var makeIt1 = new Audio('audio/MakeIt1.mp3');
var makeIt2 = new Audio('audio/MakeIt1.mp3');
var harder1 = new Audio('audio/Harder1.mp3');
var harder2 = new Audio('audio/Harder2.mp3');
var faster1 = new Audio('audio/Faster1.mp3');
var faster2 = new Audio('audio/Faster2.mp3');
var over1 = document.getElementById("over1");
var over2 = new Audio('audio/Over2.mp3');

//adds click-eventListeners to each box that:
// --"flashes" that box
// --pushes that color to the playerSequence
// --runs.isCorrect

$box1.click(function(){
	console.log("Red click!");
	flashes($box1);
	workIt2.play();
	console.log($box1);
	player.playerSequence.push("r");
	player.isCorrect();
	console.log("last player sequence: "+player.playerSequence);
	// generateNextCompColor();
	// flashASequence(computerSequence);
});
$box2.click(function(){
	console.log("Yellow click!");
	flashes($box2);
	makeIt2.play();
	player.playerSequence.push("y");
	player.isCorrect();
	console.log("last player sequence: "+player.playerSequence);
	// generateNextCompColor();
	// flashASequence(computerSequence);
});
$box3.click(function(){
	console.log("Green click!");
	flashes($box3);
	harder2.play();
	player.playerSequence.push("g");
	player.isCorrect();
	console.log("last player sequence: "+player.playerSequence);
	// generateNextCompColor();
	// flashASequence(computerSequence);
});
$box4.click(function(){
	console.log("Blue click!");
	flashes($box4);
	faster2.play();
	player.playerSequence.push("b");
	player.isCorrect();
	console.log("last player sequence: "+player.playerSequence);
	// generateNextCompColor();
	// flashASequence(computerSequence);
});



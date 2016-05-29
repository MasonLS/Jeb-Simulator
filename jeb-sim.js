var score = 0;

var highScore = findHighScore();

function findHighScore() {
	var hs = "0 (nobody)";
	for (i in localStorage) {
		if (hs < localStorage[i]) {
			hs = localStorage[i] + " (" + i + ")";
		};
	};
	return hs;
}


var energy_quotes = [
	"Ok, now this is ridiculous.", 
	"My brother was building a security apparatus to keep us safe, and I'm proud of what he did.", 
	"He's had the gall to go after my mother.", 
	"My mom is the strongest woman I know.",
	"I'm not going to invite Donald to the rally in Charleston on Monday afternoon."];

var corruption_message = "<p id=\"message\">OhhO, noon!! TooooT muchhcum corruptionnoitpurroc!!!!corruptionnoitpurroc muchhcum TooooT !!noon , OhhO<br><br>(You become two Jeb!s, facing each other, tips of your noses painfully and inseparably fused. On the back of your head is the face of another Jeb!, blinking centimeters from the surface of a cross between a mirror and a door, et cetera, until infinity.)</p>";

//store current meter values for manipulation
var energy_level = $("#energy").prop("value");
var energy_min = $("#energy").prop("min");
var energy_max = $("#energy").prop("max");

var corruption_level = $("#corruption").prop("value");
var corruption_min = $("#corruption").prop("min");
var corruption_max = $("#corruption").prop("max");

//intialize game state as a boolean to use as switch
var gameOver = false;


//each time you click on The Donald
function clickTrump() {
    //transdimentional corruption decreases
    if (corruption_level>corruption_min) {
		$("#corruption").prop("value", corruption_level-=25);
	};
	//but your precious energy does, too!
	$("#energy").prop("value", energy_level-=15);

	//Don't click too fervently; if you run out of energy, you lose the game.
	if (energy_level<=energy_min) {
		gameEnds("energy");
	};
}
//each time you click on the delicious Nutri-Grain bar
function clickBar() {
	//you get an energy boost! (as long as you're not already not "low-energy")
	if (energy_level<energy_max) {
		$("#energy").prop("value", energy_level+=30);
	};
}
//initiates game by gradually, recursively growing transdimensional corruption
function play() {
	//ends game if corruption exceeds this realm's tolerance
	if (gameOver) {
		return;
	} else if (corruption_level>=corruption_max) {
		setTimeout(function() {
			$("#score").text("Score: "+score+"");
			gameEnds("corruption");
		}, 10);
	} else {
		setTimeout(function() {
			$("#corruption").prop("value", corruption_level+=1);
			score+=1;
			$("#score").text("Score: "+score+"");
			play();
		}, 10);
	};
}


//provides game outcome in form of appropriate message
function gameEnds(outcome) {
	gameOver = true;
	$("#game").hide();

	if (outcome=="energy") {
		$("#message").replaceWith("<p id=\"message\">Oh, no! Your dad-bod ran out of sugars for it to burn!<br><br>You said, \""+getRandomQuote()+"\"");
	} else {
		$("#message").replaceWith(corruption_message);
	};

	$("#final_score").text("Your Score = " + score);
	$("#game_over").show();
	if (newHighScore()) {
		var name = prompt("What's your name?");
		localStorage.setItem(name, score);
		highScore = score.toString() + " (" + name + ")";
	};
	$("#high_score").text("High Score = " + highScore);
}
//var name = document.getElementById("name");

function getRandomQuote() {
	var randomQuote = Math.floor(Math.random()*(energy_quotes.length));
	return energy_quotes[randomQuote];
}

//check if score is new high score
function newHighScore() {
	for (var i in localStorage) {
		if (score < localStorage[i]) {
			return false;
		};
	};
	return true;
}

//resets variables and calls play again
function resetGame() {
	gameOver = false;
	score = 0;
	$("#score").text("Score: "+score+"");
	energy_level = energy_max;
	$("#energy").prop("value", energy_level);
	corruption_level = corruption_min;
	$("#corruption").prop("value", corruption_level);
	$("#game_over").hide();
	$("#game").show();
	play();
}


//buttons and other click events

//click Play! to transition to intro text
$("#title_screen button").click(function() {
	$(this).parent().hide();
	$("#intro").show();
});

//click OK to continue to instructions
$("#intro button").click(function() {
	$(this).parent().hide();
	$("#instructions").show();
});
//click START to begin game
$("#instructions button").click(function() {
	$(this).parent().hide();
	$("#game").show();
	play();
});

//use jQuery to bind to custom functions
$("#trump").click(clickTrump);
$("#n_g_bar").click(clickBar);

//click PLAY AGAIN to play again
$("#game_over button").click(function() {
	$(this).next().prevAll().hide();
	resetGame();});
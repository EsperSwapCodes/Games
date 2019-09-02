//GAME VARIABLES:
var matchTile = [];
var canvasName = document.getElementById("match3game");
var canvasContext = canvasName.getContext("2d");
var rowNumber = 4;
var tileNumber = 20;
var i=0;
var storedTile;
var gameTimer=16000;
var timerRunning=false;
//SITE VARIABLES
var playerMoney=500;
//CANNOT READ GLOBAL MONEY VARIABLE, I THINK IT WILL FIX ITSELF ONCE THE GAME ACTUALLY CHANGES MONEY?
//IMPLEMENT TIMER SYSTEM + PROPER SWAPPING

//GAME FUNCTIONS:
function getMousePosX(canvasContext, event) {
    var rect = canvasName.getBoundingClientRect();
      return (event.clientX - rect.left);
}
function getMousePosY(canvasContext, event) {
    var rect = canvasName.getBoundingClientRect();
      return (event.clientY - rect.top);
}

function randomColor () {
	var tileColor = Math.floor(Math.random() * 6);
	if (tileColor == 0) tileColor = "#4287f5";
	if (tileColor == 1) tileColor = "#42f551";
	if (tileColor == 2) tileColor = "#f5f542";
	if (tileColor == 3) tileColor = "#a742f5";
	if (tileColor == 4) tileColor = "#000000";
	if (tileColor == 5) tileColor = "#8c8c8c";
	return tileColor;
}

function drawGrid() {
	canvasContext.clearRect(0,0,300,400);
	for (i=0; i<tileNumber; i++) {
	canvasContext.fillStyle = matchTile[i].color;
	canvasContext.fillRect((i%rowNumber)*80+10, Math.floor(i/rowNumber)*80+10, 40, 40);
}
}

function generateGrid() {
	for (i=0; i<tileNumber; i++) {
	matchTile[i] = {
		color:randomColor(),
		x:(i%rowNumber)*80+10,
		y:Math.floor(i/rowNumber)*80+10,
		tileI:i,
		widthHeight:40
		}
	}
}

function gameStart () {
	generateGrid();
	setInterval(function() {
		drawGrid();
	}
	, 1);
}
function tileClick(event) {
	var clickXcoord = getMousePosX(canvasContext,event)
	var clickYcoord = getMousePosY(canvasContext,event);
	for (i=0; i<tileNumber;i++) {
	if (clickXcoord < matchTile[i].x+40 && clickXcoord > matchTile[i].x-40 && clickYcoord < matchTile[i].y+40 && clickYcoord > matchTile[i].y-40) {
		var temp;
		storedTile = matchTile[i];
		if ( matchTile[storedTile.tileI+1] != undefined){
		if (storedTile.tileI<tileNumber){
		temp = matchTile[storedTile.tileI]
		matchTile[storedTile.tileI] = matchTile[storedTile.tileI+1];
		matchTile[storedTile.tileI+1] = temp;
		}}
		checkClusters();
		return null;
	}
	}
}
function checkClusters() {
	for (var i=0; i<tileNumber; i++) {
	if (matchTile[i+1].color == matchTile[i].color && matchTile[i-1].color == matchTile[i].color) {
	matchTile[i].color = randomColor();
	matchTile[i+1].color = randomColor();
	matchTile[i-1].color = randomColor();
	}
	if (i>4) {
	if (matchTile[i+rowNumber].color == matchTile[i].color && matchTile[i-rowNumber].color == matchTile[i].color) {
	matchTile[i].color = randomColor();
	matchTile[i+rowNumber].color = randomColor();
	matchTile[i-rowNumber].color = randomColor();
	}
	}
}
}

//WEBSITE FUNCTIONS:
function changeMoney (itemNumber,moneyChange) {
	playerMoney-=moneyChange;
	var x = document.getElementById("item"+itemNumber);
	if (x.style.display === "none") {
		x.style.display = "block";
	}
	else {
		x.style.display = "none";
  }
}
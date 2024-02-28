var numbers = 10000;
var clickMin = 1;
var clickMax = 5;
var clickMinCost = 35;
var clickMaxCost = 65;

var autoClickers = 0;
var autoClickerCost = 100;
var autoClickerMin = 1;
var autoClickerMax = 10;
var autoClickerMinCost = 80;
var autoClickerMaxCost = 50;

console.log("Loaded scripts");
updateUI();

function updateUI() {
	document.getElementById('numbers').innerHTML = numbers;
	
	document.getElementById('clickMin').innerHTML = clickMin;
	document.getElementById('clickMax').innerHTML = clickMax;
	document.getElementById('clickMinCost').innerHTML = clickMinCost;
	document.getElementById('clickMaxCost').innerHTML = clickMaxCost;

	document.getElementById('autoClickers').innerHTML = autoClickers;
	document.getElementById('autoClickerCost').innerHTML = autoClickerCost;
	document.getElementById('autoClickerMin').innerHTML = autoClickerMin;
	document.getElementById('autoClickerMax').innerHTML = autoClickerMax;
	document.getElementById('autoClickerMinCost').innerHTML = autoClickerMinCost;
	document.getElementById('autoClickerMaxCost').innerHTML = autoClickerMaxCost;

	if (clickMin >= clickMax) {
		document.getElementById('clickMinButton').disabled = true;
	} else {
		document.getElementById('clickMinButton').disabled = false;
	}

	if (autoClickerMin >= autoClickerMax) {
		document.getElementById('autoClickerMinButton').disabled = true;
	} else {
		document.getElementById('autoClickerMinButton').disabled = false;
	}
}

// Action functions
function manualClick() {
	numbers = numbers + getRandomInt(clickMin, clickMax);
	updateUI();
}

function autoClicker() {
	if (autoClickers > 0) {
		numbers = numbers + getRandomInt(autoClickerMin, autoClickerMax) * autoClickers;
		updateUI();
	}
}

// Buy functions
function increaseClickMin() {
	if (numbers >= clickMinCost) {
		clickMin += 1;
		numbers -= clickMinCost;
	}

	clickMinCost = clickMinCost + Math.floor(10 * Math.pow(1.5, clickMin));
	updateUI();
}

function increaseClickMax() {
	if (numbers >= clickMaxCost) {
		clickMax += 1;
		numbers -= clickMaxCost;
	}

	clickMaxCost = clickMaxCost + Math.floor(10 * Math.pow(1.4, clickMax));
	updateUI();
}

function buyAutoClicker() {
	if (numbers >= autoClickerCost) {
		autoClickers += 1;
		numbers -= autoClickerCost;
	}

	autoClickerCost = autoClickerCost + Math.floor(500 * Math.pow(1.75, autoClickers + 1));
	updateUI();
}

function increaseAutoClickerMin() {
	if (numbers >= autoClickerMinCost) {
		autoClickerMin += 1;
		numbers -= autoClickerMinCost;
	}

	autoClickerMinCost = autoClickerMinCost + Math.floor(10 * Math.pow(1.5, autoClickerMin));
	updateUI();
}

function increaseAutoClickerMax() {
	if (numbers >= autoClickerMaxCost) {
		autoClickerMax += 1;
		numbers -= autoClickerMaxCost;
	}

	autoClickerMaxCost = autoClickerMaxCost + Math.floor(10 * Math.pow(1.4, autoClickerMax));
	updateUI();
}

// Loop
window.setInterval(function() {
	autoClicker();
	updateUI();
}, 1000);

// Utility functions
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;;
}
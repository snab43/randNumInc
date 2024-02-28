var numbers = 0;
var gameSpeed = 1000;
var lastResultsLength = 30;

var clickMin = 1;
var clickMax = 5;
var clickMinCost = 35;
var clickMaxCost = 65;
var clickResults = [];

var autoClickers = 0;
var autoClickerCost = 100;
var autoClickerMin = 1;
var autoClickerMax = 10;
var autoClickerMinCost = 80;
var autoClickerMaxCost = 50;
var autoClickerResults = [];

console.log("Loaded scripts");
updateUI();

function updateUI() {
	document.getElementById('numbers').innerHTML = numberWithCommas(numbers);
	
	document.getElementById('clickMin').innerHTML = numberWithCommas(clickMin);
	document.getElementById('clickMax').innerHTML = numberWithCommas(clickMax);
	document.getElementById('clickMinCost').innerHTML = numberWithCommas(clickMinCost);
	document.getElementById('clickMaxCost').innerHTML = numberWithCommas(clickMaxCost);
	document.getElementById('clickResults').innerText = clickResults.join(", ");

	document.getElementById('autoClickers').innerHTML = numberWithCommas(autoClickers);
	document.getElementById('autoClickerCost').innerHTML = numberWithCommas(autoClickerCost);
	document.getElementById('autoClickerMin').innerHTML = numberWithCommas(autoClickerMin);
	document.getElementById('autoClickerMax').innerHTML = numberWithCommas(autoClickerMax);
	document.getElementById('autoClickerMinCost').innerHTML = numberWithCommas(autoClickerMinCost);
	document.getElementById('autoClickerMaxCost').innerHTML = numberWithCommas(autoClickerMaxCost);
	document.getElementById('autoClickerResults').innerText = autoClickerResults.join(", ");

	// Hidden stuff
	document.getElementById('autoClickerButtons').hidden = autoClickers <= 0;

	// Buttons
	document.getElementById('clickMinButton').disabled = clickMin >= clickMax || clickMinCost > numbers;
	document.getElementById('clickMaxButton').disabled = clickMaxCost > numbers;
	document.getElementById('autoClickerBuyButton').disabled = autoClickerCost > numbers;
	document.getElementById('autoClickerMinButton').disabled = autoClickerMin >= autoClickerMax || autoClickerMinCost > numbers || autoClickers == 0;
	document.getElementById('autoClickerMaxButton').disabled = autoClickerMaxCost > numbers || autoClickers == 0;
}

// Action functions
function manualClick() {
	let newNumber = getRandomInt(clickMin, clickMax);
	numbers += newNumber;
	clickResults.unshift(newNumber);
	if (clickResults.length > lastResultsLength) {
		document.getElementById('clickResultsEllipsis').removeAttribute('hidden');
		clickResults.pop();
	}
	updateUI();
}

function autoClicker() {
	if (autoClickers > 0) {
		let newNumber = getRandomInt(autoClickerMin, autoClickerMax) * autoClickers;
		numbers += newNumber;
		autoClickerResults.unshift(newNumber);
		if (autoClickerResults.length > lastResultsLength) {
			document.getElementById('autoClickerResultsEllipsis').removeAttribute('hidden');
			autoClickerResults.pop();
		}
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
}, gameSpeed);

// Utility functions
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Debug
function debug_increaseNumbers(num) {
	numbers += num;
	updateUI();
}
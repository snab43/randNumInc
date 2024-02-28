// const variables
const LAST_RESULTS_LENGTH = 100;

// stats
let stats = {
	numbers: 0,
	
	clickMin: 1,
	clickMax: 5,
	clickMinCost: 35,
	clickMaxCost: 65,
	clickResults: [],

	autoclickers: 0,
	autoclickerCost: 100,
	autoclickerMin: 1,
	autoclickerMax: 10,
	autoclickerMinCost: 80,
	autoclickerMaxCost: 50,
	autoclickerResults: []
};

// buttons
const clickBtn = document.getElementById('clickBtn');
const clickMinBtn = document.getElementById('clickMinBtn');
const clickMaxBtn = document.getElementById('clickMaxBtn');

const autoclickerBuyBtn = document.getElementById('autoclickerBuyBtn');
const autoclickerMinBtn = document.getElementById('autoclickerMinBtn');
const autoclickerMaxBtn = document.getElementById('autoclickerMaxBtn');

const saveGameBtn = document.getElementById('saveGameBtn');
const loadGameBtn = document.getElementById('loadGameBtn');
const deleteSaveBtn = document.getElementById('deleteSaveBtn');

// ====================================================
// UI Update

function updateUI() {
	document.getElementById('numbers').innerText = numWithCommas(stats.numbers);
	
	document.getElementById('clickMin').innerText = numWithCommas(stats.clickMin);
	document.getElementById('clickMax').innerText = numWithCommas(stats.clickMax);
	document.getElementById('clickMinCost').innerText = numWithCommas(stats.clickMinCost);
	document.getElementById('clickMaxCost').innerText = numWithCommas(stats.clickMaxCost);
	document.getElementById('clickResults').innerText = stats.clickResults.join(", ");

	document.getElementById('autoclickers').innerText = numWithCommas(stats.autoclickers);
	document.getElementById('autoclickerCost').innerText = numWithCommas(stats.autoclickerCost);
	document.getElementById('autoclickerMin').innerText = numWithCommas(stats.autoclickerMin);
	document.getElementById('autoclickerMax').innerText = numWithCommas(stats.autoclickerMax);
	document.getElementById('autoclickerMinCost').innerText = numWithCommas(stats.autoclickerMinCost);
	document.getElementById('autoclickerMaxCost').innerText = numWithCommas(stats.autoclickerMaxCost);
	document.getElementById('autoclickerResults').innerText = stats.autoclickerResults.join(", ");

	// Hidden stuff
	document.getElementById('unlockAutoclickers').hidden = stats.autoclickers <= 0;

	// Disable buttons
	clickMinBtn.disabled = stats.clickMin >= stats.clickMax || stats.clickMinCost > stats.numbers;
	clickMaxBtn.disabled = stats.clickMaxCost > stats.numbers;
	autoclickerBuyBtn.disabled = stats.autoclickerCost > stats.numbers;
	autoclickerMinBtn.disabled = stats.autoclickerMin >= stats.autoclickerMax || stats.autoclickerMinCost > stats.numbers || stats.autoclickers == 0;
	autoclickerMaxBtn.disabled = stats.autoclickerMaxCost > stats.numbers || stats.autoclickers == 0;
}

// ====================================================
// Button functions

clickBtn.addEventListener("click", () => {
	let num = getRandomInt(stats.clickMin, stats.clickMax);
	stats.numbers += num;
	stats.clickResults.unshift(num);
	if (stats.clickResults.length > LAST_RESULTS_LENGTH) {
		stats.clickResults.pop();
	}
	updateUI();
});

clickMinBtn.addEventListener("click", () => {
	if (stats.numbers >= stats.clickMinCost) {
		stats.clickMin += 1;
		stats.numbers -= stats.clickMinCost;
		stats.clickMinCost += Math.floor(10 * Math.pow(1.1, stats.clickMin));
	}
	updateUI();
});

clickMaxBtn.addEventListener("click", () => {
	if (stats.numbers >= stats.clickMaxCost) {
		stats.clickMax += 1;
		stats.numbers -= stats.clickMaxCost;
		stats.clickMaxCost += Math.floor(10 * Math.pow(1.05, stats.clickMax));
	}	
	updateUI();
});

autoclickerBuyBtn.addEventListener("click", () => {
	if (stats.numbers >= stats.autoclickerCost) {
		stats.autoclickers += 1;
		stats.numbers -= stats.autoclickerCost;
		stats.autoclickerCost += Math.floor(25 * Math.pow(1.1, stats.autoclickers));
	}
	updateUI();
});

autoclickerMinBtn.addEventListener("click", () => {
	if (stats.numbers >= stats.autoclickerMinCost) {
		stats.autoclickerMin += 1;
		stats.numbers -= stats.autoclickerMinCost;
		stats.autoclickerMinCost += Math.floor(10 * Math.pow(1.1, stats.autoclickerMin));
	}
	updateUI();
});

autoclickerMaxBtn.addEventListener("click", () => {
	if (stats.numbers >= stats.autoclickerMaxCost) {
		stats.autoclickerMax += 1;
		stats.numbers -= stats.autoclickerMaxCost;
		stats.autoclickerMaxCost += Math.floor(10 * Math.pow(1.05, stats.autoclickerMax));
	}
	updateUI();
});

// ====================================================
// Game initialize
document.addEventListener('DOMContentLoaded', () => {
	loadGame();
	checkSaveExists();
	updateUI();
});

// ====================================================
// Game Loop

window.setInterval(function() {
	// Autoclickers
	for (let i = 0; i < stats.autoclickers; i++) {
		let num = getRandomInt(stats.autoclickerMin, stats.autoclickerMax);
		stats.numbers += num;
		stats.autoclickerResults.unshift(num);

		if (stats.autoclickerResults.length > LAST_RESULTS_LENGTH) {
			stats.autoclickerResults.pop();
		}
	}

	updateUI();
}, 1000);


// ====================================================
// Data Management

function checkSaveExists() {
	const save = localStorage.getItem("save");
	loadGameBtn.disabled = !save;
}

function saveGame() {
	localStorage.setItem("save", JSON.stringify(stats));
	checkSaveExists();
}

function loadGame() {
	const save = JSON.parse(localStorage.getItem("save"));

	if (save) {
		Object.keys(stats).forEach(key => {
			if (typeof save[key] !== "undefined") {
				stats[key] = save[key];
			}
		});
		updateUI();
	} else {
		console.log("No save file found.");
	}
}

saveGameBtn.addEventListener("click", saveGame);
loadGameBtn.addEventListener("click", loadGame);
deleteSaveBtn.addEventListener("click", () => {
	localStorage.removeItem("save");
	location.reload();
});

window.setInterval(function() {
	saveGame();
}, 30 * 1000);

// ====================================================
// Utility functions

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;;
}

function numWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
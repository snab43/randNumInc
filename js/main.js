// const variables
const lastResultsLength = 60;
const unlockPrimeNumbersCost = 400;
const unlockTenNumbersCost = 3000;
const unlockAutoclickersCost = 200;
const unlockSuperAutoclickersCost = 2000;

let gameOver = false;

// stats
let stats = {
	numbers: 0,
	primeNumbers: 0,
	tenNumbers: 0,

	totalNumbers: 0,
	numbersLeft: 1000000,
	totalTime: 0,

	unlockPrimeNumbers: false,
	unlockTenNumbers: false,
	unlockAutoclickers: false,
	unlockSuperAutoclickers: false,
	
	clickMin: 1,
	clickMax: 10,
	clickMinCost: 20,
	clickMaxCost: 30,
	clickResults: [],

	autoclickers: 0,
	autoclickerCost: 100,
	autoclickerMin: 10,
	autoclickerMax: 100,
	autoclickerMinCost: 35,
	autoclickerMaxCost: 25,
	autoclickerResults: [],

	superAutoclickers: 0,
	superAutoclickerCost: 100,
	superAutoclickerMin: 100,
	superAutoclickerMax: 1000,
	superAutoclickerMinCost: 500,
	superAutoclickerMaxCost: 500,
	superAutoclickerResults: []
};

// buttons
const clickBtn = document.getElementById('clickBtn');
const clickMinBtn = document.getElementById('clickMinBtn');
const clickMaxBtn = document.getElementById('clickMaxBtn');

const autoclickerBuyBtn = document.getElementById('autoclickerBuyBtn');
const autoclickerMinBtn = document.getElementById('autoclickerMinBtn');
const autoclickerMaxBtn = document.getElementById('autoclickerMaxBtn');

const superAutoclickerBuyBtn = document.getElementById('superAutoclickerBuyBtn');
const superAutoclickerMinBtn = document.getElementById('superAutoclickerMinBtn');
const superAutoclickerMaxBtn = document.getElementById('superAutoclickerMaxBtn');

const unlockPrimeNumbersBtn = document.getElementById('unlockPrimeNumbersBtn');
const unlockTenNumbersBtn = document.getElementById('unlockTenNumbersBtn');
const unlockAutoclickersBtn = document.getElementById('unlockAutoclickersBtn');
const unlockSuperAutoclickersBtn = document.getElementById('unlockSuperAutoclickersBtn');

const saveGameBtn = document.getElementById('saveGameBtn');
const loadGameBtn = document.getElementById('loadGameBtn');
const deleteSaveBtn = document.getElementById('deleteSaveBtn');

// ====================================================
// UI Update

function updateUI() {
	if (stats.numbersLeft <= 0) {
		if (!gameOver) {
			console.log("Game over!");
			gameOver = true;
			document.getElementById('game').hidden = true;
			document.getElementById('endScreen').hidden = false;
			document.getElementById('finalTime').innerText = formatTime(stats.totalTime);
		}
	};

	// Stats
	document.getElementById('numbers').innerText = numWithCommas(stats.numbers);
	document.getElementById('primeNumbers').innerText = numWithCommas(stats.primeNumbers);
	document.getElementById('tenNumbers').innerText = numWithCommas(stats.tenNumbers);

	document.getElementById('numbersPerSec').innerText = numWithCommas(deltaNumber);
	document.getElementById('primeNumbersPerSec').innerText = numWithCommas(deltaPrimeNumber);
	document.getElementById('tenNumbersPerSec').innerText = numWithCommas(deltaTenNumber);

	document.getElementById('totalNumbers').innerText = numWithCommas(stats.totalNumbers);
	document.getElementById('numbersLeft').innerText = numWithCommas(stats.numbersLeft);
	document.getElementById('totalTime').innerText = formatTime(stats.totalTime);
	
	// Manual Clicks
	// clickMin
	if (isPowerOfTen(stats.clickMin) && stats.unlockTenNumbers) {
		document.getElementById('clickMin').innerHTML = `<span class="tenColor">${numWithCommas(stats.clickMin)}</span>`;
	} else if (isPrime(stats.clickMin) && stats.unlockPrimeNumbers) {
		document.getElementById('clickMin').innerHTML = `<span class="primeColor">${numWithCommas(stats.clickMin)}</span>`;
	} else {
		document.getElementById('clickMin').innerHTML = `${numWithCommas(stats.clickMin)}`;
	}
	// clickMax
	if (isPowerOfTen(stats.clickMax) && stats.unlockTenNumbers) {
		document.getElementById('clickMax').innerHTML = `<span class="tenColor">${numWithCommas(stats.clickMax)}</span>`;
	} else if (isPrime(stats.clickMax) && stats.unlockPrimeNumbers) {
		document.getElementById('clickMax').innerHTML = `<span class="primeColor">${numWithCommas(stats.clickMax)}</span>`;
	} else {
		document.getElementById('clickMax').innerHTML = `${numWithCommas(stats.clickMax)}`;
	}
	document.getElementById('clickMinCost').innerText = numWithCommas(stats.clickMinCost);
	document.getElementById('clickMaxCost').innerText = numWithCommas(stats.clickMaxCost);
	document.getElementById('clickResults').innerHTML = stats.clickResults.map((number) => {
		if (isPowerOfTen(number) && stats.unlockTenNumbers) {
			return `<span style="color: red;">${numWithCommas(number)}</span>`;
		} else if (isPrime(number) && stats.unlockPrimeNumbers) {
			return `<span style="color: blue;">${numWithCommas(number)}</span>`;
		} else {
			return numWithCommas(number);
		}
	}).join(", ");

	// Autoclickers
	document.getElementById('autoclickers').innerText = numWithCommas(stats.autoclickers);
	document.getElementById('autoclickerCost').innerText = numWithCommas(stats.autoclickerCost);
	// autoclickerMin
	if (isPowerOfTen(stats.autoclickerMin) && stats.unlockTenNumbers) {
		document.getElementById('autoclickerMin').innerHTML = `<span class="tenColor">${numWithCommas(stats.autoclickerMin)}</span>`;
	} else if (isPrime(stats.autoclickerMin) && stats.unlockPrimeNumbers) {
		document.getElementById('autoclickerMin').innerHTML = `<span class="primeColor">${numWithCommas(stats.autoclickerMin)}</span>`;
	} else {
		document.getElementById('autoclickerMin').innerHTML = `${numWithCommas(stats.autoclickerMin)}`;
	}
	// autoclickerMax
	if (isPowerOfTen(stats.autoclickerMax) && stats.unlockTenNumbers) {
		document.getElementById('autoclickerMax').innerHTML = `<span class="tenColor">${numWithCommas(stats.autoclickerMax)}</span>`;
	} else if (isPrime(stats.autoclickerMax) && stats.unlockPrimeNumbers) {
		document.getElementById('autoclickerMax').innerHTML = `<span class="primeColor">${numWithCommas(stats.autoclickerMax)}</span>`;
	} else {
		document.getElementById('autoclickerMax').innerHTML = `${numWithCommas(stats.autoclickerMax)}`;
	}
	document.getElementById('autoclickerMinCost').innerText = numWithCommas(stats.autoclickerMinCost);
	document.getElementById('autoclickerMaxCost').innerText = numWithCommas(stats.autoclickerMaxCost);
	document.getElementById('autoclickerResults').innerHTML = stats.autoclickerResults.map((number) => {
		if (isPowerOfTen(number) && stats.unlockTenNumbers) {
			return `<span style="color: red;">${numWithCommas(number)}</span>`;
		} else if (isPrime(number) && stats.unlockPrimeNumbers) {
			return `<span style="color: blue;">${numWithCommas(number)}</span>`;
		} else {
			return numWithCommas(number);
		}
	}).join(", ");

	// Super Autoclickers
	document.getElementById('superAutoclickers').innerText = numWithCommas(stats.superAutoclickers);
	document.getElementById('superAutoclickerCost').innerText = numWithCommas(stats.superAutoclickerCost);
	// superAutoclickerMin
	if (isPowerOfTen(stats.superAutoclickerMin) && stats.unlockTenNumbers) {
		document.getElementById('superAutoclickerMin').innerHTML = `<span class="tenColor">${numWithCommas(stats.superAutoclickerMin)}</span>`;
	} else if (isPrime(stats.superAutoclickerMin) && stats.unlockPrimeNumbers) {
		document.getElementById('superAutoclickerMin').innerHTML = `<span class="primeColor">${numWithCommas(stats.superAutoclickerMin)}</span>`;
	} else {
		document.getElementById('superAutoclickerMin').innerHTML = `${numWithCommas(stats.superAutoclickerMin)}`;
	}
	// superAutoclickerMax
	if (isPowerOfTen(stats.superAutoclickerMax) && stats.unlockTenNumbers) {
		document.getElementById('superAutoclickerMax').innerHTML = `<span class="tenColor">${numWithCommas(stats.superAutoclickerMax)}</span>`;
	} else if (isPrime(stats.superAutoclickerMax) && stats.unlockPrimeNumbers) {
		document.getElementById('superAutoclickerMax').innerHTML = `<span class="primeColor">${numWithCommas(stats.superAutoclickerMax)}</span>`;
	} else {
		document.getElementById('superAutoclickerMax').innerHTML = `${numWithCommas(stats.superAutoclickerMax)}`;
	}
	document.getElementById('superAutoclickerMinCost').innerText = numWithCommas(stats.superAutoclickerMinCost);
	document.getElementById('superAutoclickerMaxCost').innerText = numWithCommas(stats.superAutoclickerMaxCost);
	document.getElementById('superAutoclickerResults').innerHTML = stats.superAutoclickerResults.map((number) => {
		if (isPowerOfTen(number) && stats.unlockTenNumbers) {
			return `<span style="color: red;">${numWithCommas(number)}</span>`;
		} else if (isPrime(number) && stats.unlockPrimeNumbers) {
			return `<span style="color: blue;">${numWithCommas(number)}</span>`;
		} else {
			return numWithCommas(number);
		}
	}).join(", ");

	// Unlock Costs
	document.getElementById('unlockPrimeNumbersCost').innerText = unlockPrimeNumbersCost;
	document.getElementById('unlockTenNumbersCost').innerText = unlockTenNumbersCost;
	document.getElementById('unlockAutoclickersCost').innerText = unlockAutoclickersCost;
	document.getElementById('unlockSuperAutoclickersCost').innerText = unlockSuperAutoclickersCost;

	// Hidden stuff
	document.getElementById('unlockPrimeNumbers').hidden = !stats.unlockPrimeNumbers;
	document.getElementById('unlockTenNumbers').hidden = !stats.unlockTenNumbers;
	document.getElementById('unlockAutoclickers').hidden = !stats.unlockAutoclickers;
	document.getElementById('unlockSuperAutoclickers').hidden = !stats.unlockSuperAutoclickers;
	document.getElementById('boughtAutoclicker').hidden = stats.autoclickers <= 0;
	document.getElementById('boughtSuperAutoclicker').hidden = stats.superAutoclickers <= 0;

	// Disable buttons
	clickMinBtn.disabled = stats.clickMin >= stats.clickMax || stats.clickMinCost > stats.numbers;
	clickMaxBtn.disabled = stats.clickMaxCost > stats.numbers;
	
	autoclickerBuyBtn.disabled = stats.autoclickerCost > stats.primeNumbers;
	autoclickerMinBtn.disabled = stats.autoclickerMin >= stats.autoclickerMax || stats.autoclickerMinCost > stats.numbers || stats.autoclickers == 0;
	autoclickerMaxBtn.disabled = stats.autoclickerMaxCost > stats.numbers || stats.autoclickers == 0;
	
	superAutoclickerBuyBtn.disabled = stats.superAutoclickerCost > stats.tenNumbers;
	superAutoclickerMinBtn.disabled = stats.superAutoclickerMin >= stats.superAutoclickerMax || stats.superAutoclickerMinCost > stats.primeNumbers || stats.superAutoclickers == 0;
	superAutoclickerMaxBtn.disabled = stats.superAutoclickerMaxCost > stats.primeNumbers || stats.superAutoclickers == 0;

	unlockPrimeNumbersBtn.disabled = unlockPrimeNumbersCost > stats.numbers;
	unlockTenNumbersBtn.disabled = unlockTenNumbersCost > stats.primeNumbers;
	unlockAutoclickersBtn.disabled = unlockAutoclickersCost > stats.numbers;
	unlockSuperAutoclickersBtn.disabled = unlockSuperAutoclickersCost > stats.primeNumbers;

	unlockPrimeNumbersBtn.style.display = unlockPrimeNumbersCost > stats.totalNumbers || stats.unlockPrimeNumbers ? "none" : "block";
	unlockTenNumbersBtn.style.display = unlockTenNumbersCost > stats.totalNumbers || stats.unlockTenNumbers ? "none" : "block";
	unlockAutoclickersBtn.style.display = unlockAutoclickersCost > stats.totalNumbers || stats.unlockAutoclickers ? "none" : "block";
	unlockSuperAutoclickersBtn.style.display = unlockSuperAutoclickersCost > stats.totalNumbers || stats.unlockSuperAutoclickers ? "none" : "block";

	if (unlockPrimeNumbersBtn.style.display === "none" && unlockTenNumbersBtn.style.display === "none" && unlockAutoclickersBtn.style.display === "none" && unlockSuperAutoclickersBtn.style.display === "none"
	&& (!stats.unlockPrimeNumbers || !stats.unlockTenNumbers || !stats.unlockAutoclickers || !stats.unlockSuperAutoclickers)) {
		document.getElementById('noUnlocksVisible').hidden = false;
	} else {
		document.getElementById('noUnlocksVisible').hidden = true;
	}

	if (stats.unlockPrimeNumbers && stats.unlockTenNumbers && stats.unlockAutoclickers && stats.unlockSuperAutoclickers) {
		document.getElementById('unlockedEverything').hidden = false;
	} else {
		document.getElementById('unlockedEverything').hidden = true;
	}
}

// ====================================================
// Button functions

// Manual Clicks
clickBtn.addEventListener("click", () => {
	let num = getRandomInt(stats.clickMin, stats.clickMax);

	if (isPowerOfTen(num) && stats.unlockTenNumbers) {
		stats.tenNumbers += num;
	} else if (isPrime(num) && stats.unlockPrimeNumbers) {
		stats.primeNumbers += num;
	} else {
		stats.numbers += num;
	}

	stats.totalNumbers += num;
	stats.numbersLeft -= num;
	stats.clickResults.unshift(num);
	
	if (stats.clickResults.length > lastResultsLength) {
		stats.clickResults.pop();
	}
	
	updateUI();
});

clickMinBtn.addEventListener("click", () => {
	if (stats.numbers >= stats.clickMinCost) {
		stats.clickMin += 1;
		stats.numbers -= stats.clickMinCost;
		stats.clickMinCost += Math.floor(5 * Math.pow(1.05, stats.clickMin));
	}
	updateUI();
});

clickMaxBtn.addEventListener("click", () => {
	if (stats.numbers >= stats.clickMaxCost) {
		stats.clickMax += 1;
		stats.numbers -= stats.clickMaxCost;
		stats.clickMaxCost += Math.floor(5 * Math.pow(1.05, stats.clickMax));
	}	
	updateUI();
});

// Autoclickers
autoclickerBuyBtn.addEventListener("click", () => {
	if (stats.primeNumbers >= stats.autoclickerCost) {
		stats.autoclickers += 1;
		stats.primeNumbers -= stats.autoclickerCost;
		stats.autoclickerCost += Math.floor(100 * Math.pow(1.25, stats.autoclickers));
	}
	updateUI();
});

autoclickerMinBtn.addEventListener("click", () => {
	if (stats.numbers >= stats.autoclickerMinCost) {
		stats.autoclickerMin += 1;
		stats.numbers -= stats.autoclickerMinCost;
		stats.autoclickerMinCost += Math.floor(5 * Math.pow(1.05, stats.autoclickerMin));
	}
	updateUI();
});

autoclickerMaxBtn.addEventListener("click", () => {
	if (stats.numbers >= stats.autoclickerMaxCost) {
		stats.autoclickerMax += 1;
		stats.numbers -= stats.autoclickerMaxCost;
		stats.autoclickerMaxCost += Math.floor(5 * Math.pow(1.025, stats.autoclickerMax));
	}
	updateUI();
});

// Super Autoclickers
superAutoclickerBuyBtn.addEventListener("click", () => {
	if (stats.tenNumbers >= stats.superAutoclickerCost) {
		stats.superAutoclickers += 1;
		stats.tenNumbers -= stats.superAutoclickerCost;
		stats.superAutoclickerCost = Math.pow(10, stats.superAutoclickers + 2);
	}
	updateUI();
});

superAutoclickerMinBtn.addEventListener("click", () => {
	if (stats.primeNumbers >= stats.superAutoclickerMinCost) {
		stats.superAutoclickerMin += 1;
		stats.primeNumbers -= stats.superAutoclickerMinCost;
		stats.superAutoclickerMinCost += Math.floor(2 * Math.pow(stats.superAutoclickerMin / 50, 1.005));
	}
	updateUI();
});

superAutoclickerMaxBtn.addEventListener("click", () => {
	if (stats.primeNumbers >= stats.superAutoclickerMaxCost) {
		stats.superAutoclickerMax += 1;
		stats.primeNumbers -= stats.superAutoclickerMaxCost;
		stats.superAutoclickerMaxCost += Math.floor(2 * Math.pow(stats.superAutoclickerMax / 50, 1.015));
	}
	updateUI();
});

// Unlocks
unlockPrimeNumbersBtn.addEventListener("click", () => {
	if (stats.numbers >= unlockPrimeNumbersCost) {
		stats.numbers -= unlockPrimeNumbersCost;
		stats.unlockPrimeNumbers = true;
	}
	updateUI();
});

unlockTenNumbersBtn.addEventListener("click", () => {
	if (stats.primeNumbers >= unlockTenNumbersCost) {
		stats.primeNumbers -= unlockTenNumbersCost;
		stats.unlockTenNumbers = true;
	}
	updateUI();
});

unlockAutoclickersBtn.addEventListener("click", () => {
	if (stats.numbers >= unlockAutoclickersCost) {
		stats.numbers -= unlockAutoclickersCost;
		stats.unlockAutoclickers = true;
	}
	updateUI();
});

unlockSuperAutoclickersBtn.addEventListener("click", () => {
	if (stats.primeNumbers >= unlockSuperAutoclickersCost) {
		stats.primeNumbers -= unlockSuperAutoclickersCost;
		stats.unlockSuperAutoclickers = true;
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

lastNumber = 0;
deltaNumber = 0;

lastPrimeNumber = 0;
deltaPrimeNumber = 0;

lastTenNumber = 0;
deltaTenNumber = 0;

window.setInterval(function() {
	deltaNumber = stats.numbers - lastNumber;
	lastNumber = stats.numbers;

	deltaPrimeNumber = stats.primeNumbers - lastPrimeNumber;
	lastPrimeNumber = stats.primeNumbers;

	deltaTenNumber = stats.tenNumbers - lastTenNumber;
	lastTenNumber = stats.tenNumbers;

	stats.totalTime += 1;

	// Autoclickers
	for (let i = 0; i < stats.autoclickers; i++) {
		let num = getRandomInt(stats.autoclickerMin, stats.autoclickerMax);

		if (isPowerOfTen(num) && stats.unlockTenNumbers) {
			stats.tenNumbers += num;
		} else if (isPrime(num) && stats.unlockPrimeNumbers) {
			stats.primeNumbers += num;
		} else {
			stats.numbers += num;
		}

		stats.totalNumbers += num;
		stats.numbersLeft -= num;
		stats.autoclickerResults.unshift(num);

		if (stats.autoclickerResults.length > lastResultsLength) {
			stats.autoclickerResults.pop();
		}
	}

	// Super Autoclickers
	for (let i = 0; i < stats.superAutoclickers; i++) {
		let num = getRandomInt(stats.superAutoclickerMin, stats.superAutoclickerMax);

		if (isPowerOfTen(num) && stats.unlockTenNumbers) {
			stats.tenNumbers += num;
		} else if (isPrime(num) && stats.unlockPrimeNumbers) {
			stats.primeNumbers += num;
		} else {
			stats.numbers += num;
		}

		stats.totalNumbers += num;
		stats.numbersLeft -= num;
		stats.superAutoclickerResults.unshift(num);

		if (stats.superAutoclickerResults.length > lastResultsLength) {
			stats.superAutoclickerResults.pop();
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
	console.log("Game saved.");
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
		console.log("Game loaded.");
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

function numWithCommas(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function isPrime(num) {
	if (num < 2) return false;
	if (num === 2) return true;
	for (let i = 2; i <= Math.sqrt(num); i++) {
		if (num % i === 0) return false;
	}
	return true;
}

function isPowerOfTen(num) {
	if (num < 0) return false;
	const log = Math.log10(num);
	return log === Math.floor(log);
}

function formatTime(seconds) {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;

	let result = "";
	if (hours > 0) result += `${hours}hr `;
	if (minutes > 0) result += `${minutes}m `;
	result += `${remainingSeconds}s`;

	return result.trim();
}
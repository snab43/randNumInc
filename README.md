<div align="center">
	<img src="https://snab43.github.io/randNumInc/img/dice.png">
	<h3 align="center">randNumInc.exe</h3>
	<p align="center">Random Number Incremental. A short 10 minute incremental game about generating random numbers.</p>
</div>

Play it here: https://snab43.github.io/randNumInc/

## About

My goal was to have a solo game jam where I tried to make an incremental game in a single day. After many unfinished projects, I just wanted to make a complete finished experience. I decided to just use pure HTML, CSS, and JS to keep it simple, although I did use a Windows 98 style library as a quick UI shortcut. The code is extremely unoptimized and a mess of spaghetti code, but it runs.

The game works best on Desktop devices. You can play on Mobile, but the tap targets aren't optimized.

## How to Play

The game is an unfolding incremental. To start, hit "Get a Number" which will generate a random number between 1 and 10. The goal is to create 1,000,000 total numbers as fast as possible (it seems to take people around 10 minutes to do so). Quickly, you'll gain more ways to generate numbers even faster.

You can also upgrade the minimum and maximum range for your number generator to get better values.

### Spoilers
<details><summary>Spoiler Section</summary>

#### Number Types

There are 2 additional number types to unlock for a total of 3:

1. Numbers
2. [Prime Numbers](https://en.wikipedia.org/wiki/Prime_number) (2, 3, 5, 7, 11, 13, 17, 19, 23, etc.)
3. 10^x Numbers (1, 10, 100, 1000, 10000, 100000, etc.)

When you unlock these number types, numbers that are prime will be added to your Prime Number resource pool instead, and the same with 10^x Numbers.

#### Unlocks

There are 2 additional unlockables:

1. Autoclickers
2. Super Autoclickers

Autoclickers cost Prime Numbers and Super Autoclickers cost 10^x Numbers. Super Autoclickers are powerful and therefore cost an increasing amount of 10^x numbers to unlock starting with 100, then 1000, then 10000, etc.

#### Strategies

Knowing this, the strategy can be setting your Min and Max for your Manual Clicks or Autoclickers to optimally generate more Prime Numbers than regular Numbers, or to generate 10s and 100s.

#### Soft Lock

However, if you set your Manual Clicks and Autoclicks' Min to 11 or more, it does take a while to get your maximum to 100 so you can start generating 10^x Numbers to unlock Super Autoclickers. I tried to tune the difficulty curve and make the game short enough so this isn't too much of an annoyance.
</details>

## Built With

HTML, CSS, and JS.

## Screenshots

![randNumInc.exe](https://i.postimg.cc/8kb8f8Wr/Capture.png)

## Acknowledgements

- [98.css](https://jdan.github.io/98.css/) by [Jordan Scales](https://github.com/jdan/)

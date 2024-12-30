//prompting user to enter the balance amount

const prompt = require("prompt-sync")();
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
  E: 10
};

const SYMBOLS_VALUES = {
  A: 10,
  B: 8,
  C: 6,
  D: 4,
  E: 2,
};

const deposit = () => {
  while (true) {
    const balance = prompt("Enter the amount to Deposit: ");
    const numBalance = parseFloat(balance);
    
    if (isNaN(numBalance) || balance <= 0) {
      console.log("You broke MF! Deposit money if you want to play!");
    } else {
      return numBalance;
    }
  }
};

//Selecting number of lines user want to bet on.

const getNumOfLines = () => {
  while (true) {
    const lines = prompt("Enter the number of lines you want to bet on(1-3): ");
    const numLines = parseFloat(lines);

    if (isNaN(numLines) || lines <= 0 || lines > 5) {
      console.log("Just select the Number of lines you want to Bet on");
    } else {
      return numLines;
    }
  }
};

// Selecting amount to bet on desired lines

const getBetAmount = (balance, lines) => {
  while (true) {
    const betAmount = prompt("Enter the amount to bet per lines: ");
    const numBetAmount = parseFloat(betAmount);
    if (isNaN(numBetAmount) || numBetAmount <= 0|| numBetAmount > balance/lines) {
      console.log("Invalid Bet Amount. Please Check Your Balance!");
      } else {
        return numBetAmount;
      }
  }
}

//Selecting random symbols for the slot from the initialized symbols 

const spinSlot = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [[], [], []];
  for (let i = 0; i < COLS; i++) {
    const reelSymbol = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbol.length);
      const selectedSymbol = reelSymbol[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbol.splice(randomIndex, 1); 
    }
  }
  return reels;
}

//Transposing the slot rows for displaying according to the game
const tranposeReel = (reels) => {
  const rows = [];

  for(let i = 0; i < ROWS; i++) {
    rows.push([])
    for(let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i])
      }
  }
  return rows;
}

//Printing the Reels of the slot/the transposed rows

const printSlot = (rows) => {
  for(const row of rows) {
    let rowString = "";
    for(const [i, symbol] of row.entries()) {
      rowString += symbol;
      if(i != (row.length - 1)){
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
}

const getResult = (rows, bet, lines) => {
  let win = 0;

  for(let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for(const symbol of symbols){
      if(symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if(allSame) {
      win = bet * SYMBOLS_VALUES[symbols[0]];
    }
  }
  return win;
}
const game = () => {
  let balance = deposit();

  while(true){
    console.log("Balance amount: $" + balance);

    const betPerLines = getNumOfLines();
    const bet = getBetAmount(balance, betPerLines);
    balance -= bet * betPerLines;
    console.log("Betting $" + bet + " on " + betPerLines + " lines");

    const reels = spinSlot();
    const tranposedReels = tranposeReel(reels)
    printSlot(tranposedReels);
    const winnings= getResult(tranposedReels, bet, betPerLines);
    balance += winnings
    console.log("You won, $" + winnings);

    if(balance <= 0) {
      console.log("You have run out of money, Game Over!!!");
      break;
    }

    const playAgain = prompt("Do you want to play again (y/n)? ");

    if(playAgain == 'y' || playAgain == 'Y') null;
    else break;
    
  }
};

game();
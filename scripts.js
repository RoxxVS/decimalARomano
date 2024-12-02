const instructions = document.getElementById('instructions');
const show = document.getElementById('show');
const instructionsText = document.getElementById('instructions-text');
const inputNumber = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const result = document.getElementById('result');
const output = document.getElementById('output');
const clearBtn = document.getElementById('clear-btn');

instructions.addEventListener("mouseover", () => {
    instructionsText.classList.remove('hidde')
    show.classList.add('div-line');
})
instructions.addEventListener("mouseout", () => {
    instructionsText.classList.add('hidde');
    show.classList.remove('div-line');
})

convertBtn.addEventListener("click", () => {
    const numDec = parseFloat(inputNumber.value);
    result.classList.remove('hidde');
    if (Number.isInteger(numDec)) {
        if (numDec > 0 && numDec < 4000) {
            const numRom = converRom(numDec);
            output.innerText = numRom;
        } else if (numDec < 0)  {
            output.innerText = "Por favor, ingrese un número mayor o igual que 1";
        } else if (numDec >= 4000)  {
            output.innerText = "Por favor, ingrese un número menos o igual que 3999";
        }
    } else {
        output.innerText = "Por favor, ingrese un número válido";
    }
    convertBtn.classList.add('hidde');
})

clearBtn.addEventListener("click", () => {
    inputNumber.value = "";
    result.classList.add('hidde');
    convertBtn.classList.remove('hidde');
    
})

function convert(num, div, a, b, c) {
    let numRom = [];
    if (num / div >= 9) {
      // Manejar números iguales a 9
        numRom.push(a);
        numRom.push(c);
        num = num - (9 * div);
        numRom = numRom.concat(convert(num, div, a, b, c));
    } else if (num / div >= 5) {
      // Manejar números entre 5 y 8
        numRom.push(b);
        num = num - (5 * div);
        numRom = numRom.concat(convert(num, div, a, b, c));
    } else if (num / div >= 4) {
      // Manejar números iguales a 4
        numRom.push(a);
        numRom.push(b);
        num = num - (4 * div);
        numRom = numRom.concat(convert(num, div, a, b, c));
    } else if (num / div >= 1) {
      // Manejar números entre 1 y 3
        for (let i = 1; i <= (num / div); i++) {
            numRom.push(a);
        }
        num = num - (num / div) * div;
        numRom = numRom.concat(convert(num, div, a, b, c));
    }
    return numRom;
}

function converRom(numDec) {
    let numRom = convert(numDec, 1000, "M", "J", "K");
    numDec %= 1000;
    numRom = numRom.concat(convert(numDec, 100, "C", "D", "M"));
    numDec %= 100;
    numRom = numRom.concat(convert(numDec, 10, "X", "L", "C"));
    numDec %= 10;
    numRom = numRom.concat(convert(numDec, 1, "I", "V", "X"));
    return numRom.join('');
}


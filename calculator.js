const display=document.querySelector('.mainDisplay');
const buttons= document.querySelectorAll('.btnOperator, .btnNumber');
const updateshow=document.querySelector('.js-update');
const historyBtn=document.querySelector('.historyBtn');
const buttonsDisplay=document.querySelector('.buttons')

let resultShown=false;
let currentExpression='';
let resultHistory=[];

const operators = ['+', '-', '*', '/'];

function updateExpressionDisplay() {
    updateshow.innerText = currentExpression;
    updateshow.scrollLeft = updateshow.scrollWidth;
}

function clearCalculator() {
    currentExpression = '';
    display.innerText = '';
    updateshow.innerText = '';
    resultShown = false;
}

function removeLastInput() {
    currentExpression = currentExpression.slice(0, -1);
    updateExpressionDisplay();
}

function formatResult(result) {
    if (typeof result === 'number' && !Number.isInteger(result)) {
        return String(parseFloat(result.toFixed(8)));
    }

    return String(result);
}

function calculateResult() {
    if (currentExpression === '' || operators.includes(currentExpression.slice(-1))) {
        return;
    }

    try {
        const result = formatResult(math.evaluate(currentExpression));
        display.innerText = result;
        resultHistory.push(currentExpression + '=' + result);
        resultShown = true;
    } catch (err) {
        display.innerText = 'Error';
        resultShown = false;
    }
}

function addInput(id) {
    if (id === 'Ac') {
        clearCalculator();
        return;
    }

    if (id === 'back') {
        if (resultShown) {
            display.innerText = '';
            resultShown = false;
        }
        removeLastInput();
        return;
    }

    if (id === 'equals') {
        calculateResult();
        return;
    }

    const isOperator = operators.includes(id);

    if (resultShown) {
        currentExpression = isOperator ? display.innerText + id : id;
        display.innerText = '';
        resultShown = false;
        updateExpressionDisplay();
        return;
    }

    const lastChar = currentExpression.slice(-1);

    if (isOperator && currentExpression === '') {
        return;
    }

    if (isOperator && operators.includes(lastChar)) {
        currentExpression = currentExpression.slice(0, -1) + id;
    } else {
        currentExpression += id;
    }

    updateExpressionDisplay();
}

buttons.forEach((button)=>{
    button.addEventListener('click',()=>{
        addInput(button.id);
    });
});

document.addEventListener('keydown', (event) => {
    if (/^[0-9.]$/.test(event.key) || operators.includes(event.key)) {
        event.preventDefault();
        addInput(event.key);
    } else if (event.key === 'Enter') {
        event.preventDefault();
        addInput('equals');
    } else if (event.key === 'Backspace') {
        event.preventDefault();
        addInput('back');
    } else if (event.key === 'Escape') {
        event.preventDefault();
        addInput('Ac');
    }
});

let historyDisplay = null;
let historyShown = false;

historyBtn.addEventListener('click', () => {
  if (!historyDisplay) {
    // Create history container
    historyDisplay = document.createElement('div');
    historyDisplay.classList.add('historydis');

    // Create history content wrapper
    const historyContent = document.createElement('div');
    historyContent.classList.add('history-content');

    // Create delete button
    const delBtn = document.createElement('button');
    delBtn.innerText = '🗑️';
    delBtn.classList.add('del-btn');

    // Delete logic
    delBtn.addEventListener('click', () => {
      resultHistory.length = 0;
      historyContent.innerHTML = ''; // only clear <p>s
    });

    // Assemble
    historyDisplay.appendChild(historyContent);
    historyDisplay.appendChild(delBtn);
    buttonsDisplay.appendChild(historyDisplay);
  }

  // Update content
  const historyContent = historyDisplay.querySelector('.history-content');
  historyContent.innerHTML = ''; // Clear only <p>s

  resultHistory.forEach(item => {
    const p = document.createElement('p');
    p.innerText = item;
    historyContent.appendChild(p);
  });

  historyShown = !historyShown;

  if (historyShown) {
    historyDisplay.classList.add('show');
  } else {
    historyDisplay.classList.remove('show');
  }
});

const display=document.querySelector('.mainDisplay');
const buttons= document.querySelectorAll('.btnOperator, .btnNumber');
const updateshow=document.querySelector('.js-update');
const historyBtn=document.querySelector('.historyBtn');
const buttonsDisplay=document.querySelector('.buttons')

let resultShown=false;
let currentExpression='';
let currentValue='';
let resultHistory=[];

buttons.forEach((button)=>{
    button.addEventListener('click',()=>{
    let id=button.id;
    if(id==='Ac'){
        currentExpression='';
        currentValue='';
        display.innerText='';
        updateshow.innerText='';
        resultShown=false;
    }else if(id==='back'){
        if (currentValue.length > 0) {
        currentValue = currentValue.slice(0, -1);
        display.innerText = currentExpression + currentValue;
        updateshow.innerText = currentExpression + currentValue;
    }

    
    }else if (id === 'equals') {
    try {
        let fullExpression = currentExpression + currentValue;
        let result = math.evaluate(fullExpression);
        
        // Limit result to 8 decimal places if it's a float
        if (typeof result === 'number' && !Number.isInteger(result)) {
            result = parseFloat(result.toFixed(8)); 
        }
        currentValue = String(result);
        currentExpression = '';
        display.innerText = currentValue;
        updateshow.innerText = fullExpression + '=';
        resultHistory.push(fullExpression+'='+currentValue);
        
        
        resultShown = true;
        }catch (err) {
        display.innerText = 'Error';
        updateshow.innerText = '';
        currentValue = '';
        currentExpression = '';
        resultShown = false;
        }
    }

    else if(resultShown&& !['+','-','*','/'].includes(id)){
        currentExpression='';
        currentValue=id;
        display.innerText=currentValue;
        updateshow.innerText=currentValue;
        resultShown=false;
        
    }
    else if(resultShown&&['+','-','*','/'].includes(id)){
        currentExpression=currentValue+id;
        currentValue='';
        updateshow.innerText = currentExpression;
        display.innerText=currentExpression;
        resultShown=false;
        
    }else if (!resultShown && ['+', '-', '*', '/'].includes(id)) {
    if (currentValue !== '') {
        // If currentValue is not empty, append to expression and evaluate
        currentExpression += currentValue;
        try {
            let result = math.evaluate(currentExpression);
            currentExpression = result + id;
            currentValue = '';
            display.innerText = currentExpression;
            updateshow.innerText = currentExpression;
        } catch (err) {
            display.innerText = 'Error';
            updateshow.innerText = '';
            currentValue = '';
            currentExpression = '';
            resultShown = false;
        }
        
    }
    else {
        // If currentValue is empty, user is just replacing the last operator
        let lastChar = currentExpression.slice(-1);
        if (['+', '-', '*', '/'].includes(lastChar)) {
            currentExpression = currentExpression.slice(0, -1) + id;
            display.innerText = currentExpression;
            updateshow.innerText = currentExpression;
        }
    }
}
        
    else {
    if (currentValue.length < 10) {
            currentValue += id;
            display.innerText = currentValue;
            updateshow.innerText = currentExpression + currentValue;
            display.scrollLeft = display.scrollWidth;
            updateshow.scrollLeft = updateshow.scrollWidth;
        }

    }

});
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
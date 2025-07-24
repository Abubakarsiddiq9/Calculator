const display=document.querySelector('.mainDisplay');
const buttons= document.querySelectorAll('.btnOperator, .btnNumber');
const updateshow=document.querySelector('.js-update');
let resultShown=false;
let currentExpression='';
let currentValue='';

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
        currentValue = String(result);
        currentExpression = '';
        display.innerText = currentValue;
        updateshow.innerText = fullExpression + '=';
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
        
    else{
    currentValue+=id;
    
    display.innerText=currentExpression+currentValue;
    updateshow.innerText=currentExpression+currentValue;
    }
});
}); 
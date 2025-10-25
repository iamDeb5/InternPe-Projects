const exprEl = document.getElementById('expression');
const resultEl = document.getElementById('result');

let expression = '';

function updateDisplay() {
    exprEl.textContent = expression || '0';
}

function calculate() {
    try {
        const safeExp = expression.replace(/[^0-9+\-*/%.]/g, '');
        const result = Function('return ' + safeExp)();
        resultEl.textContent = result;
    }
    catch {
        resultEl.textContent = 'Error';
    }
}

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('number')) {
            expression += btn.dataset.num;
        } 
        else if (btn.classList.contains('operator')) {
            expression += btn.dataset.op;
        } 
        else if (btn.classList.contains('clear')) {
            expression = '';
            resultEl.textContent = '0';
        }
        else if (btn.classList.contains('back')) {
            expression = expression.slice(0, -1);
        } 
        else if (btn.classList.contains('equals')) {
            calculate();
        }
        updateDisplay();
    });
});


updateDisplay();
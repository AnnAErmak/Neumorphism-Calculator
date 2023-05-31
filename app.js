const tagExpression = document.querySelector('textarea')
const tagResult = document.querySelector('input')
const display = document.querySelector('textarea')
const result = document.querySelector('input')

const calcState = {
    result: 0,
    expression: '',

    changeExpression(value){
        this.expression += value
    },
    changeResult(){
        try{
            const newResult = eval(this.expression)
            this.result = newResult
        }catch (e){
            alert(`В выражении: ${this.expression} ошибка`)
            this.allClear()
        }
    },

    refreshResult(){
        tagResult.value = this.result
    },
    refreshValue(){
        tagExpression.innerText = this.expression
    },

    allClear(){
        this.result = 0
        this.expression = ''
        this.refreshResult()
        this.refreshValue()
    },
    clearExpression(){
        this.expression = ''
        this.refreshValue()
    },
    deleteLastCharacter(){
        this.expression = this.expression.slice(0, -1)
        this.refreshValue()
    }
}
display.innerText = calcState.expression
result.value = calcState.result

document.querySelectorAll('button').forEach( (button) => {
    button.addEventListener('click', onButtonClick);
});

function onButtonClick(e) {
    const value = e.currentTarget.dataset.value
    switch (value){
        case '=':
            calcState.changeResult()
            calcState.refreshResult()
            calcState.clearExpression()
            break
        case 'AC':
            calcState.allClear()
            break
        case 'C':
            calcState.clearExpression()
            break
        case '<':
            calcState.deleteLastCharacter()
            break
        default:
            calcState.changeExpression(value)
            calcState.refreshValue()
            break
    }
}

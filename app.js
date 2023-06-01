const tagExpression = document.querySelector('textarea')
const tagResult = document.querySelector('input')
const display = document.querySelector('textarea')
const result = document.querySelector('input')
const panel = document.querySelector('.panel')

const buttons =[
    {
        dataAtr: 'AC',
        className: 'grey'
    },
    {
        dataAtr: 'C',
        className: 'grey'
    },
    {
        dataAtr: '<',
        className: 'grey'
    },
    {
        dataAtr: '/',
        className: 'yellow'
    },
    {
        dataAtr: '7',
        className: ''
    },
    {
        dataAtr: '8',
        className: ''
    },
    {
        dataAtr: '9',
        className: ''
    },
    {
        dataAtr: '*',
        className: 'yellow'
    },
    {
        dataAtr: '4',
        className: ''
    },
    {
        dataAtr: '5',
        className: ''
    },
    {
        dataAtr: '6',
        className: ''
    },
    {
        dataAtr: '-',
        className: 'yellow'
    },
    {
        dataAtr: '1',
        className: ''
    },
    {
        dataAtr: '2',
        className: ''
    },
    {
        dataAtr: '3',
        className: ''
    },
    {
        dataAtr: '+',
        className: 'yellow'
    },
    {
        dataAtr: '0',
        className: 'btn-big'
    },
    {
        dataAtr: '.',
        className: ''
    },
    {
        dataAtr: '=',
        className: 'yellow'
    },
]

const calcState = {
    result: 0,
    expression: '',

    changeExpression(value){
        this.expression += value
    },
    changeResult(){
        try{
            const newResult = eval(this.expression)
            if (/^-?(0|[1-9]\d*)(\.[0-9]{1,8})?$/.test(newResult)){
                this.result = newResult
            }else {
                this.result = newResult.toFixed(8)
            }

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

buttons.forEach(btn => {
    const button = document.createElement('button')
    button.setAttribute('data-value', btn.dataAtr)
    button.className = btn.className
    button.addEventListener('click', onButtonClick);

    const span = document.createElement('span')
    span.textContent = btn.dataAtr

    button.append(span)
    panel.append(button)
})

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

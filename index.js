// Selected all the operands,numbers and extra buttons using query Selector
const numberButtons = document.querySelectorAll('.button-number')
const operationButtons = document.querySelectorAll('.button-operator')
const equalsButton = document.querySelector('.button-equal')
const deleteButton = document.querySelector('.button-delete')
const allClearButton = document.querySelector('.button-clear')
// The display has two sections one is previous which will be empty but as soon as we click on one of the operand the data stored in the current part will be stored in the previous part and the current part will be emptied but if both the current and previous both has data then first we compute the operation and then store it in the previous part
const previousTextElement = document.querySelector('.previous')
const currentTextElement = document.querySelector('.current')

class Calculator { 
    constructor(previousTextElement, currentTextElement) {
      this.previousTextElement = previousTextElement
      this.currentTextElement = currentTextElement
      this.clear()
    }
  
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
    
    // when delete function is called it converts the data present in the current part into string then it slice the string from 0 to length-1 and by doing that we can remove the last character
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    // Since we have to append the number after the existing number present in the current part therefore before adding the inputed number we convert the existing number into string 
    // And the user can't enter more than one '.' therefore before adding the number we check whether the number is a '.' or not
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    // If the current part is empty then return since there is no number present on which we can perform the operation
    // And if both the current and previous has data then we call the compute function
    // After the operation is done we store the result in previous part and empty the current part
    chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
    
    // Firstly change both the previous and current part into numbers since we have to perfrom mathematical operations on them
    // based on the operand the user clicked we perform the action 
    // Then store it in the current part but later on we will move the result in the previous part and also make operation equal to undefined
    compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
    
    // This function is used the user is typing the numbers first we change the number into float then split the string wrt to '.' and since only one '.' is allowed when typing words the 0th index represents the integer value and 1st index represents the decimal part 
   //Then we validate whether a number is present or not in those variables 
    // For the integer part we have to put commas after every three digits for that we used toLocalString  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
    
    updateDisplay() {
      this.currentTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousTextElement.innerText = ''
      }
    }
  }
  
  const calculator = new Calculator(previousTextElement, currentTextElement)
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })
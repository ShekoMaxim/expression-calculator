function eval() {
    // Do not use eval!!!
    return;
}

const checkBrackets = str => {
    var chars = str.split(''),
        stack = [],
        open = ['{', '(', '['],
        close = ['}', ')', ']'],
        closeIndex,
        openIndex;

    for (var i = 0, len = chars.length; i < len; i++) {
       openIndex = open.indexOf(chars[i]);
       if (openIndex !== -1) {
           stack.push(openIndex);
           continue;
       }

       closeIndex = close.indexOf(chars[i]);
       if (closeIndex !== -1) {
           openIndex = stack.pop();
           if (closeIndex !== openIndex) {
               return false;
           }
       }
    }

    if (stack.length !== 0) {
        return false;
    }

    return true;
}

const infixToPostfix = (record) => {
    const dictionary = {
        "*" : 3,
        "/" : 3,
        "+" : 2,
        "-" : 2,
        "(" : 1,
    }
    let stack = [];
    let separators = ['+', '-', '(', ')', '*', '/', ':', '?'];
    let pattern = /^-?\d+\.?\d*$/;
    let postfixList = [];
    let arrayOfRecord = record.replace(new RegExp('\\' + separators.join('|\\'), 'g'), ' $& ').split(' ').filter(elem => elem !== '');
    arrayOfRecord.forEach(element => {
        if (element.match(pattern)){
            postfixList.push(element);
        } else if (element === '(') {
            stack.push(element);
        } else if (element === ')') {
            topElement = stack.pop()
            while (topElement != '('){
                postfixList.push(topElement);
                topElement = stack.pop();
            }
        } else {
            while ((stack.length !== 0) &&  (dictionary[stack[stack.length - 1]] >= dictionary[element])) {
               postfixList.push(stack.pop())
            }
         stack.push(element)
        }
    });

    while (stack.length !== 0){
        postfixList.push(stack.pop())
    }
    return postfixList.join(' ');
}

const calculation = (operation, a, b)=>{
    if (operation === "+") {
        return a + b;
      } else if (operation === "-") {
        return a - b;
      } else if (operation === "*") {
        return a * b;
      } else if (operation === "/") {
        if (b === 0) {
          throw Error("TypeError: Division by zero.")
        }
        return a / b;
      } else {
        return Math.pow(b, a);
      }
}

function expressionCalculator(expr) {
    if(!checkBrackets(expr)){
        throw Error("ExpressionError: Brackets must be paired")
    }
    let operandStack = [];
    let pattern = /^-?\d+\.?\d*$/;
    elementsList = infixToPostfix(expr).split(" ");
    elementsList.forEach(element => {
        if (element.match(pattern)){
            operandStack.push(parseInt(element, 10));
        } else {
            operand2 = operandStack.pop()
            operand1 = operandStack.pop()
            result = calculation(element,operand1,operand2)
            operandStack.push(result)
        }
    })
    return operandStack.pop();
}

module.exports = {
    expressionCalculator
}
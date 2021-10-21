let math = "0"; //сохраняет в себя математическое выражение
let lastBtn = ""; //сохраняет в себя последнюю нажатую кнопку при необходимости
let lastOperator = ""; //хранит последний оператор для displayNumber
console.log(math);

const display = $(".display");

const b0 = $("#0");
const b1 = $("#1");
const b2 = $("#2");
const b3 = $("#3");
const b4 = $("#4");
const b5 = $("#5");
const b6 = $("#6");
const b7 = $("#7");
const b8 = $("#8");
const b9 = $("#9");

const b00 = $("#00");
const bDot = $("#dot");
const bEq = $("#eq");
const bPer = $("#per");
const bDel = $("#del");
const bX = $("#X");
const bDivide = $("#div");
const bPlus = $("#plus");
const bMin = $("#min");
const ce = $("#ce");

b0.click(() => displayNumber("0"));
b1.click(() => displayNumber("1"));
b2.click(() => displayNumber("2"));
b3.click(() => displayNumber("3"));
b4.click(() => displayNumber("4"));
b5.click(() => displayNumber("5"));
b6.click(() => displayNumber("6"));
b7.click(() => displayNumber("7"));
b8.click(() => displayNumber("8"));
b9.click(() => displayNumber("9"));

b00.click(() => addDoubleZero());

bDot.click(() => addDot());

bPlus.click(() => addOperator("+"));
bMin.click(() => addOperator("-"));
bX.click(() => addOperator("*"));
bDivide.click(() => addOperator("/"));

bPer.click(() => calculatePercent());

bDel.click(() => clickDelete());

bEq.click(() => clickEq());

ce.click(() => clickCe());

//functions

function displayNumber(num) {
  if (display.text() == "0") {
    //если на дисплее начальный 0, то заменяем его
    display.text(num);
    math = num;
    console.log(math);
  } else if (lastBtn == "Eq" || lastBtn == "Per") {
    //если последняя клавиша '=', то очищаем мат.выражение и дисплей
    math = num;
    display.text(num);
    lastBtn = "";
    console.log(math);
  } else if (math.slice(-1) == lastOperator) {
    // если последний был оператор, то выводить с новой строки
    display.text(num);
    math += num;
    console.log(math);
  } else {
    //если цифра нажата за цифрой, то просто добавляем
    display.append(num);
    math += num;
    console.log(math);
  }
}

function addOperator(operator) {
  math = String(math); //перевожу в строку
  if (math.slice(-1) != operator) {
    //если последний НЕ operator добавляем его
    display.text(eval(math));
    lastOperator = operator;
    math = eval(math) + operator;
    console.log(math);
  }
  lastBtn = "Operator";
}

function addDot() {
  math += ".";
  display.append(".");
}

function addDoubleZero() {
  if (display.text() != "0") {
    display.append("00");
    math += "00";
    console.log(math);
  }
}

function clickDelete() {
  if (display.text().length == 1) {
    display.text("0");
    console.log(math);
  } else {
    display.text(display.text().slice(0, -1));
    math = math.slice(0, -1);
    console.log(math);
  }
}

function calculatePercent() {
  lastBtn = "Per";
  let minuend = parseFloat(math);
  let percent = math.slice(String(minuend).length + 1);
  math = eval(minuend + lastOperator + (minuend / 100) * percent);
  console.log(math);
  display.text(math);
}

function clickEq() {
  math = String(math);
  if (parseInt(math) == math.slice(0, -1)) {
    //true если в конце есть оператор
    math = parseInt(math); //убирает оператор
    display.text(math);
    console.log(math);
  } else if (lastBtn == "Eq") {
    math = eval(math + lastOperator + secondNum);
    display.text(math);
    console.log(math);
  } else {
    firstNum = String(parseInt(math)); //для двойного нажатия =
    secondNum = math.slice(firstNum.length + 1); //сохраняем оператор и число
    math = eval(math);
    display.text(math);
    console.log(math);
  }
  lastBtn = "Eq";
}

function clickCe() {
  display.text("0");
  math = "0";
  console.log(math);
  lastBtn = "Ce";
}

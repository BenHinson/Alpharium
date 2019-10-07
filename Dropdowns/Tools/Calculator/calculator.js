function calcSelected() {

  var calculatorMain = document.getElementById(avaliableBox);
  var newCalculatorMain = document.createElement('form');
  newCalculatorMain.setAttribute("id", avaliableBox + "calcCalculator");
  newCalculatorMain.setAttribute("name", avaliableBox + "calculator");
  newCalculatorMain.setAttribute("value", avaliableBox);
  calculatorMain.appendChild(newCalculatorMain);

  var calculator = document.getElementById(avaliableBox + "calcCalculator");
  var newCalculator = document.createElement('div');
  newCalculator.setAttribute("id", avaliableBox + "calcContainer");
  newCalculator.setAttribute("class", "calcContainer");
  calculator.appendChild(newCalculator);

  var calcTextField = document.getElementById(avaliableBox + "calcContainer");
  var newCalcTextField = document.createElement('input');
  newCalcTextField.setAttribute("id", "answer");
  newCalcTextField.setAttribute("name", "ans");
  newCalcTextField.setAttribute("value", "");
  newCalcTextField.setAttribute("placeholder", "0");
  newCalcTextField.setAttribute("type", "textfield");
  calcTextField.appendChild(newCalcTextField);



  var newCalcBtn7 = document.createElement('input');
  newCalcBtn7.setAttribute("type", "button");
  newCalcBtn7.setAttribute("id", "btn1");
  newCalcBtn7.setAttribute("value", "7");
  newCalcBtn7.setAttribute("onClick", "document." + avaliableBox + "calculator.ans.value+='7'");
  calcTextField.appendChild(newCalcBtn7);

  var newCalcBtn8 = document.createElement('input');
  newCalcBtn8.setAttribute("type", "button");
  newCalcBtn8.setAttribute("id", "btn1");
  newCalcBtn8.setAttribute("class", "btn2");
  newCalcBtn8.setAttribute("value", "8");
  newCalcBtn8.setAttribute("onClick", "document." + avaliableBox + "calculator.ans.value+='8'");
  calcTextField.appendChild(newCalcBtn8);

  var newCalcBtn9 = document.createElement('input');
  newCalcBtn9.setAttribute("type", "button");
  newCalcBtn9.setAttribute("id", "btn1");
  newCalcBtn9.setAttribute("value", "9");
  newCalcBtn9.setAttribute("onClick", "document." + avaliableBox + "calculator.ans.value+='9'");
  calcTextField.appendChild(newCalcBtn9);

  var newCalcBtnD = document.createElement('input');
  newCalcBtnD.setAttribute("type", "button");
  newCalcBtnD.setAttribute("class", "btn5");
  newCalcBtnD.setAttribute("value", "/");
  newCalcBtnD.setAttribute("onClick", "document." + avaliableBox + "calculator.ans.value+='/'");
  calcTextField.appendChild(newCalcBtnD);



  var newCalcBtn4 = document.createElement('input');
  newCalcBtn4.setAttribute("type", "button");
  newCalcBtn4.setAttribute("id", "btn1");
  newCalcBtn4.setAttribute("class", "btn3");
  newCalcBtn4.setAttribute("value", "4");
  newCalcBtn4.setAttribute("onClick", "document." + avaliableBox + "calculator.ans.value+='4'");
  calcTextField.appendChild(newCalcBtn4);

  var newCalcBtn5 = document.createElement('input');
  newCalcBtn5.setAttribute("type", "button");
  newCalcBtn5.setAttribute("id", "btn1");
  newCalcBtn5.setAttribute("class", "btn4");
  newCalcBtn5.setAttribute("value", "5");
  newCalcBtn5.setAttribute("onClick", "document." + avaliableBox + "calculator.ans.value+='5'");
  calcTextField.appendChild(newCalcBtn5);

  var newCalcBtn6 = document.createElement('input');
  newCalcBtn6.setAttribute("type", "button");
  newCalcBtn6.setAttribute("id", "btn1");
  newCalcBtn6.setAttribute("class", "btn3");
  newCalcBtn6.setAttribute("value", "6");
  newCalcBtn6.setAttribute("onClick", "document." + avaliableBox + "calculator.ans.value+='6'");
  calcTextField.appendChild(newCalcBtn6);

  var newCalcBtnM = document.createElement('input');
  newCalcBtnM.setAttribute("type", "button");
  newCalcBtnM.setAttribute("class", "btn6");
  newCalcBtnM.setAttribute("value", "x");
  newCalcBtnM.setAttribute("onClick", "document." + avaliableBox + "calculator.ans.value+='*'");
  calcTextField.appendChild(newCalcBtnM);



  var newCalcBtn1 = document.createElement('input');
  newCalcBtn1.setAttribute("type", "button");
  newCalcBtn1.setAttribute("id", "btn1");
  newCalcBtn1.setAttribute("value", "1");
  newCalcBtn1.setAttribute("onClick", "document." + avaliableBox + "calculator.ans.value+='1'");
  calcTextField.appendChild(newCalcBtn1);

  var newCalcBtn2 = document.createElement('input');
  newCalcBtn2.setAttribute("type", "button");
  newCalcBtn2.setAttribute("id", "btn1");
  newCalcBtn2.setAttribute("class", "btn2");
  newCalcBtn2.setAttribute("value", "2");
  newCalcBtn2.setAttribute("onClick", "document." + avaliableBox + "calculator.ans.value+='2'");
  calcTextField.appendChild(newCalcBtn2);

  var newCalcBtn3 = document.createElement('input');
  newCalcBtn3.setAttribute("type", "button");
  newCalcBtn3.setAttribute("id", "btn1");
  newCalcBtn3.setAttribute("value", "3");
  newCalcBtn3.setAttribute("onClick", "document." + avaliableBox + "calculator.ans.value+='3'");
  calcTextField.appendChild(newCalcBtn3);

  var newCalcBtnN = document.createElement('input');
  newCalcBtnN.setAttribute("type", "button");
  newCalcBtnN.setAttribute("class", "btn5");
  newCalcBtnN.setAttribute("value", "-");
  newCalcBtnN.setAttribute("onClick", "document." + avaliableBox + "calculator.ans.value+='-'");
  calcTextField.appendChild(newCalcBtnN);



  var newCalcBtnC = document.createElement('input');
  newCalcBtnC.setAttribute("type", "reset");
  newCalcBtnC.setAttribute("class", "btn3");
  newCalcBtnC.setAttribute("id", "clear");
  newCalcBtnC.setAttribute("value", "C");
  calcTextField.appendChild(newCalcBtnC);

  var newCalcBtn0 = document.createElement('input');
  newCalcBtn0.setAttribute("type", "button");
  newCalcBtn0.setAttribute("id", "btn1");
  newCalcBtn0.setAttribute("class", "btn4");
  newCalcBtn0.setAttribute("value", "0");
  newCalcBtn0.setAttribute("onClick", "document." + avaliableBox + "calculator.ans.value+='0'");
  calcTextField.appendChild(newCalcBtn0);

  var newCalcBtnDOT = document.createElement('input');
  newCalcBtnDOT.setAttribute("type", "button");
  newCalcBtnDOT.setAttribute("class", "btn3");
  newCalcBtnDOT.setAttribute("value", ".");
  newCalcBtnDOT.setAttribute("onClick", "document." + avaliableBox + "calculator.ans.value+='.'");
  calcTextField.appendChild(newCalcBtnDOT);

  var newCalcBtnP = document.createElement('input');
  newCalcBtnP.setAttribute("type", "button");
  newCalcBtnP.setAttribute("class", "btn6");
  newCalcBtnP.setAttribute("value", "+");
  newCalcBtnP.setAttribute("onClick", "document." + avaliableBox + "calculator.ans.value+='+'");
  calcTextField.appendChild(newCalcBtnP);


  var newCalcBtnRE = document.createElement('input');
  newCalcBtnRE.setAttribute("type", "button");
  newCalcBtnRE.setAttribute("value", "<");
  newCalcBtnRE.setAttribute("onClick", "document." + avaliableBox + "calculator.ans.value=document." + avaliableBox + "calculator.ans.value.substring(0,document." + avaliableBox + "calculator.ans.value.length*1 -1)");
  calcTextField.appendChild(newCalcBtnRE);



  var newCalcBtnEQUAL = document.createElement('input');
  newCalcBtnEQUAL.setAttribute("type", "button");
  newCalcBtnEQUAL.setAttribute("id", "answ");
  newCalcBtnEQUAL.setAttribute("value", "=");
  newCalcBtnEQUAL.setAttribute("onClick", "document." + avaliableBox + "calculator.ans.value=eval(document." + avaliableBox + "calculator.ans.value)");
  calcTextField.appendChild(newCalcBtnEQUAL);
}

$(document).ready(calcSelected)
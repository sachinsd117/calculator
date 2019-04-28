class MyCalculator {
  
  constructor(containerClass) {
    this.selectedValues = [];
    this.containerClass = document.getElementsByClassName(containerClass)[0];
    this.displayElement = this.containerClass.getElementsByClassName('calsDisplay')[0];
    this.setUpBtns();
  }
  
  //Function called on Number and arithematic value selection
  setUpBtns() {
      let newBtn = this.containerClass.getElementsByClassName("digitalBtn");
      let arithmaticList = ['1', '2', '3', '+', '-', '4', '5', '6', '*', '/', '7', '8', '9', '0', '00'];
      var self = this;
      for(var i=0; i < newBtn.length; i++){
       (function(index) {
         newBtn[index].addEventListener("click", function() { self.onCalcBtnPress(arithmaticList[index]); })
         })(i); 
      }
      // clear btn
      this.clearDisplayBtn = this.containerClass.getElementsByClassName("clearDisplay")[0];
      this.clearDisplayBtn.addEventListener("click", function() { self.clearCalc(); });

      // calculate btn
      this.getTotal = this.containerClass.getElementsByClassName("getTotal")[0];
      this.getTotal.addEventListener("click", function() { self.calcTotal(); });
  }

  onCalcBtnPress(selectedValue){
    var lastIndex = this.selectedValues.length - 1;
 
    //If arithematic value is selected
    if(isNaN(selectedValue)){
      
      if(isNaN(this.selectedValues[lastIndex])){
        this.selectedValues[lastIndex] = selectedValue;
      }else{
        this.selectedValues.push(selectedValue);
      }
      
    //If selected value is number
    }else{
      
      if(lastIndex != -1 && !isNaN(this.selectedValues[lastIndex])){
        var selectedValueStr = this.selectedValues[lastIndex]+''+selectedValue;
        this.selectedValues[lastIndex] = parseInt(selectedValueStr);
      }else{
        
        this.selectedValues.push(selectedValue);
      }
      
    }
    
    this.displayElement.innerText = this.selectedValues.join(' ');
  }
  
  //Function for clear button
  clearCalc(){
    this.displayElement.innerText = '0';
    this.selectedValues = [];
  }
  
  //Function for calculation on equalto/submit button press
  calcTotal(){
    
    if(this.selectedValues.length == 0) return;
    
    var grandTotal = this.selectedValues[0];
    
    var selectedValLength = this.selectedValues.length;
    
    var operation = {
      '+' : function(a,b){ return parseInt(a) + parseInt(b); },
      '-' : function(a,b){ return a - b; },
      '*' : function(a,b){ return a * b; },
      '/' : function(a,b){ return a / b; }
    }
    
    
    for(var i=0; i < selectedValLength; i++){
      var currentValue = this.selectedValues[i];
      var value2 = 0;
      if(isNaN(currentValue)){
        value2 = this.selectedValues[i+1];
        
        if(typeof(value2) != 'undefined'){
          
          grandTotal = operation[currentValue](grandTotal, value2);
        
        }else{
          this.selectedValues.pop();
        }
        
      }
      
    }
    
    this.displayElement.innerText = grandTotal;
    this.selectedValues = [grandTotal];
    
  }
  
}

var calculatorApp1 = new MyCalculator("calculatorApp1");

var calculatorApp2 = new MyCalculator("calculatorApp2");
    
    
/*
  var selectedValues = []; //Number and arithematic values stored in this array

    //Element to display output
    var displayElement = document.getElementById('calcText');

    //Function called on Number and arithematic value selection
    var onCalcBtnPress = function (selectedValue) {

        var lastIndex = selectedValues.length - 1;

        //If arithematic value is selected
        if (isNaN(selectedValue)) {

            if (isNaN(selectedValues[lastIndex])) {
                selectedValues[lastIndex] = selectedValue;
            } else {
                selectedValues.push(selectedValue);
            }

            //If selected value is number
        } else {

            if (lastIndex != -1 && !isNaN(selectedValues[lastIndex])) {
                selectedValueStr = selectedValues[lastIndex] + '' + selectedValue;
                selectedValues[lastIndex] = parseInt(selectedValueStr);
            } else {

                selectedValues.push(selectedValue);
            }

        }

        displayElement.innerText = selectedValues.join(' ');
    }

    //Function for clear button
    var clearCalc = function () {
        displayElement.innerText = '0';
        selectedValues = [];
    }

    //Function for calculation on equalto/submit button press
    var calcTotal = function () {

        if (selectedValues.length == 0) return;

        var grandTotal = selectedValues[0];

        var selectedValLength = selectedValues.length;

        var operation = {
            '+': function (a, b) { return parseInt(a) + parseInt(b); },
            '-': function (a, b) { return parseInt(a) - parseInt(b); },
            '*': function (a, b) { return parseInt(a) * parseInt(b); },
            '/': function (a, b) { return parseInt(a) / parseInt(b); }
        }


        for (var i = 0; i < selectedValLength; i++) {
            var currentValue = selectedValues[i];
            var value2 = 0;
            if (isNaN(currentValue)) {
                value2 = selectedValues[i + 1];

                if (typeof (value2) != 'undefined') {

                    grandTotal = operation[currentValue](grandTotal, value2);

                } else {
                    selectedValues.pop();
                }

            }

        }

        displayElement.innerText = grandTotal;
        selectedValues = [grandTotal];

    }
    */
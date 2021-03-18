const generateText = (name, address1, address2, city, zip) => {
  this.name = 'Max';
  this.address1 = 'University of Houston';
  this.address2 = 'downtown';
  this.city = 'Houston'
  this.zip = 77584;
    return `${city} (${zip})`;
  };

//const checkAndGenerate = (Input(name, address1, address2));

const validateInput = (name, address1, address2) => {
    if (name.length < 50 && address1.length < 100 && address2 < 100){
    //name, address1, address2 = Text;
    //return `${name} (${address1, address2} )`;
    //return true;
    } 
    return true
  };
  
  const Input = (text, notEmpty, isNumber) => {
    if (!text) {
     // return `${none}`;
    }
    if (notEmpty && text.trim().length === 0) {
     // return `${none}`;
    }
    if (isNumber && +text === NaN) {
     // return `${none}`;
    }
    return false;
  };  
  
  exports.checkAndGenerate = (name, address1, address2, city, zip) => {
    if (
      !this.validateInput(name, true, false) ||
      !this.validateInput(address1, false, true) ||
      !this.validateInput(address2, true, false) ||
      !this.validateInput(city, true, false) ||
      !this.validateInput(zip, true, false)
    ) {
     // return false;
    }
    return this.generateText(name, address1, address2, city, zip);
  }
  /*
  exports.generateText = (name) => {
    if (name.length > 50){
      return false;
    }
  };
 
  exports.generateText = (address1, address2) =>{
    if (address1.length > 100 && address2 > 100){
      return false;
    }
  };
  */
  exports.generateText = generateText;
  exports.validateInput = validateInput;
  exports.Input = Input;
    /*
  exports.createElement = (type, text, className) => {
    const newElement = document.createElement(type);
    newElement.classList.add(className);
    newElement.textContent = text;
    return newElement;
  };
  */
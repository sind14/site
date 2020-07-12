function checkNumber(number){
    if (number < 10) {
      return "0" + number;
    } else {
      return number;
    }
  }

function checkNumber2(number){
    if (number < 10) {
        return "000" + number;
    }else if (number < 100) {
        return "00" + number;
    }else if (number < 1000) {
        return "0" + number;
    }else {
        return number;
    }
}

  
  function upload(file) {
  
    let xhr = new XMLHttpRequest();
  
    // обработчики успеха и ошибки
    // если status == 200, то это успех, иначе ошибка
    xhr.onload = xhr.onerror = function() {
      if (this.status == 200) {
        alert("Plik zostal zaladowany");
      } else {
        alert("Plik nie zostal zaladowany");
      }
    };
    let orderNumber = document.getElementById("orderNumber");
    let date = new Date();
    let firstNumber = "" + date.getFullYear() + checkNumber(date.getMonth() + 1) + checkNumber(date.getDate());
    let secondNumber = "" + checkNumber(date.getHours()) + checkNumber(date.getMinutes()) + checkNumber(date.getSeconds());
    let thirdNumber =  checkNumber2(orderNumber.value);
    let katalogName = firstNumber + "_" + secondNumber + "_" + thirdNumber;
    console.log(katalogName);
    xhr.open("POST", `serverAdress/${katalogName}`, true);
    console.log(file);
    xhr.send(file);
  
  }
  document.forms.upload.onsubmit = function() {
    let input = this.elements.myfile;
    let file = input.files[0];
    if (file) {
      upload(file);
    }
    return false;
  }
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
  document.forms.upload.onsubmit = function(e) {
    e.preventDefault();
    //let input = this.elements.myfile;
    let input = document.getElementById("targetinput");
    let file = input.files[0];
    if (file) {
      upload(file);
    }
    return false;
  }








  document.querySelectorAll(".drop-zone__input").forEach(inputElement => {
    const dropZoneElemnt = inputElement.closest(".drop-zone");
  
  
  
    dropZoneElemnt.addEventListener("click", e => {
        inputElement.click();
    });
  
    inputElement.addEventListener("change", e => {
        if (inputElement.files.length) {
            updateThumbnail(dropZoneElemnt, inputElement.files[0]);
        }
    });
  
    dropZoneElemnt.addEventListener("dragover", e => {
        e.preventDefault();
        dropZoneElemnt.classList.add("drop-zone--over");
    });
  
    ["dragleave", "dragend"].forEach(type => {
        dropZoneElemnt.addEventListener(type, e => {
            dropZoneElemnt.classList.remove("drop-zone--over");
        });
    });
  
  
    dropZoneElemnt.addEventListener("drop", e => {
      e.preventDefault();
       
  
      if (e.dataTransfer.files.length) {
          inputElement.files = e.dataTransfer.files;
          updateThumbnail(dropZoneElemnt, e.dataTransfer.files[0]);
      }
  
      dropZoneElemnt.classList.remove("drop-zone--over");
    });
  });
  
  function updateThumbnail(dropZoneElement, file) {
      let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
      
   //убираем промпт
      if (dropZoneElement.querySelector(".drop-zone__prompt")) {
          dropZoneElement.querySelector(".drop-zone__prompt").remove();
      }
  
  // 1 раз -це не thumbnailElement так шо давайте його зробимо
      if (!thumbnailElement) {
          thumbnailElement = document.createElement("div");
          thumbnailElement.classList.add("drop-zone__thumb");
          dropZoneElement.appendChild(thumbnailElement);
      }
      thumbnailElement.dataset.label = file.name;
      if (file.type.startsWith("image/")) {
          const reader = new FileReader();
  
          reader.readAsDataURL(file);
          reader.onload = () => {
              thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
          };
      }
  }
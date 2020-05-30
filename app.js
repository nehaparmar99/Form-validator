//THIS IS REFACTORED CODE OF BASIC IF ELSE CHECKING SO THAT IT CAN BE USED FOR LARGE INPUTS

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//show input error msg
function showError(input, message) {
  //outline ip with red
  //fetches parent class-form control div
  const formcontrol = input.parentElement;
  formcontrol.className = "form-control error";
  const small = formcontrol.querySelector("small");
  small.innerText = message;
}
//show success outline
function showSuccess(input, message) {
  const formcontrol = input.parentElement;
  formcontrol.className = "form-control success";
}

//email validity
function checkemail(input) {
  //use regex
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

//check required fields
function checkrequired(inputArr) {
  //loop through array and check each one
  //use high order array method
  //foreach loops through the array,we could also use for loop
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be atleast ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}
//password should have atleast 1 number in it
// function checknumber(input) {
//   const n = input.value.length;
//   const flag = 0;
//   for (let i = 0; i < n; i++) {
//     if (input.value.charAt(i) >= 0 && input.value.charAt(i) <= 9) flag = 1;
//   }
//   if (flag === 0) showError(input, "Password should contain atleast 1 number");
// }

//check password match
function checkpassword(input1, input2) {
  if (input1.value != input2.value) {
    showError(input2, "Passwords do not match");
  }
}

//get fieldname
function getFieldName(input) {
  //capitalise 1st letter
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event listeners
form.addEventListener("submit", function (e) {
  //prevents form from submitting
  e.preventDefault();
  checkrequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  // checknumber(password);
  checkemail(email);
  checkpassword(password, password2);
});

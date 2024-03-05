// Exercise 6

const form = document.getElementById("form_checkout");
if (form) {
  form.addEventListener("submit", (eve) => {
    eve.preventDefault();
  });
}

const soloLetras = /^[a-zA-Z]+$/;
const soloNumeros = /^[0-9]+$/;
const letrasYNuemeros = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function emptyField(input) {
  return input.value == "";
}

function matchRegExp(input, regExp) {
  return input.value.match(regExp);
}
function minimumThreeLetters(input) {
  return input.value.length < 3;
}
function styleChange(input, color) {
  input.style.border = `1px solid ${color}`;
}
function viewError(error, valid) {
  if (valid) {
    error.classList.add("invalid-feedback");
  } else {
    error.classList.remove("invalid-feedback");
  }
}
function validateInput(element, regExp, errorName, error) {
  // Get the input fields
  const elementId = document.getElementById(element);
  // Get the error elements
  var errorName = document.getElementById(errorName);
  if (
    emptyField(elementId) ||
    minimumThreeLetters(elementId) ||
    (regExp && !matchRegExp(elementId, regExp))
  ) {
    error++;
    styleChange(elementId, "red");
    viewError(errorName, false);
  } else {
    styleChange(elementId, "green");
    viewError(errorName, true);
  }
}
function viewAlertError(error) {
  if (error > 0) {
    alert("Error");
  } else {
    alert("OK");
  }
}
function validate() {
  var error = 0;

  // Validate fields entered by the user: name, phone, password, and email

  validateInput("fName", soloLetras, "errorName", error);

  validateInput("fEmail", formatoEmail, "errorEmail", error);

  validateInput("fAddress", false, "errorAddress", error);

  validateInput("fLastN", soloLetras, "errorLastN", error);

  validateInput("fPassword", letrasYNuemeros, "errorPassword", error);

  validateInput("fPhone", soloNumeros, "errorPhone", error);

  viewAlertError(error);
}

// Get the input fields
var password = document.querySelector(".password");
var phone = document.querySelector(".phone");
var firstName = document.querySelector(".firstName");

// Get the error elements
var errorPassword = document.getElementById("errorPassword");
var errorName = document.getElementById("errorName");
var errorPhone = document.getElementById("errorPhone");

// Exercise 6
function validate() {}

(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          alert("Congrats, your order is on the way!");
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

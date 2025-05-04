document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    // Prevent form submission
    event.preventDefault();

    // Clear previous error messages
    clearErrors();

    // Validate form
    if (validateForm()) {
      // Form is valid, you can submit it or send data to server
      alert("Form submitted successfully!");
      // Uncomment to actually submit the form
      // this.submit();
    }
  });

function validateForm() {
  let isValid = true;
  const form = document.getElementById("registrationForm");

  // Validate first name
  const firstName = form.elements["firstname"].value.trim();
  if (firstName.length < 2) {
    showError("firstname-error", "First name must be at least 2 characters");
    isValid = false;
  }

  // Validate last name
  const lastName = form.elements["lastname"].value.trim();
  if (lastName.length < 2) {
    showError("lastname-error", "Last name must be at least 2 characters");
    isValid = false;
  }

  // Validate email
  const email = form.elements["email"].value.trim();
  if (!isValidEmail(email)) {
    showError("email-error", "Please enter a valid email address");
    isValid = false;
  }

  // Validate password
  const password = form.elements["password"].value;
  if (!isValidPassword(password)) {
    showError(
      "password-error",
      "Password must contain at least one number, one uppercase and lowercase letter, and be at least 8 characters long"
    );
    isValid = false;
  }

  // Validate confirm password
  const confirmPassword = form.elements["confirmPassword"].value;
  if (passwordassword !== confirmPassword) {
    showError("confirmPassword-error", "Passwords do not match");
    isValid = false;
  }

  return isValid;
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isValidPassword(password) {
  // At least one number, one uppercase and lowercase letter, and at least 8 characters
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
}

function showError(id, message) {
  const errorElement = document.getElementById(id);
  errorElement.textContent = message;
}

function clearErrors() {
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((element) => {
    element.textContent = "";
  });
}

// Real-time validation for confirm password
document
  .getElementById("registrationForm")
  .elements["confirmPassword"].addEventListener("input", function () {
    const password =
      document.getElementById("registrationForm").elements["password"].value;
    const confirmPassword = this.value;
    const errorElement = document.getElementById("confirmPassword-error");

    if (password !== confirmPassword) {
      errorElement.textContent = "Passwords do not match";
    } else {
      errorElement.textContent = "";
    }
  });

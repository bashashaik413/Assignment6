document.addEventListener('DOMContentLoaded', function() {
  // Handle Login Form Submission
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission

      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      // Simple validation
      if (email === '' || password === '') {
        displayError('Please fill in all fields.');
        return;
      }

      // Example of successful login submission
      showConfirmation('Login successful! Redirecting...');
      // Replace with actual logic, e.g., AJAX request
      setTimeout(() => {
        window.location.href = 'index.html'; // Redirect to home page
      }, 2000); // Redirect after 2 seconds
    });
  }

  // Handle Registration Form Submission
  const registrationForm = document.getElementById('registration-form');
  if (registrationForm) {
    registrationForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission

      const name = document.getElementById('reg-name').value;
      const email = document.getElementById('reg-email').value;
      const password = document.getElementById('reg-password').value;
      const confirmPassword = document.getElementById('reg-confirm-password').value;

      // Simple validation
      if (name === '' || email === '' || password === '' || confirmPassword === '') {
        displayError('Please fill in all fields.');
        return;
      }
      if (password !== confirmPassword) {
        displayError('Passwords do not match.');
        return;
      }

      // Example of successful registration submission
      showConfirmation('Thanks for registering! Redirecting...');
      // Replace with actual logic, e.g., AJAX request
      setTimeout(() => {
        window.location.href = 'login.html'; // Redirect to login page
      }, 2000); // Redirect after 2 seconds
    });
  }

  function displayError(message) {
    alert(message);
  }

  function showConfirmation(message) {
    // Create a div element for the confirmation message
    const confirmationDiv = document.createElement('div');
    confirmationDiv.className = 'confirmation-message';
    confirmationDiv.innerText = message;
    
    // Append the confirmation message to the body
    document.body.appendChild(confirmationDiv);
    
    // Remove the message after a few seconds
    setTimeout(() => {
      confirmationDiv.remove();
    }, 3000); // Remove after 3 seconds
  }
});

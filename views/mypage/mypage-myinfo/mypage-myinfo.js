// Get references to the input fields and buttons
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const passwordCheckInput = document.querySelector('#password-check');
const nameEditButton = document.querySelector('.name-edit');
const emailEditButton = document.querySelector('.email-edit');
const passwordEditButton = document.querySelector('.password-edit');
const deleteAccountButton = document.querySelector('.delete-account');

// Add event listeners to the buttons
nameEditButton.addEventListener('click', editName);
emailEditButton.addEventListener('click', editEmail);
passwordEditButton.addEventListener('click', editPassword);
deleteAccountButton.addEventListener('click', deleteAccount);

// Function to edit the name
function editName() {
  const newName = nameInput.value;
  // Send a request to the server to update the name using the JWT token in the header
  // Example using fetch API:
  fetch('/update-name', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, // Include the JWT token from local storage in the header
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: newName })
  })
  .then(response => {
    // Handle the response
    if (response.ok) {
      // Name updated successfully
      console.log('Name updated');
    } else {
      // Error updating name
      console.error('Failed to update name');
    }
  })
  .catch(error => {
    console.error('An error occurred while updating name:', error);
  });
}

// Function to edit the email
function editEmail() {
  const newEmail = emailInput.value;
  // Send a request to the server to update the email using the JWT token in the header
  // Example using fetch API:
  fetch('/update-email', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, // Include the JWT token from local storage in the header
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: newEmail })
  })
  .then(response => {
    // Handle the response
    if (response.ok) {
      // Email updated successfully
      console.log('Email updated');
    } else {
      // Error updating email
      console.error('Failed to update email');
    }
  })
  .catch(error => {
    console.error('An error occurred while updating email:', error);
  });
}

// Function to edit the password
function editPassword() {
  const newPassword = passwordInput.value;
  const newPasswordCheck = passwordCheckInput.value;

  if (newPassword !== newPasswordCheck) {
    // Password and password-check do not match
    console.error('Passwords do not match');
    return;
  }

  // Send a request to the server to update the password using the JWT token in the header
  // Example using fetch API:
  fetch('/update-password', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, // Include the JWT token from local storage in the header
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: newPassword })
  })
  .then(response => {
    // Handle the response
    if (response.ok) {
      // Password updated successfully
      console.log('Password updated');
    } else {
      // Error updating password
      console.error('Failed to update password');
    }
  })
  .catch(error => {
    console.error('An error occurred while updating password:', error);
  });
}

// Function to delete the account
function deleteAccount() {
  // Send a request to the server to delete the account using the JWT token in the header
  // Example using fetch API:
  fetch('/delete-account', {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, // Include the JWT token from local storage in the header
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    // Handle the response
    if (response.ok) {
      // Account deleted successfully
      console.log('Account deleted');
      // Perform any necessary actions after deleting the account, such as redirecting to another page
    } else {
      // Error deleting account
      console.error('Failed to delete account');
    }
  })
  .catch(error => {
    console.error('An error occurred while deleting account:', error);
  });
}

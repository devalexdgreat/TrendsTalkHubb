function togglePasswordVisibility(inputId) {
    const inputField = document.getElementById(inputId);
    if (inputField) {
      if (inputField.type === 'password') {
        inputField.type = 'text';
      } else {
        inputField.type = 'password';
      }
    }
  }
  
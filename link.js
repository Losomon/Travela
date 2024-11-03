// Function to toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const passwordType = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = passwordType;
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulate a login (replace with actual authentication logic)
    if (email && password) {
        // Save the login state
        localStorage.setItem('isLoggedIn', 'true');
        // Redirect to the home page
        window.location.href = 'i.html'; // Change this to your home page
    }
}

// Function to check if the user is already logged in
function checkLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        // Redirect to login page if not logged in
        window.location.href = 'link.html'; // Change to your login page URL
    }
}

// Function to log out
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'link.html'; // Redirect to the login page
}

// Call checkLogin when the page loads
window.onload = checkLogin;

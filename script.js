




// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Login Function
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const remember = document.querySelector('input[type="checkbox"]')?.checked || false;

    // Validation
    if (!username || !password) {
        showError("Please fill in all fields");
        return;
    }

    // Check credentials
    const storedUser = localStorage.getItem(username);
    if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.password === password) {
            if (remember) {
                localStorage.setItem("rememberedUser", username);
            } else {
                localStorage.removeItem("rememberedUser");
            }
            localStorage.setItem("loggedUser", username);
            window.location.href = "index.html";
            return;
        }
    }
    
    showError("Invalid username or password");
}

// Register Function
function register() {
    const username = document.getElementById("new-username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Validation
    if (!username || !email || !password || !confirmPassword) {
        showError("Please fill in all fields");
        return;
    }

    if (username.length < 3) {
        showError("Username must be at least 3 characters long");
        return;
    }

    if (!isValidEmail(email)) {
        showError("Please enter a valid email address");
        return;
    }

    if (password.length < 6) {
        showError("Password must be at least 6 characters long");
        return;
    }

    if (password !== confirmPassword) {
        showError("Passwords do not match");
        return;
    }

    // Check if username exists
    if (localStorage.getItem(username)) {
        showError("Username already exists!");
        return;
    }

    // Save user data
    localStorage.setItem(username, JSON.stringify({ password, email }));
    alert("Account created successfully! Please login.");
    clearForm('registerForm');
    window.location.href = "login.html";
}

// Forgot Password Function
function forgotPassword() {
    const email = document.getElementById("forgot-email").value.trim();

    if (!email) {
        showError("Please enter your email address");
        return;
    }

    if (!isValidEmail(email)) {
        showError("Please enter a valid email address");
        return;
    }

    // Search for user with this email
    let userFound = false;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== 'loggedUser' && key !== 'rememberedUser') {
            const userData = JSON.parse(localStorage.getItem(key));
            if (userData.email === email) {
                userFound = true;
                // In a real application, you would send a reset link to the email
                alert("Password reset link has been sent to your email address");
                window.location.href = "login.html";
                return;
            }
        }
    }

    if (!userFound) {
        showError("No account found with this email address");
    }
}

// Reset Password Function
function resetPassword() {
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const token = new URLSearchParams(window.location.search).get('token');

    if (!newPassword || !confirmPassword) {
        showError("Please fill in all fields");
        return;
    }

    if (newPassword.length < 6) {
        showError("Password must be at least 6 characters long");
        return;
    }

    if (newPassword !== confirmPassword) {
        showError("Passwords do not match");
        return;
    }

    // In a real application, you would validate the token and update the password
    alert("Password has been reset successfully");
    window.location.href = "login.html";
}

// Logout Function
function logout() {
    // Clear all session data
    localStorage.removeItem("loggedUser");
    
    // Only clear remembered user if "Remember me" wasn't checked
    if (!document.querySelector('input[type="checkbox"]')?.checked) {
        localStorage.removeItem("rememberedUser");
    }
    
    // Clear all form fields before redirecting
    clearForm('loginForm');
    window.location.href = "login.html";
}

// Clear Form Fields
function clearForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        const inputs = form.getElementsByTagName('input');
        for (let input of inputs) {
            input.value = '';
        }
    }
}

// Email validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Show error messages
function showError(message) {
    alert(message); // You can replace this with a more elegant error display
}

// Initialize page
document.addEventListener("DOMContentLoaded", function() {
    // Clear any existing form data first
    const forms = document.getElementsByTagName('form');
    for (let form of forms) {
        clearForm(form.id);
    }

    // Check if we're on the login page
    if (window.location.pathname.includes('login.html')) {
        const rememberedUser = localStorage.getItem("rememberedUser");
        const loginForm = document.getElementById("loginForm");
        
        if (rememberedUser && loginForm) {
            const usernameInput = document.getElementById("username");
            const rememberCheckbox = document.querySelector('input[type="checkbox"]');
            
            if (usernameInput && rememberCheckbox) {
                usernameInput.value = rememberedUser;
                rememberCheckbox.checked = true;
            }
        }
    }

    // Always clear password fields
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => input.value = '');
});


document.getElementById("logoutBtn").addEventListener("click", function() {
    // Input fields ko clear karna
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    // Session ya localStorage se user data hata dena
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    alert("You have been logged out successfully!");
});

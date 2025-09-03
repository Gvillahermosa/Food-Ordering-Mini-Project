document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    // Check the data-show-signup attribute
    const showSignup = container.getAttribute('data-show-signup') === 'True';

    if (showSignup) {
        container.classList.add('active');
    } else {
        container.classList.remove('active');
    }

    // Event listeners for toggling forms
    registerBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default action
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default action
        container.classList.remove("active");
    });
});


// Singleton for LocalStorage Manager
class LocalStorageManager {
    constructor() {
        if (LocalStorageManager.instance) {
            return LocalStorageManager.instance;
        }
        LocalStorageManager.instance = this;
        return this;
    }

    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    load(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
}

const storage = new LocalStorageManager();


function register(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass1').value;

    if(!email.endsWith('.com')){
        return Swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: 'Please enter a valid email address ending with .com',
        });
    }

    if (email && password){
        storage.save("credentials", {email, password});
        Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            text: 'You can now log in with your credentials.',
            timer: 2000,
            showConfirmButton: false
        }).then(() => {location.reload();});
        document.getElementById('email').value = '';
        document.getElementById('pass1').value = '';
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter both email and password!',
        });
    }
}

function login(){
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPass').value;

    const savedCredentials = storage.load("credentials");

    if (savedCredentials && email === savedCredentials.email && password === savedCredentials.password){
        Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'Welcome!',
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            window.location.href = "index.html"; // Redirect to main page
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid email or password. Please try again.',
        });
    }
}

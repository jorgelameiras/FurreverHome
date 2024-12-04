
function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message){
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

function createPasswordRequirements() {
    const requirements = document.createElement('div');
    requirements.className = 'password-requirements';
    requirements.innerHTML = `
        <h3>Password Requirements:</h3>
        <ul>
            <li>At least 8 characters long</li>
            <li>Contains at least one number</li>
            <li>Contains at least one capital letter</li>
            <li>Contains at least one special character (!@#$%^&*()<>,.?":{}|)</li>
        </ul>
    `;
    requirements.style.display = 'none';
    return requirements;
}

//setFormMessage(loginForm, "success", "You're logged in!");

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const forgotPasswordForm = document.querySelector("#forgotPassword");
    const passwordInput = createAccountForm.querySelector("#regPassword");
    
    // Create and append password requirements
    const passwordRequirements = createPasswordRequirements();
    passwordInput.parentElement.appendChild(passwordRequirements);

    // Show password requirements on focus
    passwordInput.addEventListener('focus', () => {
        passwordRequirements.style.display = 'block';
    });

    // Hide password requirements on blur
    passwordInput.addEventListener('blur', () => {
        passwordRequirements.style.display = 'none';
    });

    // Hide/Show Account Creation Form
    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");

    })

    // Hide/Show Account Login Form
    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");

    })

    // Hide/Show Forgot Password Form
    document.querySelector('#linkForgotPassword').addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        forgotPasswordForm.classList.remove("form--hidden");

    })

    // Login Submit Form
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Perform Fetch login here
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
    
        const response = await fetch('http://localhost:5500/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password }),
            // credentials: 'include'
        });
    
        console.log('Response:', response);
        const result = await response.json();
        console.log("LOGIN.JS RESULT:", result.message);

    
        if (response.ok) {
            setFormMessage(loginForm, "success", result.message);
            setTimeout(location.href = "./adopt.html", 100000);
        } else {
            setFormMessage(loginForm, "error", result.message);
        }
    })

    // Create Account Form
    createAccountForm.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        console.log("LOGIN.JS EMAIL:", email);
        console.log("LOGIN.JS PW:", password);
    
        const response = await fetch('http://localhost:5500/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
    
        const result = await response.json();
        console.log("LOGIN.JS RESULT:", result);
        // registerMessage.textContent = result.message;
    
        if (response.ok) {
            setFormMessage(createAccountForm, "success", result.message);
            location.href = "./adopt.html";
        } else {
            setFormMessage(createAccountForm, "error", result.message);
        }
    })
    
    document.querySelectorAll(".form__input").forEach(inputElement =>{

        inputElement.addEventListener("blur", e =>{
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 6){
                setInputError(inputElement, "Username must be at least 6 characters in length");
            }
        });

        inputElement.addEventListener("blur", e => {
            if(e.target.id === "regEmail" && !e.target.value.includes("@")){
                setInputError(inputElement, "Enter a valid email");
            }
        })

        inputElement.addEventListener("blur", e => {
            if (e.target.id === "confirmPassword"){
                if(e.target.value !== passwordInput.value)
                    setInputError(inputElement, "Password does not match");
            }
        })

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        })

        if (inputElement.id === "regPassword") {
            inputElement.addEventListener("input", e => {
                const password = e.target.value;
                const minLength = 8;
                const hasNumber = /\d/;
                const hasSpecialChar = /[!@#$%^&*()<>,.?":{}|]/;
                const hasCapitalLetter = /[A-Z]/;

                const requirements = passwordRequirements.querySelectorAll('li');
                requirements[0].style.color = password.length >= minLength ? 'green' : 'red';
                requirements[1].style.color = hasNumber.test(password) ? 'green' : 'red';
                requirements[2].style.color = hasCapitalLetter.test(password) ? 'green' : 'red';
                requirements[3].style.color = hasSpecialChar.test(password) ? 'green' : 'red';

                if (password.length >= minLength &&
                    hasNumber.test(password) &&
                    hasCapitalLetter.test(password) &&
                    hasSpecialChar.test(password)) {
                    console.log("Password is valid!");
                    clearInputError(inputElement);
                }
            });
        }

    });

    document.querySelectorAll('.password-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const passwordInput = document.getElementById(button.dataset.target);
            const icon = button.querySelector('i');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
});

// const createAccount = document.getElementById('createAccount'); // createAccount id= createAccount
// const loginForm = document.getElementById('login');
// // const registerMessage = document.getElementById('registerMessage');
// // const loginMessage = document.getElementById('loginMessage');
// // const protectedMessage = document.getElementById('protectedMessage');

// let token = null; // Store JWT or session identifier (if needed for server)

// // Handle registration
// createAccount.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const email = document.getElementById('regUsername').value;
//     const password = document.getElementById('regPassword').value;

//     const response = await fetch('http://localhost:5500/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//     });

//     const result = await response.json();
//     registerMessage.textContent = result.message;

//     if (response.ok) {
//         registerMessage.style.color = 'green';
//     } else {
//         registerMessage.style.color = 'red';
//     }
// });

// // Handle login
// loginForm.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const username = document.getElementById('loginUsername').value;
//     const password = document.getElementById('loginPassword').value;

//     const response = await fetch('/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//     });

//     const result = await response.json();
//     loginMessage.textContent = result.message;

//     if (response.ok) {
//         loginMessage.style.color = 'green';
//         token = result.token; // Save token (for JWT-based auth)
//     } else {
//         loginMessage.style.color = 'red';
//     }
// });

// // Handle access to protected route
// accessProtectedButton.addEventListener('click', async () => {
//     const response = await fetch('/protected', {
//         method: 'GET',
//         headers: {
//             'Authorization': token ? `Bearer ${token}` : '', // For JWT-based
//         },
//         credentials: 'include', // Include cookies (for session-based auth)
//     });

//     const result = await response.json();
//     if (response.ok) {
//         protectedMessage.style.color = 'green';
//         protectedMessage.textContent = result.message;
//     } else {
//         protectedMessage.style.color = 'red';
//         protectedMessage.textContent = result.message;
//     }
// });
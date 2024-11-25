
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
    const passwordInput = createAccountForm.querySelector("#enterPassword");
    
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

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");

    })

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");

    })

    document.querySelector('#linkForgotPassword').addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        forgotPasswordForm.classList.remove("form--hidden");

    })

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform AJAX/Fetch login here

        setFormMessage(loginForm, "error", "Invalid username/password comnbination");
    })

    document.querySelectorAll(".form__input").forEach(inputElement =>{

        inputElement.addEventListener("blur", e =>{
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 6){
                setInputError(inputElement, "Username must be at least 6 characters in length");
            }
        });

        inputElement.addEventListener("blur", e => {
            if(e.target.id === "emailAddress" && !e.target.value.includes("@")){
                setInputError(inputElement, "Enter a valid email");
            }
        })

        inputElement.addEventListener("blur", e => {
            if (e.target.id === "confirmPassword"){
                if(e.target.value !== password.value)
                    setInputError(inputElement, "Password does not match");
            }
        })

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        })

        if (inputElement.id === "enterPassword") {
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

    document.addEventListener("DOMContentLoaded", () => {
        const pets = [
            { id: 1, name: "Pet 1", image: "./src/sample_data/pet1.png", type: "dog", age: "puppy", gender: "male" },
            { id: 2, name: "Pet 2", image: "./src/sample_data/pet2.png", type: "cat", age: "adult", gender: "female" },
            { id: 3, name: "Pet 3", image: "./src/sample_data/pet3.png", type: "dog", age: "adult", gender: "male" },
            { id: 4, name: "Pet 4", image: "./src/sample_data/pet4.png", type: "cat", age: "kitten", gender: "female" },
            { id: 5, name: "Pet 5", image: "./src/sample_data/pet5.png", type: "dog", age: "puppy", gender: "female" },
            { id: 6, name: "Pet 6", image: "./src/sample_data/pet6.png", type: "cat", age: "adult", gender: "male" }
        ];
    
        const petGrid = document.getElementById("pet-grid");
    
        function displayPets(petsToDisplay) {
            petGrid.innerHTML = ''; // Clear existing pets
            petsToDisplay.forEach(pet => {
                const petCard = document.createElement("div");
                petCard.classList.add("col-lg-4", "col-md-6", "mb-4");
    
                petCard.innerHTML = `
                    <div class="card h-100">
                        <img src="${pet.image}" class="card-img-top" alt="${pet.name}">
                        <div class="card-body">
                            <h5 class="card-title">${pet.name}</h5>
                            <p class="card-text">This is ${pet.name}. Click "Adopt" to learn more about adopting this pet.</p>
                        </div>
                        <div class="card-footer">
                            <a href="#" class="btn btn-primary btn-block">Adopt</a>
                        </div>
                    </div>
                `;
    
                petGrid.appendChild(petCard);
            });
        }
    
        function applyFilters() {
            const typeFilter = document.getElementById('pet-type').value;
            const ageFilter = document.getElementById('pet-age').value;
            const genderFilter = document.getElementById('pet-gender').value;
    
            const filteredPets = pets.filter(pet => {
                return (typeFilter === '' || pet.type === typeFilter) &&
                       (ageFilter === '' || pet.age === ageFilter) &&
                       (genderFilter === '' || pet.gender === genderFilter);
            });
    
            displayPets(filteredPets);
        }
    
        // Initial display of all pets
        displayPets(pets);
    
        // Add event listener to the filter button
        document.querySelector('.btn-primary').addEventListener('click', applyFilters);
    });
    
});
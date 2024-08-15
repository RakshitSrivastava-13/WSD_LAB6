document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const dob = document.getElementById('dob');
    const submitBtn = document.getElementById('submitBtn');

    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const dobError = document.getElementById('dobError');

    function validateFullName() {
        const regex = /^[A-Za-z\s]{3,}$/;
        if (regex.test(fullName.value)) {
            fullName.classList.remove('invalid');
            fullName.classList.add('valid');
            fullNameError.style.display = 'none';
            return true;
        } else {
            fullName.classList.remove('valid');
            fullName.classList.add('invalid');
            fullNameError.textContent = 'Name must be at least 3 characters long and contain only letters and spaces.';
            fullNameError.style.display = 'block';
            return false;
        }
    }

    function validateEmail() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(email.value)) {
            email.classList.remove('invalid');
            email.classList.add('valid');
            emailError.style.display = 'none';
            return true;
        } else {
            email.classList.remove('valid');
            email.classList.add('invalid');
            emailError.textContent = 'Please enter a valid email address.';
            emailError.style.display = 'block';
            return false;
        }
    }

    function validatePassword() {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (regex.test(password.value)) {
            password.classList.remove('invalid');
            password.classList.add('valid');
            passwordError.style.display = 'none';
            return true;
        } else {
            password.classList.remove('valid');
            password.classList.add('invalid');
            passwordError.textContent = 'Password must be at least 8 characters long and contain both letters and numbers.';
            passwordError.style.display = 'block';
            return false;
        }
    }

    function validateConfirmPassword() {
        if (confirmPassword.value === password.value && confirmPassword.value !== '') {
            confirmPassword.classList.remove('invalid');
            confirmPassword.classList.add('valid');
            confirmPasswordError.style.display = 'none';
            return true;
        } else {
            confirmPassword.classList.remove('valid');
            confirmPassword.classList.add('invalid');
            confirmPasswordError.textContent = 'Passwords do not match.';
            confirmPasswordError.style.display = 'block';
            return false;
        }
    }

    function validateDOB() {
        const today = new Date();
        const birthDate = new Date(dob.value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age >= 18) {
            dob.classList.remove('invalid');
            dob.classList.add('valid');
            dobError.style.display = 'none';
            return true;
        } else {
            dob.classList.remove('valid');
            dob.classList.add('invalid');
            dobError.textContent = 'You must be at least 18 years old.';
            dobError.style.display = 'block';
            return false;
        }
    }

    function validateForm() {
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isDOBValid = validateDOB();

        return isFullNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isDOBValid;
    }

    fullName.addEventListener('input', validateFullName);
    email.addEventListener('input', validateEmail);
    password.addEventListener('input', validatePassword);
    confirmPassword.addEventListener('input', validateConfirmPassword);
    dob.addEventListener('input', validateDOB);

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            alert('Registration successful!');
            form.submit();
        }
    });

    dob.addEventListener('change', function () {
        if (!validateDOB()) {
            submitBtn.disabled = true;
        } else {
            submitBtn.disabled = false;
        }
    });

    form.addEventListener('input', validateForm);
});

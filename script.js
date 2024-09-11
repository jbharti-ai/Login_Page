document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const eyeSlashIcon = document.getElementById('eyeSlashIcon');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const modal = document.getElementById('loginSuccessModal');
    const closeModalBtn = document.querySelector('.close-btn');
    const spinner = document.getElementById('spinner');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        emailError.textContent = '';
        passwordError.textContent = '';

        let hasError = false;

        if (!emailInput.value) {
            emailError.textContent = 'Email is required.';
            emailInput.focus();
            hasError = true;
        } else if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Invalid email format.';
            emailInput.focus();
            hasError = true;
        }

        if (!passwordInput.value) {
            passwordError.textContent = 'Password is required.';
            passwordInput.focus();
            hasError = true;
        } else if (passwordInput.value.length < 6) {
            passwordError.textContent = 'Minimun 6 characters required.';
            passwordInput.focus();
            hasError = true;
        }

        if (hasError) return;

        spinner.style.display = 'inline-block';

        const data = {
            username: emailInput.value,
            password: passwordInput.value
        };

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                openModal();
                console.log('API Response:', result);
            } else {
                emailError.textContent = 'Login failed. Please try again.';
            }
        } catch (error) {
            emailError.textContent = 'An error occurred. Please try again.';
            console.error('API Error:', error);
        } finally {
            spinner.style.display = 'none';
        }
    });

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    togglePassword.addEventListener('click', function () {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.style.display = 'none';
            eyeSlashIcon.style.display = 'inline';
        } else {
            passwordInput.type = 'password';
            eyeIcon.style.display = 'inline';
            eyeSlashIcon.style.display = 'none';
        }
    });

    function openModal() {
        modal.style.display = 'block';
    }

    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

const login = async function (event) {
    event.preventDefault();

    const email = document.querySelector('#email-login');
    const password = document.querySelector('#password-login');

    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to login');
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', login);

const signup = async function (event) {
    event.preventDefault();

    const username = document.querySelector('#name-signup');
    const password = document.querySelector('#password-signup');
    const email = document.querySelector('#email-signup')

    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            name: username.value,
            email: email.value,
            password: password.value,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to sign up');
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signup);
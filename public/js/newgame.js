const newGame = async function (event) {
    event.preventDefault();

    const date = document.querySelector('#date').value;
    const time = document.querySelector('#time').value;
    const dateTime = `${date}, ${time}`

    await fetch(`/api/games`, {
        method: 'POST',
        body: JSON.stringify({
            dateTime,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    document.location.replace('/');
};

document
    .querySelector('#new-game-form')
    .addEventListener('submit', newGame);
const newGame = async function (event) {
    event.preventDefault();

    const rawDate = document.querySelector('#date').value;
    const time = document.querySelector('#time').value;
    const courtId = document.getElementById('court-id').value;
    const date = `${rawDate}, ${time}`

    await fetch('/api/games', {
        method: 'POST',
        body: JSON.stringify({
            date,
            courtId
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    //document.location.replace('/');
};

document
    .querySelector('#new-game-form')
    .addEventListener('submit', newGame);
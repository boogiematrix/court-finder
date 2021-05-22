const joinGame = async function (event) {
    event.preventDefault();

    const gameId = document.getElementById('game-id').value;

    if (body) {
        await fetch('/api/users/join', {
            method: 'POST',
            body: JSON.stringify({
                gameId,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        document.location.reload();
    }
};

document
    .querySelector('#join-game')
    .addEventListener('submit', joinGame);
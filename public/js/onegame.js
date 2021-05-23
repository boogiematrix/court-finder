const joinGame = async function (event) {
    event.preventDefault();

    const game_id = document.getElementById('game-id').value;
    console.log(game_id)
    if (game_id) {
        await fetch('/api/users/join', {
            method: 'POST',
            body: JSON.stringify({
                game_id,
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
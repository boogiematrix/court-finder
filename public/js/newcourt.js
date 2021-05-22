const newCourt = async function (event) {
    event.preventDefault();

    const street = document.querySelector('#street').value;
    const city = document.querySelector('#city').value;
    const zip = document.querySelector('#zip').value;
    const hasLights = document.querySelector('input[name="hasLights"]:checked').value;;

    const address = `${street}+${city}+${zip}`.replaceAll(' ', '+')
    


    await fetch(`/api/courts`, {
        method: 'POST',
        body: JSON.stringify({
            address,
            hasLights,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    document.location.replace('/');
};

document
    .querySelector('#new-court-form')
    .addEventListener('submit', newCourt);
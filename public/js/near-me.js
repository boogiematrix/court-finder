const courtNearMe = async function (event) {
    event.preventDefault();

    const rawAddress = document.querySelector('#address').value;
    const address = rawAddress.replaceAll(' ', '+').replaceAll(',', '')

    /*await fetch(`/nearme/${address}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });*/

    document.location.replace(`nearme/${address}`);
};

document
    .querySelector('#address-form')
    .addEventListener('submit', courtNearMe);
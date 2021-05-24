const axios = require('axios');
const courtdata = [
    {
        name: 'Powderhorn',
        address: '620+W+34th+St+Minneapolis+MN',
        hasLights: 'false',
        creator: 'Bijan',
    },
    {
        name: 'Mac-Groveland',
        address: '1987+Sargent+Ave+St+Paul+MN',
        hasLights: 'true',
        creator: 'Dan',
    },
    {
        name: 'Pershing Park',
        address: '4899+Chowen+Ave+S+#4801+Minneapolis+MN',
        hasLights: 'false',
        creator: 'Bijan',
    },
];
const courtAdds = courtdata[0].address + '|' + courtdata[1].address + '|' + courtdata[2].address
function getDistance(range, originAdr, courtAdr) {
    const courtsinArea = []; axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + originAdr + '&destinations=' + courtAdr + '&key=AIzaSyAexWk-s7fGhAtV1jikHnncG5syH41GJ1E')
        .then(response => {
            const courts = response.data.rows;
            for (var i = 0; i < courts.length; i++) {
                if (courts[i].elements[0].distance.value < range * 5280) { courtsinArea.push(i) }
            }
        })
        .catch(error => {
            console.log(error);
        });
}
//console.log (courtdata[0].name)
//getDistance(10, '1336+Lincoln+Ave+Saint+Paul+MN', courtAdds)
//console.log(courtsinArea)
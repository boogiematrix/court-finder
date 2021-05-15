const { Court } = require('../models');

const courtdata = [
  {
    name: 'Powderhorn',  
    address: '620 W 34th St, Minneapolis, MN 55408',
    hasLights: 'false',
    creator: 'Bijan',
  },
  {
    name:'Mac-Groveland',  
    address: '1987 Sargent Ave, St Paul, MN 55105',
    hasLights: 'true',
    creator:'Dan',
  },
  {
    name:'Pershing Park',  
    address: '4899 Chowen Ave S #4801, Minneapolis, MN 55410',
    hasLights: 'false',
    creator: 'Bijan',
  },
];

const seedCourt = () => Court.bulkCreate(courtdata);

module.exports = seedCourt;

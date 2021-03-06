const axios = require('axios');
const courtdata = [
    {
      name: 'Powderhorn',  
      address: '620+W+34th+St+Minneapolis+MN',
      hasLights: 'false',
      creator: 'Bijan',
    },
    {
      name:'Mac-Groveland',  
      address: '1987+Sargent+Ave+St+Paul+MN',
      hasLights: 'true',
      creator:'Dan',
    },
    {
      name:'Pershing Park',  
      address: '4899+Chowen+Ave+S+#4801+Minneapolis+MN',
      hasLights: 'false',
      creator: 'Bijan',
    },
  ];
//const courtAdds=courtdata[0].address+'|'+courtdata[1].address+'|'+courtdata[2].address
const getDistance= async(range, originAdr, courtAdr)=> {
  let courtAdrString = '';
  for (let i = 0; i < courtAdr.length; i++) {
    courtAdrString += `${courtAdr[i].address}|`;
    //console.log(`courts:${courtAdrString}`)
  }
  //console.log(`courts:${courtAdrString}`)
  courtAdrString.slice(-1)
  try {
        const resp = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json',
        {params:
            {units: 'imperial',
            origins:originAdr,
            destinations:courtAdrString,
            key:'AIzaSyAexWk-s7fGhAtV1jikHnncG5syH41GJ1E'}})
    
    
        const courtsinArea=[]
        let courts=resp.data.rows[0].elements
        
        
        for (let i=0; i<courts.length;i++)
        { if
            (courts[i].distance.value<range*5280)
            {courtsinArea.push(courtAdr[i]);}}  
        return courtsinArea   
    }
  
    catch (err) {
        console.error(err);
        };
  
}
     

module.exports = getDistance


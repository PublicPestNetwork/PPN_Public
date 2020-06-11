var HashNet = require('../models/hashnet.js');
var creds = require('../config.json');

// Normally would have api calls for this //
const zipDB = {
    '45101': "38.672,-83.757",
    '45102': "39.023,-84.210",
    '45103': "39.083,-84.153",
    '45105': "38.750,-83.613",
    '45106': "38.956,-84.081",
    '45107': "39.294,-83.976",
    "40350": "38.304,-83.874",
    '40351': "38.304,83.874",
    '40353': "38.061,-83.930",
    '40355': "38.606,-84.828",
    '40356': "37.884,-84.571",
    '40357': "38.146,-84.108",
    '40358': "38.058,83.685",
    '40359': "38.468,-84.810",
    '40501': "38.038,-84.616",
    '40502': "38.017,-84.486",
    '40503': "38.008,84.535",
    '40504': "38.039,-84.543",
    '40505': "38.058,-84.461",
    '40506': "38.029,-84.507",
    '40507': "38.047,-84.496",
    '40508': "38.052,-84.493",
    '40509': "38.005,-84.410"
}

var markerDataLat = [];
var markerDataLong = [];
exports.index_get =  function(req, res, next) {
    googleApiKey = creds.googleApiKey;
    HashNet.loadTopicMessages().then(function(compiledData){
        console.log(compiledData);
        
        for(zip of Object.keys(compiledData)){
            console.log(zip);
            for (dbZip of Object.keys(zipDB)){
                if (dbZip.includes(zip)){
                    if (zip == '4035'){
                        bugCount =  compiledData[zip]['whitefly'];
                        bugCount = (bugCount * .10) | 0; 
                        for (i = 0; i < bugCount; i++){
                            tmp = zipDB[dbZip].split(',');
                            markerDataLat.push(tmp[0]);
                            markerDataLong.push(tmp[1]);
                        }
                    }
                }
            }

        }
        console.log(markerDataLat);
        console.log(markerDataLat.length);
        res.render('index', {title: "PPN API Demo", markerLat: markerDataLat, markerLong: markerDataLong, apiKey: googleApiKey});
    });
}
exports.index_post =  function(req, res, next) {}
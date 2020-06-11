const fetch = require("node-fetch");

const TOPICID = "0.0.46939";
const MIRRORURL = 'http://api.testnet.kabuto.sh/v1/topic/' + TOPICID + '/message';
const VALIDMIDCUTOFF = 141;
/*
"messages":{
    "seqNumber":{
        "uid": "",
        "author":"",
        "location":"",
        "bugcount": {}
    }
}
*/

topicData = {
    "messages":{
        0:{
            "uid": "",
            "author": "",
            "location": 0000,
            "bugcount": {}
        }
    }
}

rawRequestData = []

locationData = {

}

getMessageContent = async (messId) => {
    let response = await fetch(`${MIRRORURL}/${messId}/contents`);
    //console.log(`${MIRRORURL}/${messId}/contents`);
    if (response.status == 200){
        var data = await response.text();
        //console.log(data);
    }
    return data;
}


exports.loadTopicMessages = async () => {
    let response = await fetch(MIRRORURL);
    if (response.status == 200){
        var data = await response.json();
    }

    
    for (item of data.messages){
        rawRequestData.push(item);
        //topicData.messages[]
        let messID = item.sequenceNumber;
        if (messID > VALIDMIDCUTOFF){
            let messContent = await getMessageContent(messID)
            messContent = messContent.split('|');
            messUID = messContent[1];
            messLoc = messContent[2];
            messBugs = messContent[3].split(';');
            var tempBugs = {}
            for (entry of messBugs){
                entry = entry.split(':');
                tempBugs[entry[0]] = parseInt(entry[1]);
            }
            // Iterate though Locations in Location Data //
            if (messLoc in locationData){
                // For each bug in current buglist //
                for (bugEntry of Object.keys(tempBugs))
                    // Is bug in current buglist alreay in location data? //
                    if (bugEntry in locationData[messLoc]){
                        // Add bugcount to location data count //
                        locationData[messLoc][bugEntry] = locationData[messLoc][bugEntry] + tempBugs[bugEntry];
                    } else {
                        // Add new bug entry //
                        locationData[messLoc][bugEntry] = tempBugs[bugEntry];
                    }
                    
            } else {
                locationData[messLoc] = tempBugs
            }
        }else{
            // Invalid MID
        }
    }
    return locationData;
    //console.log(rawRequestData);
    
}
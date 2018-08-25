const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

CAR_PARK_URL = "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2";

const axios = require("axios");
const instance = axios.create({
  baseURL: CAR_PARK_URL,
  timeout: 9000,
  headers: {'AccountKey': ''}
});


exports.apiCarparkAvail = functions.https.onRequest((request, response) => {
  instance.get(CAR_PARK_URL)
    .then(res => {
        console.log(res);
      response.set("Access-Control-Allow-Origin", "*");
      response.set("Access-Control-Allow-Headers", "*");
      response.set("Access-Control-Allow-Methods", "GET, POST");
      response.status(200).send(res.data);
    })
    .catch(err => console.error(err));
});

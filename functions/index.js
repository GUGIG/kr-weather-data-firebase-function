const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const states = require("./states").states;
const API_HOST = "https://api.airvisual.com/v2/";
const COUNTRY_CODE = "South%20Korea";

const THRESHOLD = [
  { threshold: 50, level: "good" },
  { threshold: 100, level: "moderate" },
  { threshold: 150, level: "unhealthy for sensitive groups" },
  { threshold: 200, level: "unhealthy" },
  { threshold: 250, level: "very unhealthy" },
  { threshold: 300, level: "very unhealthy" },
];

admin.initializeApp();
const db = admin.firestore();

/**
 * @returns {Promise} keys[] (an array of IQAir api's key)
 * * If not successful, returns an empty array
 */
async function getIQAirApiKeys() {
  const apiKeysCollection = db.collection("api-keys");
  const snapshot = await apiKeysCollection.get();
  const keys = [];
  snapshot.forEach((doc) => {
    keys.push(doc.data().key);
  });

  return keys;
}

/**
 * @param {string} uri 
 * @returns {Promise<[]>} An array with a pair of data which would be [response, error]
 * * sends HTTP request with GET method and returns response data
 * * if request successful, returns [responseData, null]
 * * if reqeust failed, returns [null, error]
 */
async function getHTTP(uri) {
  let data = null, error = null;
  try {
    let response = await fetch(uri);
    data = await response.json();
  } catch (e) {
    error = e;
  }
  return [data, error];
}

function UTCToTimestamp(utc) {
  const date = new Date(utc);
  return admin.firestore.Timestamp.fromDate(date);
}

exports.updateCityWeatherInfo = functions.pubsub
  .schedule("10 * * * *")
  .onRun(async (context) => {
    const [API_KEY1, API_KEY2, API_KEY3] = await getIQAirApiKeys();

    const p_weatherDataList = [];

    /**
     * 
     * @param {number} index 
     * @param {string} key 
     * @returns {Array<Promise<[response, error]>>}
     */
    function getCityDataList(index, key) {
      const p_dataList = [];
      states[index].cities.forEach(city => {
        const URI = `${API_HOST}city?city=${city}&state=${states[index].name}&country=${COUNTRY_CODE}&key=${key}`;
        const p_weatherData = getHTTP(URI);
        p_dataList.push(p_weatherData);
      });
      return p_dataList;
    }

    for (let i = 0; i < states.length; i++) {
      if (i < 5) {
        // Busan ~ Gyeongju
        p_weatherDataList.push(
          ...getCityDataList(i, API_KEY1)
        );
      } else if (5 <= i && i < 10) {
        // Jinju ~ Gwangju
        p_weatherDataList.push(
          ...getCityDataList(i, API_KEY2)
        );
      } else {
        // Dongducheon ~ Seoul
        p_weatherDataList.push(
          ...getCityDataList(i, API_KEY3)
        );
      }
    }

    const weatherDataList = await Promise.all(p_weatherDataList);

    weatherDataList.forEach(data => {
      const [cityData, error] = data;
      if (!error && cityData.status === "success") {
        cityData.data.current.weather.ts = UTCToTimestamp(cityData.data.current.weather.ts);
        cityData.data.current.pollution.ts = UTCToTimestamp(cityData.data.current.pollution.ts);
        db.collection("kr-weather-data").doc(cityData.data.city).set(cityData.data);
      } else {
        console.log("failed city data >> ", cityData);
      }
    });

    return;
  });
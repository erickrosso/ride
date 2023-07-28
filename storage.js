function createNewRide() {
  const rideID = Date.now();
  const rideRecord = {
    data: [],
    startTime: rideID,
    stopTime: null,
  };
  savaRideRecord(rideID, rideRecord);
  return rideID;
}

function deleteRide(rideID) {
  localStorage.removeItem(rideID);
}

function getAllRides() {
  return Object.entries(localStorage);
}

function getRideRecord(rideID) {
  return JSON.parse(localStorage.getItem(rideID));
}

function savaRideRecord(rideID, rideRecord) {
  localStorage.setItem(rideID, JSON.stringify(rideRecord));
}

function addPosition(rideID, position) {
  const rideRecord = getRideRecord(rideID);
  console.log(position);
  const newData = {
    accuracy: position.coords.accuracy,
    altitude: position.coords.altitude,
    altitudeAccuracy: position.coords.altitudeAccuracy,
    heading: position.coords.heading,
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    speed: position.coords.speed,
    timestamp: position.timestamp,
  };
  rideRecord.data.push(newData);
  savaRideRecord(rideID, rideRecord);
}

function updateStopTime(rideID) {
  const rideRecord = getRideRecord(rideID);
  rideRecord.stopTime = Date.now();
  savaRideRecord(rideID, rideRecord);
}

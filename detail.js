const params = new URLSearchParams(window.location.search);
const rideID = params.get("id");
const ride = getRideRecord(rideID);

document.addEventListener("DOMContentLoaded", async () => {
  const firstPosition = ride.data[0];
  const firstLocationData = await getLocationData(
    firstPosition.latitude,
    firstPosition.longitude
  );

  const mapElement = document.createElement("div");
  mapElement.style = "width:100px;height:100px";
  mapElement.classList.add("bg-secondary");
  mapElement.classList.add("rounded-4");

  const dataElement = document.createElement("div");
  dataElement.className = "flex-fill d-flex flex-column";

  const cityDiv = document.createElement("div");
  cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.countryCode}`;
  cityDiv.className = "text-primary mb-2";

  const maxSpeedDiv = document.createElement("div");
  maxSpeedDiv.innerText = `Max speed: ${getMaxSeed(ride.data)} km/h`;
  maxSpeedDiv.className = "h5";

  const distanceDiv = document.createElement("div");
  distanceDiv.innerText = `Distance: ${getDistance(ride.data)} km`;

  const durationDiv = document.createElement("div");
  durationDiv.innerText = `Duration: ${getDuration(ride)}`;

  const dateDiv = document.createElement("div");
  dateDiv.innerText = getStartDate(ride);
  dateDiv.className = "text-secondary mt-2";

  dataElement.appendChild(cityDiv);
  dataElement.appendChild(maxSpeedDiv);
  dataElement.appendChild(distanceDiv);
  dataElement.appendChild(durationDiv);
  dataElement.appendChild(dateDiv);

  //   itemElement.appendChild(mapElement);
  //   itemElement.appendChild(dataElement);

  document.querySelector("#data").appendChild(dataElement);

  const deleteButton = document.querySelector("#deleteBtn");
  deleteButton.addEventListener("click", () => {
    deleteRide(rideID);
    window.location.href = "./";
  });

  const map = L.map("mapDetail");
  map.setView([firstPosition.latitude, firstPosition.longitude], 17);

  var OpenStreetMap_HOT = L.tileLayer(
    "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
    }
  ).addTo(map);

  const positionsArray = ride.data.map((position) => {
    return [position.latitude, position.longitude];
  });

  const polyline = L.polyline(positionsArray, { color: "#000000" });
  polyline.addTo(map);

  map.fitBounds(polyline.getBounds());
});

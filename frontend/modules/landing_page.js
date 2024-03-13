import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const responseObject = await fetch(`${config.backendEndpoint}/cities`);
    const citiesJsonData = await responseObject.json();
    return citiesJsonData;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let col = document.createElement("div");
  col.setAttribute("class", "col-lg-3 col-6 mb-4");

  let link = document.createElement("a");
  link.setAttribute("class", "tile");
  link.setAttribute("href", `pages/adventures/?city=${id}`);
  link.setAttribute("id", id);

  let tileImg = document.createElement("img");
  tileImg.setAttribute("src", image);
  tileImg.setAttribute("alt", city);
  link.append(tileImg);

  let tileText = document.createElement("div");
  tileText.setAttribute("class", "tile-text text-center");
  let cityName = document.createElement("h5");
  cityName.innerText = city;
  tileText.append(cityName);
  tileText.append(description);
  link.append(tileText);

  col.append(link);

  document.querySelector("#data").append(col);
}

export { init, fetchCities, addCityToDOM };

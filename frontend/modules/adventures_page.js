import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let cityId = search.slice(6, search.length);
  return cityId;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let adventuresResponseObject = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    let adventuresJson = await adventuresResponseObject.json();
    return adventuresJson;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((adventure) => {
    let col = document.createElement("div");
    col.setAttribute("class", "col-6 col-lg-3 mb-4");

    let link = document.createElement("a");
    link.setAttribute("class", "activity-card");
    link.setAttribute("id", adventure.id);
    link.setAttribute("href", `detail/?adventure=${adventure.id}`);

    let image = document.createElement("img");
    image.setAttribute("src", adventure.image);
    image.setAttribute("alt", adventure.name);
    link.append(image);

    let banner = document.createElement("div");
    banner.setAttribute("class", "category-banner");
    banner.innerText = adventure.category;
    link.append(banner);

    let descriptionOne = document.createElement("div");
    descriptionOne.setAttribute(
      "class",
      "d-flex w-100 justify-content-between p-2"
    );
    let place = document.createElement("span");
    place.innerText = adventure.name;
    descriptionOne.append(place);
    let costPerHead = document.createElement("span");
    costPerHead.innerText = `₹${adventure.costPerHead}`;
    descriptionOne.append(costPerHead);
    link.append(descriptionOne);

    let descriptionTwo = document.createElement("div");
    descriptionTwo.setAttribute(
      "class",
      "d-flex w-100 justify-content-between p-2"
    );
    let duration = document.createElement("span");
    duration.innerText = `duration`;
    descriptionTwo.append(duration);
    let time = document.createElement("span");
    time.innerText = `${adventure.duration} hours`;
    descriptionTwo.append(time);
    link.append(descriptionTwo);

    col.append(link);
    document.querySelector("#data").append(col);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  list = list.filter((adventure) => {
    return (adventure.duration >= low) & (adventure.duration <= high);
  });
  return list;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  list = list.filter((adventure) => {
    let returnValue = false;
    categoryList.forEach((category) => {
      if (category === adventure.category) {
        returnValue = true;
      }
    });
    return returnValue;
  });
  return list;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if ((filters.duration !== "") & (filters.category.length !== 0)) {
    let lowHigh = filters.duration.split("-");
    list = filterByDuration(list, lowHigh[0], lowHigh[1]);
    list = filterByCategory(list, filters.category);
  } else if (filters.duration !== "") {
    let lowHigh = filters.duration.split("-");
    list = filterByDuration(list, lowHigh[0], lowHigh[1]);
  } else if (filters.category.length !== 0) {
    list = filterByCategory(list, filters.category);
  }
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  window.localStorage.setItem('filters', JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  let filters = JSON.parse(window.localStorage.getItem("filters"));
   return filters;
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
  filters.category.forEach((category) => {
    let button = document.createElement("button");
    button.setAttribute("class", "category-filter");
    button.innerText = category;
    document.getElementById("category-list").append(button);
  });

  document.getElementById("duration-select").value = filters.duration;
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};

import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let id = search.slice(11, search.length);
  // Place holder for functionality to work in the Stubs
  return id;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let responseObjectOfAdventure = await fetch(
      `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    );
    let jsonOfAdventure = await responseObjectOfAdventure.json();
    return jsonOfAdventure;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let adventureNameTag = document.getElementById("adventure-name");
  adventureNameTag.innerHTML = adventure.name;

  let adventureSubTitleTag = document.getElementById("adventure-subtitle");
  adventureSubTitleTag.innerHTML = adventure.subtitle;

  adventure.images.forEach((image) => {
    // let imageDivTag = document.createElement("div");

    let imageTag = document.createElement("img");
    imageTag.setAttribute("class", "activity-card-image");
    imageTag.setAttribute("src", `${image}`);
    // imageDivTag.append(imageTag);

    document.getElementById("photo-gallery").append(imageTag);
  });

  let adventureContentTag = document.getElementById("adventure-content");
  adventureContentTag.innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  //removing previous image tags
  for (let i = 0; i < 3; i++) {
    let img = document.querySelector("img");
    if (img === null) break;
    img.remove();
  }
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGalleryTag = document.getElementById("photo-gallery");
  photoGalleryTag.setAttribute("class", "carousel slide");
  photoGalleryTag.setAttribute("data-ride", "carousel");

  //creating carousel indicators
  let carouselIndicatorTag = document.createElement("ol");
  carouselIndicatorTag.setAttribute("class", "carousel-indicators");

  let firstLitag = document.createElement("li");
  firstLitag.setAttribute("data-target", "#photo-gallery");
  firstLitag.setAttribute("data-slide-to", "0");
  firstLitag.setAttribute("class", "active");
  carouselIndicatorTag.append(firstLitag);

  let secondLitag = document.createElement("li");
  secondLitag.setAttribute("data-target", "#photo-gallery");
  secondLitag.setAttribute("data-slide-to", "1");
  carouselIndicatorTag.append(secondLitag);

  let thirdLitag = document.createElement("li");
  thirdLitag.setAttribute("data-target", "#photo-gallery");
  thirdLitag.setAttribute("data-slide-to", "2");
  carouselIndicatorTag.append(thirdLitag);

  photoGalleryTag.append(carouselIndicatorTag);

  //carousel inner part
  let carouselInnerTag = document.createElement("div");
  carouselInnerTag.setAttribute("class", "carousel-inner");
  photoGalleryTag.append(carouselInnerTag);

  images.forEach((image, index) => {
    let imageDivTag = document.createElement("div");
    imageDivTag.setAttribute("class", "carousel-item");

    let imageTag = document.createElement("img");
    imageTag.setAttribute("class", "activity-card-image d-block w-100");
    imageTag.setAttribute("src", `${image}`);
    imageDivTag.append(imageTag);
    carouselInnerTag.append(imageDivTag);
  });
  carouselInnerTag.children[0].setAttribute("class", "carousel-item active");

  //previous button
  let previousButtontag = document.createElement("a");
  previousButtontag.setAttribute("class", "carousel-control-prev");
  previousButtontag.setAttribute("href", "#photo-gallery");
  previousButtontag.setAttribute("role", "button");
  previousButtontag.setAttribute("data-slide", "prev");

  let spanOnePreviousButton = document.createElement("span");
  spanOnePreviousButton.setAttribute("class", "carousel-control-prev-icon");
  spanOnePreviousButton.setAttribute("aria-hidden", "true");
  previousButtontag.append(spanOnePreviousButton);

  let spanTwoPreviousButton = document.createElement("span");
  spanTwoPreviousButton.setAttribute("class", "sr-only");
  spanTwoPreviousButton.innerText = "Previous";
  previousButtontag.append(spanTwoPreviousButton);

  photoGalleryTag.append(previousButtontag);

  //next button
  let nextButtontag = document.createElement("a");
  nextButtontag.setAttribute("class", "carousel-control-next");
  nextButtontag.setAttribute("href", "#photo-gallery");
  nextButtontag.setAttribute("role", "button");
  nextButtontag.setAttribute("data-slide", "next");

  let spanOnenextButton = document.createElement("span");
  spanOnenextButton.setAttribute("class", "carousel-control-next-icon");
  spanOnenextButton.setAttribute("aria-hidden", "true");
  nextButtontag.append(spanOnenextButton);

  let spanTwonextButton = document.createElement("span");
  spanTwonextButton.setAttribute("class", "sr-only");
  spanTwonextButton.innerText = "Next";
  nextButtontag.append(spanTwonextButton);

  photoGalleryTag.append(nextButtontag);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-panel-available").style.display =
      "block";
    document.getElementById("reservation-person-cost").innerHTML =
      adventure.costPerHead;
    return;
  }

  document.getElementById("reservation-panel-available").style.display = "none";
  document.getElementById("reservation-panel-sold-out").style.display = "block";
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalCost = persons * adventure.costPerHead;
  document.getElementById("reservation-cost").innerHTML = totalCost;
}

//Implementation of reservation form submission using JQuery
function captureFormSubmitUsingJQuery(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  $("#myForm").on("submit", function(event) {
    event.preventDefault();
    $.ajax({
      url: `${config.backendEndpoint}/reservations/new`,
      type: "post",
      dataType: "json",
      data: $("#myForm").serialize() + `&adventure=${adventure.id}`,
      success: function (data) {
        alert("Success!");
        location.reload();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("Failed!");   
        }
    });
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
    return;
  }
  document.getElementById("reserved-banner").style.display = "none";
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};

import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let reservationResponseObject = await fetch(`${config.backendEndpoint}/reservations/`);
    let reservationJsonData = await reservationResponseObject.json();
    return reservationJsonData;

  } catch(error){
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  

  if(reservations.length !== 0) {

    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";

    let tbody = document.getElementById("reservation-table");
    reservations.forEach((reservation) => {
      let tableRow = document.createElement("tr");

      let tdId = document.createElement("td");
      tdId.innerHTML = reservation.id;
      tableRow.append(tdId);

      let tdName = document.createElement("td");
      tdName.innerHTML = reservation.name;
      tableRow.append(tdName);

      let tdAdventure = document.createElement("td");
      tdAdventure.innerHTML = reservation.adventureName;
      tableRow.append(tdAdventure);

      let tdPersons = document.createElement("td");
      tdPersons.innerHTML = reservation.person;
      tableRow.append(tdPersons);

      let tdDate = document.createElement("td");
      let dateObj = new Date(reservation.date);
      let dateStr = dateObj.toLocaleDateString("en-IN");
      tdDate.innerHTML = dateStr;
      tableRow.append(tdDate);

      let tdPrice = document.createElement("td");
      tdPrice.innerHTML = reservation.price;
      tableRow.append(tdPrice);

      let tdBookingTime = document.createElement("td");
      let dateTime = new Date(reservation.time);
      dateTime = `${dateTime.toLocaleString("en-IN", {dateStyle: "long"})}, ${dateTime.toLocaleString("en-IN", {timeStyle: "medium"})}`;
      tdBookingTime.innerHTML = dateTime;
      tableRow.append(tdBookingTime);

      let tdAction = document.createElement("td");
      let button = document.createElement("button");
      button.setAttribute("type", "button");
      button.setAttribute("class", "reservation-visit-button");
      button.setAttribute("id", `${reservation.id}`);
      tdAction.append(button);
      let aTag = document.createElement("a");
      aTag.setAttribute("href",`../detail/?adventure=${reservation.adventure}`);
      aTag.innerHTML = "Visit Adventure";
      button.append(aTag);
      tableRow.append(tdAction);

      tbody.append(tableRow);
    })
    return;
  }

  document.getElementById("no-reservation-banner").style.display = "block";
  document.getElementById("reservation-table-parent").style.display = "none";
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };

// get shows section first
const showsSection = document.querySelector(".shows");

const url = "https://project-1-api.herokuapp.com/showdates";
const apiKey = "?api_key=1feab7b3-5728-47cb-96ef-d4b70a38f4ed";

function getShowDates(){
  axios
  .get(`${url}${apiKey}`)
  .then((response) => response.data)
  .then((data) => {
         createShows(showsSection, data);
        }).catch((error) => 
        { 
          console.log(error.response.data.message); 
        });
}

getShowDates();

function createShowElement(element, className, innerText){
    let elm = document.createElement(element);
    if(className.includes(",")){
        let classArray = className.split(",");
        for(classObj of classArray){     
            elm.classList.add(classObj); 
        }
    }else{
        elm.classList.add(className);
    }
    elm.innerText = innerText;
    return elm;
}

function createShow(show, isFirstRow){
    // create a div, add class shows__ticket
    let showContainer = document.createElement("div");
    showContainer.classList.add("shows__ticket");

    let dateContainer = document.createElement("div");
    dateContainer.classList.add("shows__ticket-block");
    
    let venueContainer = document.createElement("div");
    venueContainer.classList.add("shows__ticket-block");
    
    let locationContainer = document.createElement("div");
    locationContainer.classList.add("shows__ticket-block");
    
    //add date, venue and location label
    let dateHeader = createShowElement("h4", "shows__ticket-property", "DATE");
    let venueHeader = createShowElement("h4", "shows__ticket-property", "VENUE");
    let locationHeader = createShowElement("h4", "shows__ticket-property", "LOCATION");

    if(!isFirstRow){
        dateHeader.classList.add("shows__ticket-property--hide");
        venueHeader.classList.add("shows__ticket-property--hide");
        locationHeader.classList.add("shows__ticket-property--hide");
    }

    dateContainer.appendChild(dateHeader);
    venueContainer.appendChild(venueHeader);
    locationContainer.appendChild(locationHeader);

    dateContainer.appendChild(createShowElement("h3", "shows__ticket-before", show.date));
    venueContainer.appendChild(createShowElement("p", "shows__ticket-before", show.place));
    locationContainer.appendChild(createShowElement("p", "shows__ticket-before", show.location));

    showContainer.appendChild(dateContainer);
    showContainer.appendChild(venueContainer);
    showContainer.appendChild(locationContainer);

    // create a btn, add class shows__ticket-btn, append in ticket. 
    let btn = createShowElement("button", "shows__ticket-btn", "BUY TICKETS");
    if(isFirstRow){
        btn.classList.add("shows__ticket-btn--first");
    }
    showContainer.appendChild(btn);

    return showContainer;
}

function createShows(showsSection, shows){
    //create a div, add class shows__tickets, append in shows.
    let container = document.createElement("div");
    container.classList.add("shows__tickets");

    let i = 0;
    for(show of shows){
        let isFirstRow = false;
        if(i === 0){
            isFirstRow = true;
        }else {
            isFirstRow = false;
        }
        container.appendChild(createShow(show, isFirstRow));
        i++;
    }

    showsSection.appendChild(container);
}
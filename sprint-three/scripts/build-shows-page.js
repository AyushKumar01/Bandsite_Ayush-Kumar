const shows = [
    { "DATE": "Mon Dec 17 2018", "VENUE": "Ronald Lane",   "LOCATION" : "San Francisco, CA"},
    { "DATE": "Tue Jul 18 2019", "VENUE": "Pier 3 East",   "LOCATION" : "San Francisco, CA"},
    { "DATE": "Fri Jul 22 2019", "VENUE": "View Loungue",  "LOCATION" : "San Francisco, CA"},
    { "DATE": "Sat Aug 12 2019", "VENUE": "Hyatt Agency",  "LOCATION" : "San Francisco, CA"},
    { "DATE": "Fri Sep 05 2019", "VENUE": "Moscow Center", "LOCATION" : "San Francisco, CA"},
    { "DATE": "Wed Aug 11 2019", "VENUE": "Pres Club",     "LOCATION" : "San Francisco, CA"},
]


// get shows section first
const showsSection = document.querySelector(".shows");

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


function createShow(show, isOtherRow){
    // create a div, add class shows__ticket
    let showContainer = document.createElement("div");
    showContainer.classList.add("shows__ticket");

        // for in loop on row
        for(key in show){
           // create a div, add class shows__ticket-block, append in tickets.
           let keyContainer = document.createElement("div");
           keyContainer.classList.add("shows__ticket-block");

                if(isOtherRow){
                    // create elm h4, add class shows__ticket-property,shows__ticket-property--hide, append in block.
                    keyContainer.appendChild(createShowElement("h4", "shows__ticket-property,shows__ticket-property--hide", key));
                }else{
                    // create elm h4, add class shows__ticket-property, append in block.
                    keyContainer.appendChild(createShowElement("h4", "shows__ticket-property", key));
                }               

                // if key = Date then create h3 else create p, add class shows__ticket-before, append in block.
                if (key.toUpperCase() === "DATE") {
                    keyContainer.appendChild(createShowElement("h3", "shows__ticket-before", show[key]));
                } else{
                    keyContainer.appendChild(createShowElement("p", "shows__ticket-before", show[key]));
                }
                showContainer.appendChild(keyContainer);
        }
           
        if(isOtherRow){
             // create a btn, add class shows__ticket-btn, append in ticket. 
             showContainer.appendChild(createShowElement("button", "shows__ticket-btn", "BUY TICKETS"));
        }else{
            // create a btn, add class shows__ticket-btn,shows__ticket-btn--first, append in ticket.  
            showContainer.appendChild(createShowElement("button", "shows__ticket-btn,shows__ticket-btn--first", "BUY TICKETS"));              
        }
        return showContainer;
}

function createShows(showsSection, shows){
    //create a div , add class shows__tickets, append in shows.
    let container = document.createElement("div");
    container.classList.add("shows__tickets");

    //for loop 
    let i = 0;
    for(show of shows){
        let isOtherRow = false;
        if(i === 0){
            isOtherRow = false;
        }else {
            isOtherRow = true;
        }
        container.appendChild(createShow(show, isOtherRow));
        i++;
    }

    showsSection.appendChild(container);
}

createShows(showsSection, shows);

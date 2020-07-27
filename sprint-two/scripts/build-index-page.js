const reviews = [
    {
        'name':'Micheal Lyons',
        'timestamp': new Date('12/18/2018'),
        'comment': 'They BLEW the ROOF off at their last show, \
                        once everyone started figuring out they were going. \
                        This is still simply the greatest opening of a concert \
                        I have EVER witnessed.',
    },
    
    {
        'name':'Gary Wong',
        'timestamp': new Date('12/12/2018'),
        'comment': 'Every time I see him shred I feel so \
                        motivated to get off my couch and \
                        hop on my board. He’s so talented! I \
                        wish I can ride like him one day so I \
                        can really enjoy myself!',
    },

    {
        'name':'Theodore Duncan',
        'timestamp': new Date('11/15/2018'),
        'comment': 'How can someone be so good!!! \
                        You can tell he lives for this and \
                        loves to do it every day. Everytime I \
                        see him I feel instantly happy! He’s \
                        definitely my favorite ever!',
    },


]
// access section from html by class .reviews//
const reviewsSection = document.querySelector(".reviews");

const commentForm = document.querySelector(".comments__form");

function createComment(reviewsSection, reviews) {
    reviewsSection.innerHTML = " ";
    reviews.sort(function(a, b){ return b.timestamp - a.timestamp });
    for (const review of reviews) {
        // create a div with class "reviews__block" and append in parent div//
        let reviewBlock = createReviewElement("div", "reviews__block", "");
        reviewsSection.appendChild(reviewBlock);
                // create a div with class "reviews__image" and append in parent div//
        reviewBlock.appendChild(createReviewElement("div", "reviews__image", ""));

        // create a div with class "reviews__inside" and append in parent div//
        let reviewInside = createReviewElement("div", "reviews__inside", "");
        reviewBlock.appendChild(reviewInside);
        // create a div with class "reviews__inside-first"//
        let reviewInsideFirst = createReviewElement("div", "reviews__inside-first", "");
            
        // create a h3 with class "reviews__inside-first-para", set innerText and append in parent div//
        reviewInsideFirst.appendChild(createReviewElement("h3", "reviews__inside-first-para", review.name));
        // create a 'p' with class "reviews__inside-first-para,reviews__inside-first-para--color",// 
        // set innerText and append in parent div
                                                                                            // changeDateTimeFormat(review.date)
        reviewInsideFirst.appendChild(createReviewElement("p", "reviews__inside-first-para,reviews__inside-first-para--color", timeAgo(review.timestamp)));
        // append in parent div//    
        reviewInside.appendChild(reviewInsideFirst);
        // create a div with class "reviews__inside-second"//
        let reviewInsideSecond = createReviewElement("div", "reviews__inside-second", "");
        // create a h4 with class "reviews__inside-second-para", set innerText and append in parent div//
        reviewInsideSecond.appendChild(createReviewElement("h4", "reviews__inside-second-para", review.comment));
        //  and append in parent div//
        reviewInside.appendChild(reviewInsideSecond);
    }
} 

function createReviewElement(elementName, className, innerText){
    let elm = document.createElement(elementName);
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

    // let newElement = document.createElement(elementName);
    // newElement.innerText = innerText;
    // newElement.classList.add(className);
    // return newElement;
}

function getFormattedDate(date) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = `0${ minutes }`;
  }

  return `${ month }/${ day }/${ year }`;
}

//// this function was used earlier, later changed it with timeAgo function
// function changeDateTimeFormat(dateToChangeFormat){
//     const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' }) 
//     const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(dateToChangeFormat); 
//     // stack overflow for date formate change.
//     return (`${month}/${day}/${year }`);
// }

//https://muffinman.io/javascript-time-ago-function/
function timeAgo(dateParam) {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();


  if (seconds < 5) {
    return 'now';
  } else if (seconds < 60) {
    return `${ seconds } seconds ago`;
  } else if (seconds < 90) {
    return 'about a minute ago';
  } else if (minutes < 60) {
    return `${ minutes } minutes ago`;
  } else if (isToday) {
    return getFormattedDate(date, 'Today'); // Today at 10:20
  } else if (isYesterday) {
    return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
  } else if (isThisYear) {
    return getFormattedDate(date, false, true);
  }

  return getFormattedDate(date);
}

createComment(reviewsSection, reviews);

commentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let formReviewer = event.target.reviewerName.value;
    let formComment = event.target.reviewerComment.value;
    if(formReviewer !== "" && formComment !== ""){
        comment = { 'name': formReviewer,
                'timestamp': new Date(),
                'comment': formComment
              }
        displayComment(comment);
    }else {
        alert('All fields must be filled out');
    }
    commentForm.reset();        
});

function displayComment(comment){
    if(comment != null){
        reviews.push(comment);
        createComment(reviewsSection, reviews);
        //tried this at initial level then changed it to form reset in eventListener method
        // event.target.reviewerName.value = "";
        // event.target.reviewerComment.value = "";
    }
}

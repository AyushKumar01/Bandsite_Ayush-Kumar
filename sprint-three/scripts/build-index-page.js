const reviewsSection = document.querySelector(".reviews");
const commentForm = document.querySelector(".comments__form");
const url = "https://project-1-api.herokuapp.com/comments";
const apiKey = "?api_key=1feab7b3-5728-47cb-96ef-d4b70a38f4ed";
const headers = {
  'Content-Type': 'application/json'
} // used in post api.

function getComments(){
  axios
  .get(`${url}${apiKey}`)
  .then((response) => response.data)
  .then((data) => {
        //  console.log(data); 
         createComment(reviewsSection, data);
        }).catch((error) => 
        { 
          if(error.response) { console.log(error.response.data.message);
            } else{ console.log(error); }
        });
}

getComments();

function deleteComment(id){
  axios
  .delete(`${url}/${id}${apiKey}`)
  .then((response) => response.data)
  .then((data) => {
        //  console.log(data); 
         getComments();
        }).catch((error) => 
        { 
          if(error.response) { console.log(error.response.data.message);
            } else{ console.log(error); }
        });
}

function likeComment(id){
  axios
  .put(`${url}/${id}/like${apiKey}`)
  .then((response) => response.data)
  .then((data) => {
        //  console.log(data);
         getComments();
        }).catch((error) => 
        { 
          if(error.response) { console.log(error.response.data.message);
            } else{ console.log(error); }
        });
}

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
        // create a 'p' with class "reviews__inside-first-para,reviews__inside-first-para--color"// 
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
        let deleteIcon = createReviewElement("i", "fa,fa-trash,reviews__inside-second-delete", "");
        deleteIcon.id = review.id;
        deleteIcon.addEventListener("click", function (event) {
          console.log(event.target.id);
          deleteComment(event.target.id);
        })
        reviewInsideSecond.appendChild(deleteIcon);
        let likeIcon = createReviewElement("i", review.likes === 0 ? "fa,fa-thumbs-up,reviews__inside-second-like" : "fa,fa-thumbs-up,reviews__inside-second-like,reviews__inside-second-likes",
                                           review.likes === 0 ? " " : " " + review.likes);
        likeIcon.id = review.id;
        likeIcon.addEventListener("click", function(event){
          // console.log(event.target.id); 
          likeComment(event.target.id);
        });
        reviewInsideSecond.appendChild(likeIcon);
        
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
}

function getFormattedDate(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  // const hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = `0${ minutes }`;
  }

  if(month < 10){
    month = `0${ month }`;
  }

  if(day < 10){
    day = `0${ day }`;
  }

  return `${ month }/${ day }/${ year }`;
}

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

commentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let formReviewer = event.target.reviewerName.value;
    let formComment = event.target.reviewerComment.value;
    if(formReviewer !== "" && formComment !== ""){
        comment = { 
                    'name': formReviewer,
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
        axios.post(`${url}${apiKey}`, comment, headers)
             .then((response) => response.data)
             .then((data) => {
                //  console.log(data);
                 getComments(); 
      }).catch((error) => 
            { 
              console.log(error.response.data.message); 
            });
    }
}

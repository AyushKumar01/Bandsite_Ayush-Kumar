const reviews = [
    {
        'name':'Micheal Lyons',
        'date': '12/18/2018',
        'description': 'They BLEW the ROOF off at their last show, \
                        once everyone started figuring out they were going. \
                        This is still simply the greatest opening of a concert \
                        I have EVER witnessed.',
    },
    
    {
        'name':'Gary Wong',
        'date': '12/12/2018',
        'description': 'Every time I see him shred I feel so \
                        motivated to get off my couch and \
                        hop on my board. He’s so talented! I \
                        wish I can ride like him one day so I \
                        can really enjoy myself!',
    },

    {
        'name':'Theodore Duncan',
        'date': '11/15/2018',
        'description': 'How can someone be so good!!! \
                        You can tell he lives for this and \
                        loves to do it every day. Everytime I \
                        see him I feel instantly happy! He’s \
                        definitely my favorite ever!',
    },


]
// access section from html by class .reviews//
const reviewsSection = document.querySelector(".reviews");


function createReview(reviewsSection, reviews) {
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
                        // set innerText and append in parent div//
                        reviewInsideFirst.appendChild(createReviewElement("p", "reviews__inside-first-para,reviews__inside-first-para--color", review.date));
                    // append in parent div//    
                    reviewInside.appendChild(reviewInsideFirst);
                    // create a div with class "reviews__inside-second"//
                    let reviewInsideSecond = createReviewElement("div", "reviews__inside-second", "");
                        // create a h4 with class "reviews__inside-second-para", set innerText and append in parent div//
                        reviewInsideSecond.appendChild(createReviewElement("h4", "reviews__inside-second-para", review.description));
                    //  and append in parent div//
                    reviewInside.appendChild(reviewInsideSecond);
    }
} 

function createReviewElement(elementName, className, innerText){
    let newElement = document.createElement(elementName);
    newElement.innerText = innerText;
    newElement.classList.add(className);
    return newElement;
}

createReview(reviewsSection, reviews);

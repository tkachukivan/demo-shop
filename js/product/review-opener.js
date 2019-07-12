const productReview = document.querySelector('.review');
const productReviewShareBlocks = document.querySelector('.review-share');
const openProductReviewButton = document.querySelector('.review-add__button');

openProductReviewButton.addEventListener('click', toggleReview);

function toggleReview() {
    productReviewShareBlocks[0].classList.toggle('review-share--active');
    productReviewShareBlocks[1].classList.toggle('review-share--active');
    productReview.classList.toggle('review--active');
}

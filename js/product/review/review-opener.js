const productReview = document.querySelector('.review');
const productReviewShareBlocks = document.querySelectorAll('.review-share');
const openProductReviewButton = document.querySelector('.review-add__button');
const b = document.querySelector('.button-review-cancel');

openProductReviewButton.addEventListener('click', toggleReview);

export function toggleReview() {
    productReviewShareBlocks[0].classList.toggle('review-share--active');
    productReviewShareBlocks[1].classList.toggle('review-share--active');
    productReview.classList.toggle('review--active');
}

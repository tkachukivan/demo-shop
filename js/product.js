const productReview = document.querySelector('.product-review');
const productReviewShareBlocks = document.querySelectorAll('.product-review-share');
const shareProductReviewButton = document.querySelector('.product-review-add__button');

shareProductReviewButton.addEventListener('click', toggleReview);

function toggleReview() {
    productReviewShareBlocks[0].classList.toggle('product-review-share--active');
    productReviewShareBlocks[1].classList.toggle('product-review-share--active');
    productReview.classList.toggle('product-review--active');
}

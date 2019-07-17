const template = document.createElement('template');
template.innerHTML = `
<div class="pull-right review-rating">
    <span>Rate product:</span>
    <div class="rating-editable">
        <input class="rating-editable__item" type="radio" name="rating" value="1">
        <input class="rating-editable__item" type="radio" name="rating" value="2">
        <input class="rating-editable__item" type="radio" name="rating" value="3">
        <input class="rating-editable__item" type="radio" name="rating" value="4">
        <input class="rating-editable__item" type="radio" name="rating" value="5">
    </div>
</div>
`;

class ReviewEditRating extends HTMLElement {
    constructor() {
        super();
        
        this.appendChild(template.content.cloneNode(true));

        this.$ratingContainer = this.querySelector('.rating-editable');

        this.$ratingContainer.addEventListener('change', this.onRatingChange.bind(this))
    }

    onRatingChange(e) {
        this.dispatchEvent(new CustomEvent('onRatingChange', { detail: e.target.value }));
    }
}

window.customElements.define('review-edit-rating', ReviewEditRating);
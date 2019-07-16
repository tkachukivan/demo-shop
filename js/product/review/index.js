import { toggleReview } from './review-opener.js';

const template = document.createElement('template');
template.innerHTML = `
<h3 class="review__title">
    Add review
</h3>
<div class="review-preview">
    <div class="review-preview__info">
        <review-preview-author-name></review-preview-author-name>
        <review-preview-rating></review-preview-rating>
    </div>
    <div class="review-preview__details">
        <review-preview-author-avatar></review-preview-author-avatar>
        <review-preview-text></review-preview-text>
    </div>
</div>
<form class="review-edit-wrapper">
    <div class="review-edit__title-wrapper">
        <h4 class="review-edit__title">edit your review</h4>
    </div>
    <div class="review-edit">
        <div class="review-user-info">
            <review-edit-author-name></review-edit-author-name>
            <review-edit-author-avatar></review-edit-author-avatar>
        </div>
        <div class="review-user-review">
            <div >
                <label>Write your review:</label>
                <review-edit-rating></review-edit-rating>
                
                <review-edit-text></review-edit-text>
                
                <div class="review-user-review__actions-list">
                    <button class="button button--secondary button-review-cancel">Cancel</button>
                    <button class="button">Add review</button>
                </div>
            </div>
        </div>
    </div>
</form>
`;

class ProductReview extends HTMLElement {
    constructor() {
        super();
        
        this.appendChild(template.content.cloneNode(true));

        this.$form = this.querySelector('form');
        this.$closeButton = this.querySelector('.button-review-cancel');

        this.$editAuthorName = this.querySelector('review-edit-author-name');
        this.$previewAuthorName = this.querySelector('review-preview-author-name');
        this.$uploadAuthorAvatar = this.querySelector('review-edit-author-avatar');
        this.$previewAuthorAvatar = this.querySelector('review-preview-author-avatar');
        this.$editRating = this.querySelector('review-edit-rating');
        this.$previewRating = this.querySelector('review-preview-rating');
        this.$editReviewText = this.querySelector('review-edit-text');
        this.$previewReviewText = this.querySelector('review-preview-text');

        this.$editAuthorName.addEventListener('onAuthorNameChange', this.onAuthorNameChange.bind(this));
        this.$uploadAuthorAvatar.addEventListener('onAuthorAvatarChange', this.onAuthorAvatarChange.bind(this));
        this.$editRating.addEventListener('onRatingChange', this.onRatingChange.bind(this));
        this.$editReviewText.addEventListener('onReviewTextChange', this.onReviewTextChange.bind(this));

        this.$form.addEventListener('submit', (e) => { e.preventDefault(); });
        this.$closeButton.addEventListener('click', toggleReview );
    }

    onAuthorNameChange(e) {
        this.$previewAuthorName.setAttribute('author-name', e.detail);
    }

    onAuthorAvatarChange(e) {
        this.$previewAuthorAvatar.setAttribute('author-avatar', e.detail);
    }

    onRatingChange(e) {
        this.$previewRating.setAttribute('review-rating', e.detail);
    }
    onReviewTextChange(e) {
        this.$previewReviewText.setAttribute('review-text', e.detail);
    }
}

window.customElements.define('product-review', ProductReview);
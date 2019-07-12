class ReviewPreviewRating extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['review-rating'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.innerHTML = `
        <div>
            <div class="rating rating--${newValue}"></div>
        </div>`;
    }
}

window.customElements.define('review-preview-rating', ReviewPreviewRating);
class ReviewEditAuthorName extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
        <div class="review-preview__author">
            By <span class="review-preview__author-name"></span> ${this.getCurrentDate()}
        </div>
        `;

        this.$authorName = this.querySelector('.review-preview__author-name');
    }

    static get observedAttributes() {
        return ['author-name'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.$authorName.textContent = newValue;
    }

    getCurrentDate() {
        const date = new Date();

        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
}

window.customElements.define('review-preview-author-name', ReviewEditAuthorName);
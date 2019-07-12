const template = document.createElement('template');
template.innerHTML = `
<div class="review-preview__text">
    Start typing and your review text will appear here...
</div>
`;

class ReviewPreviewText extends HTMLElement {
    constructor() {
        super();
        
        this.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('review-preview-text', ReviewPreviewText);
const template = document.createElement('template');
template.innerHTML = `
<div class="review-preview__avatar-wrapper">
    <img src="" alt="" class="review-preview__avatar review-preview__avatar--empty">
</div>
`;

class ReviewPreviewAuthorAvatar extends HTMLElement {
    constructor() {
        super();
        
        this.appendChild(template.content.cloneNode(true));

        this.$img = this.querySelector('img');
    }

    static get observedAttributes() {
        return ['author-avatar'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.$img.classList.remove('review-preview__avatar--empty');
        this.$img.src = newValue;
    }
}

window.customElements.define('review-preview-author-avatar', ReviewPreviewAuthorAvatar);
import { setFileToBase64 } from '../../utils/index.js';

const template = document.createElement('template');
template.innerHTML = `
<div class="review-author-avatar-wrapper">
    <label>Choose your avatar:</label>
    <div class="review-author-avatar">
        <p class="review-author-avatar__label">Image not selected</p>
        <label class="review-author-avatar__upload review-author-avatar__upload--default">
            <input type="file" class="review-author-avatar__input" accept="image/*">
        </label>
        <img class="review-author-avatar__upload" hidden>
    </div>
</div>
`;

class ReviewEditAuthorAvatar extends HTMLElement {
    constructor() {
        super();
        
        this.appendChild(template.content.cloneNode(true));

        this.$input = this.querySelector('input');
        this.$label = this.querySelector('p');
        this.$inputContainer = this.querySelector('.review-author-avatar__upload');
        this.$imageContainer = this.querySelector('img');

        this.$input.addEventListener('change', this.onImageSelect.bind(this));
    }

    onImageSelect() {
        this.$label.textContent = 'Image Selected';
        this.$inputContainer.hidden = true;
        this.$imageContainer.hidden = false;
        setFileToBase64(this.$input.files[0])
            .then((base64) => {
                this.$imageContainer.src = base64;
                this.dispatchEvent(new CustomEvent('onAuthorAvatarChange', { detail: base64 }));
            });
    }
}

window.customElements.define('review-edit-author-avatar', ReviewEditAuthorAvatar);
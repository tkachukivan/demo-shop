const template = document.createElement('template');
template.innerHTML = `
<div>
    <label for="review-author">Enter your name:</label>
    <input type="text"
            class="text-field"
            id="review-author">
</div>
`;

class ReviewEditAuthorName extends HTMLElement {
    constructor() {
        super();
        
        this.appendChild(template.content.cloneNode(true));

        this.$input = this.querySelector('input');

        this.$input.addEventListener('input', this.onAuthorNameChange.bind(this));
    }

    onAuthorNameChange() {
        this.dispatchEvent(new CustomEvent('onAuthorNameChange', { detail: this.$input.value }));
    }
}

window.customElements.define('review-edit-author-name', ReviewEditAuthorName);
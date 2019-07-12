const template = document.createElement('template');
template.innerHTML = `
<textarea type="text"
    class="text-field"
    rows="10"></textarea>
<div class="review-user-review__text-actions">
    <button class="button button--secondary button--autosize">Bold</button>
    <button class="button button--secondary button--autosize">Emphasize</button>
    <button class="button button--secondary button--autosize">Quote</button>
</div>
`;

class ReviewEditText extends HTMLElement {
    constructor() {
        super();
        
        this.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('review-edit-text', ReviewEditText);
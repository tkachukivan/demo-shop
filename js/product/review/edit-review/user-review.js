const template = document.createElement('template');
template.innerHTML = `
<textarea type="text"
    class="text-field"
    rows="10"></textarea>
<div class="review-user-review__text-actions">
    <button class="button button--secondary button--autosize" data-text="b">Bold</button>
    <button class="button button--secondary button--autosize" data-text="i">Emphasize</button>
    <button class="button button--secondary button--autosize" data-text="q">Quote</button>
</div>
`;

class ReviewEditText extends HTMLElement {
    constructor() {
        super();
        
        this.appendChild(template.content.cloneNode(true));

        this.$textarea = this.querySelector('textarea');
        this.$buttonsContainer = this.querySelector('.review-user-review__text-actions');

        this.$textarea.addEventListener('input', this.onReviewTextChange.bind(this));
        this.$buttonsContainer.addEventListener('click', this.addStylesTags.bind(this));
    }

    onReviewTextChange() {
        this.dispatchEvent(new CustomEvent('onReviewTextChange', { detail: this.$textarea.value }));
    }

    addStylesTags(e) {
        const tag = e.target.dataset.text;
        if (!tag) return;

        const selection = document.getSelection()
        if (!selection.toString()) {
            this.$textarea.value = `${this.$textarea.value}[${tag}][/${tag}]`
        } else {
            const preSelected = this.$textarea.value.substring(0, this.$textarea.selectionStart);
            const selected = this.$textarea.value.substring(this.$textarea.selectionStart, this.$textarea.selectionEnd);
            const postSelected = this.$textarea.value.substring(this.$textarea.selectionEnd);
            this.$textarea.value = `${preSelected}[${tag}]${selected}[/${tag}]${postSelected}`
        }
        
        this.onReviewTextChange();
    }
}

window.customElements.define('review-edit-text', ReviewEditText);
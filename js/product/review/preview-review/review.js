const template = document.createElement('template');
template.innerHTML = `
<div class="review-preview__text">
    Start typing and your review text will appear here...
</div>
`;

class ReviewPreviewText extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `<div class="review-preview__text review-preview__text--default">
            ${ReviewPreviewText.defaultText}
        </div>`;

        this.$textContainer = this.querySelector('.review-preview__text');
    }

    static get defaultText() {
        return 'Start typing and your review text will appear here...'
    }

    static get observedAttributes() {
        return ['review-text'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue) {
            const formattedValue = newValue
                .replace(/\[(q)\](.*?)\[\/q\]/g, this.replacer)
                .replace(/\[(i)\](.*?)\[\/i\]/g, this.replacer)
                .replace(/\[(b)\](.*?)\[\/b\]/g, this.replacer);

            this.$textContainer.innerHTML = formattedValue;
            this.$textContainer.classList.remove('review-preview__text--default');
        } else {
            this.$textContainer.innerHTML = ReviewPreviewText.defaultText;
            this.$textContainer.classList.add('review-preview__text--default');
        }
    }

    replacer(_, t, txt) {        
        if (tag === 'q') {
            tag = 'blockquote';
        }

        return `<${tag}>${txt}</${tag}>`
    }
}

window.customElements.define('review-preview-text', ReviewPreviewText);
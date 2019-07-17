import { resolvePromiseInTime } from '../../utils/index.js';

const template = document.createElement('template');
template.innerHTML = `
<div class="product-item__image-wrapper product-item-slider">
    <p class="product-item__image-description"></p>
    <div class="rating-wrapper">
        <review-preview-rating review-rating="5"></review-preview-rating>
    </div>

    <div class="product-item__image-slider product-item__image-slider--prev" data-slider-direction="prev"></div>
    <div class="product-item__image-slider product-item__image-slider--next" data-slider-direction="next"></div>
    <div class="product-item__zoom">
        <canvas class="product-item__zoom-canvas"></canvas>
    </div>
</div>
`;

class ProductSlider extends HTMLElement {
    constructor() {
        super();
        
        this.appendChild(template.content.cloneNode(true));

        this._currentIndex = 0;
        this._zoomRatio = 2;
        this._matchMedia = window.matchMedia('(min-width: 50rem)'); // show zoom when not mobile;

        this.$sliderWrapper = this.querySelector('.product-item__image-wrapper');
        this.$imageDescription = this.querySelector('p');
        this.$zoomWrapper = this.querySelector('.product-item__zoom');
        this.$zoomCanvas = this.querySelector('canvas');
        this.$canvasContext = this.$zoomCanvas.getContext('2d');

        this._rect = this.$sliderWrapper.getBoundingClientRect();

        this.$sliderWrapper.addEventListener('click', this.onSlideChange.bind(this));

        this.$sliderWrapper.addEventListener('mouseenter', this.onMouseEnterSlider.bind(this));
        this.$sliderWrapper.addEventListener('mouseleave', this.onMouseLeaveSlider.bind(this));
        this.$sliderWrapper.addEventListener('mousemove', this.onMouseMoveOnSlider.bind(this));

        window.addEventListener('resize', this.onResize.bind(this));
    }

    connectedCallback() {
        const fragment = document.createDocumentFragment()

        ProductSlider.sliderImages.forEach((item) => {
            const img = document.createElement('img');
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const image = new Image();
            image.src = item.url;
            image.onload = () => {
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;
                
                ctx.drawImage(image, 0, 0);
                ctx.font = '80px Comic Sans MS';
                ctx.fillStyle = 'rgba(255,255,255, 0.5)';
                ctx.textAlign = 'right';
                ctx.fillText('DEMO SHOP', canvas.width, 80);
                img.setAttribute('src', canvas.toDataURL());
            };
            
            img.classList.add('product-item__image');
            fragment.appendChild(img);
        });

        this.$sliderWrapper.insertBefore(fragment, this.$imageDescription);
        this.$imageDescription.textContent = ProductSlider.sliderImages[this._currentIndex].description;
        this._imgs = this.querySelectorAll('img');

        this._setCurrentImage();
    }

    onSlideChange(e) {
        const direction = e.target.dataset.sliderDirection;
        if (!direction) return;

        this._imgs[this._currentIndex].classList.remove('product-item__image--active');

        if (direction === 'next') {
            this._nextImage();
        } else if (direction === 'prev') {
            this._prevImage();
        }
    }

    async _nextImage() {
        this._currentIndex++;

        if (this._currentIndex === ProductSlider.sliderImages.length) {
            this._currentIndex = 0;
        }

        this._setCurrentImage();

        this.$imageDescription.classList.add('from-default-to-left');
        await resolvePromiseInTime(450);
        this.$imageDescription.classList.remove('from-default-to-left');

        this.$imageDescription.textContent = ProductSlider.sliderImages[this._currentIndex].description;

        this.$imageDescription.classList.add('from-right-to-default');
        await resolvePromiseInTime(500);
        this.$imageDescription.classList.remove('from-right-to-default');
    }

    async _prevImage() {
        this._currentIndex--;

        if (this._currentIndex < 0) {
            this._currentIndex = ProductSlider.sliderImages.length - 1;
        }

        this._setCurrentImage();

        this.$imageDescription.classList.add('from-default-to-right');
        await resolvePromiseInTime(450);
        this.$imageDescription.classList.remove('from-default-to-right');

        this.$imageDescription.textContent = ProductSlider.sliderImages[this._currentIndex].description;

        this.$imageDescription.classList.add('from-left-to-default');
        await resolvePromiseInTime(500);
        this.$imageDescription.classList.remove('from-left-to-default');
    }

    _setCurrentImage() {
        this.$currentImage = this._imgs[this._currentIndex];
        this.$currentImage.classList.add('product-item__image--active');
    }

    onResize() {
        if (this._matchMedia.matches) {
            this._rect = this.$sliderWrapper.getBoundingClientRect();
        }
    }

    onMouseEnterSlider() {
        if (!this._matchMedia.matches) return;
        this.$zoomWrapper.classList.add('product-item__zoom--active');
    }

    onMouseLeaveSlider() {
        if (!this._matchMedia.matches) return;
        this.$zoomWrapper.classList.remove('product-item__zoom--active');
        this.$canvasContext.clearRect(0, 0, this.$zoomCanvas.width, this.$zoomCanvas.height);
    }

    onMouseMoveOnSlider(e) {
        if (!this._matchMedia.matches || this._repaint) return;
        
        if (!this._repaint) {
            window.requestAnimationFrame(this._repaintZoomedImage.bind(this, e));
        }

        this._repaint = true;
    }

    _repaintZoomedImage(e) {
        this.$canvasContext.clearRect(0, 0, this.$zoomCanvas.width, this.$zoomCanvas.height);
        let x = e.clientX - this._rect.left;
        let y = e.clientY - this._rect.top;
        const imageWidth = this.$currentImage.naturalWidth / this._zoomRatio;
        const imageHeight = this.$currentImage.naturalHeight / this._zoomRatio;
        
        x = (this.$currentImage.naturalWidth / this._rect.width * x) / this._zoomRatio;
        y = (this.$currentImage.naturalHeight / this._rect.height * y) / this._zoomRatio;

        this.$canvasContext.drawImage(
            this.$currentImage,
            x, y, imageWidth, imageHeight,
            0, 0, this.$zoomCanvas.width, this.$zoomCanvas.height);
        
        this._repaint = false;
    }

    static get sliderImages() {
        return [
            { url: '../img/1.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi cumque esse Excepturi inventore iste magni, praesentium quo sed vero voluptas!' },
            { url: '../img/2.jpg', description: 'Lorem ipsum dolor sit amet. Commodi cumque esse Excepturi inventore iste magni, praesentium quo sed vero voluptas!' },
            { url: '../img/3.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi inventore iste magni, praesentium quo sed vero voluptas!' }
        ]
    }
}

window.customElements.define('product-slider', ProductSlider);
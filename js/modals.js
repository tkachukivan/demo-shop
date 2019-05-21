const modals = {
    buy: {
        modal: document.querySelector('.buy-modal'),
        openButton: document.querySelector('.button-buy'),
        closeButton: document.querySelector('.buy-modal .button'),
        isActive: false,
    },
    delete: {
        modal: document.querySelector('.delete-modal'),
        openButton: document.querySelector('.button-delete'),
        closeButton: document.querySelector('.delete-modal .button--secondary'),
        isActive: false,
    },
    edit: {
        modal: document.querySelector('.edit-modal'),
        openButton: document.querySelector('.button-edit'),
        closeButton: document.querySelector('.edit-modal .button--secondary'),
        isActive: false,
    },
}

const query = window.matchMedia("(max-width: 800px)");
query.addListener(onMediaQueryChange);


Object.keys(modals).forEach(key => {
    const modalWindow = modals[key];
    if(!modalWindow.modal) return;

    modalWindow.openButton.addEventListener('click', () => {
        modalWindow.modal.classList.toggle('modal-wrapper--active');

        if (query.matches) {
            adjastBodySize(modalWindow.modal);
        }

        modalWindow.isActive = true;
        toggleBlur();
    });

    modalWindow.closeButton.addEventListener('click', () => {
        modalWindow.modal.classList.toggle('modal-wrapper--active');
        document.body.style.height = 'auto';
        modalWindow.isActive = false;
        toggleBlur();
    })
})

function toggleBlur() {
    document.querySelector('.container').classList.toggle('container--blur');
}

function onMediaQueryChange({ matches }) {
    if (matches) {
        Object.keys(modals)
            .forEach( key => {
                if (modals[key].modal && modals[key].isActive) {
                    adjastBodySize(modals[key].modal);
                };
            });
    } else {
        document.body.style.height = 'auto';
    }
}

function adjastBodySize(modalWrapper) {
    const modalElHeight = modalWrapper.querySelector('.modal').offsetHeight;
    if (modalElHeight > document.body.offsetHeight) {
        document.body.style.height = modalElHeight + 130 + 'px';
    }
}
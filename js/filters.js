const filtersButton = document.getElementsByClassName('button--filter')[0];
const filtersOptionsBlock = document.getElementsByClassName('filter-options')[0];

filtersButton.addEventListener('click', () => {
    filtersButton.classList.toggle('button--active');
    filtersOptionsBlock.classList.toggle('filter-options--active');
})
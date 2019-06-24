const ratingValues = [0, 2];
const priceValues = [87, 822];

$( ".range-input_rating" ).slider({
    max: 5,
    min: 0,
    range: true,
    step: 1,
    values: ratingValues,
    create: createSliderLabeles(ratingValues),
    slide: updateSliderValue,
});

$( ".range-input_price" ).slider({
    max: 2000,
    min: 1,
    range: true,
    step: 1,
    values: priceValues,
    create: createSliderLabeles(priceValues),
    slide: updateSliderValue,  
});

function updateSliderValue(event, ui) {
    $(ui.handle).find('span.range-input__label').text(ui.value);
}

function createSliderLabeles(values) {
    return (event, ui) => {
        const handleElements = $(event.target).find('span.ui-slider-handle');
        $(handleElements[0]).append(`<span class="range-input__label">${values[0]}</span>`)
        $(handleElements[1]).append(`<span class="range-input__label">${values[1]}</span>`)
    }
}
// Function to load card content dynamically
async function loadCardContentDaily(cardClass, contentFile) {
    const response = await fetch(contentFile);
    const contentArray = await response.json(); // Assumes the file contains an array of objects with 'front' and 'back'
    const cardFront = document.querySelector(`.${cardClass} .card-front`);
    const cardBack = document.querySelector(`.${cardClass} .card-back`);

    // Determine the current day of the year
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now - start) / (1000 * 60 * 60 * 24));

    // Select content based on the day of the year
    const content = contentArray[dayOfYear % contentArray.length]; // Loop through content array
    cardFront.innerHTML = content.front;
    cardBack.innerHTML = content.back;
}

// Initialize cards with dynamic daily content
document.addEventListener('DOMContentLoaded', () => {
    // Cards A, B, C, D, F, G, H, I
    loadCardContentDaily('a', 'contentA.js');
    loadCardContentDaily('b', 'contentB.js');
    loadCardContentDaily('c', 'contentC.js');
    loadCardContentDaily('d', 'contentD.js');
    loadCardContentDaily('f', 'contentF.js');
    loadCardContentDaily('g', 'contentG.js');
    loadCardContentDaily('h', 'contentH.js');
    loadCardContentDaily('i', 'contentI.js');

    // Click-to-flip functionality
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const inner = card.querySelector('.card-inner');
            inner.classList.toggle('flip');
        });
    });

    // Automatic flipping
    const flipIntervals = {
        a: 8000,
        f: 9000,
        h: 10000,
        i: 11000
    };

    Object.entries(flipIntervals).forEach(([cardClass, interval]) => {
        setInterval(() => {
            const card = document.querySelector(`.${cardClass} .card-inner`);
            card.classList.toggle('flip');
        }, interval);
    });
});

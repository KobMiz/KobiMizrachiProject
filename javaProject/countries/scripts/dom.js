import { countries, reset, search as goSearch } from './countries.js';

const toggleFavorite = (country, heartIcon) => {
    heartIcon.classList.toggle('clicked');
    country.isLiked = !country.isLiked;
    const likedCountries = countries.map(country => country.isLiked ? country : null).filter(Boolean);
    localStorage.setItem('likedCountries', JSON.stringify(likedCountries));
}

const search = document.getElementById('search');
const cards = document.getElementById('cards');

search.addEventListener('input', (e) => {
    const word = e.target.value;
    cards.innerHTML = '';
    reset();
    if (word === '' || word === null) {
        cards.innerHTML = '';
        createAllCards();
    }
    goSearch(word);
    createAllCards();
});

const createCard = (country) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card shadow rounded m-2 col-md-3 col-sm-10';

    const cardImg = document.createElement('img');
    cardImg.src = country.flags.png;
    cardImg.className = 'card-img-top img border shadow rounded mt-2';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = country.name.common;

    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = `Capital: ${country.capital}.`;

    const population = document.createElement('p');
    population.className = 'card-text';
    population.textContent = `Population: ${country.population}.`;

    const officialLanguages = document.createElement('p');
    officialLanguages.className = 'card-text';
    const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
    officialLanguages.textContent = `Official Languages: ${languages}.`;

    const heartButton = document.createElement('button');
    heartButton.className = 'btn btn-link text-danger';
    const heartIcon = document.createElement('i');
    heartIcon.className = 'fa fa-heart';
    heartButton.appendChild(heartIcon);

    heartButton.onclick = () => toggleFavorite(country, heartIcon); // קריאה לפונקצית toggleFavorite עם הפרמטרים המתאימים

    cardDiv.appendChild(cardImg);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(population);
    cardBody.appendChild(officialLanguages);

    cardDiv.appendChild(cardBody);
    cardDiv.appendChild(heartButton);
    cards.appendChild(cardDiv);
}

const createAllCards = () => {
    cards.innerHTML = '';
    countries.forEach((country) => {
        createCard(country);
    });
}

export { createAllCards, toggleFavorite, search };

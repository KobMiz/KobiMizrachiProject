import { getDataAsync } from './countries.js';
import { createAllCards, toggleFavorite } from './dom.js'; // Add toggleFavorite import

await getDataAsync();
createAllCards();

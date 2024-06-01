const API_KEY = '73e3c0c1fa5044888a2abac3a84865fa';
const NUMBER_OF_RECIPES = 8;
let recipes = [];

async function fetchRandomRecipes() {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?number=${NUMBER_OF_RECIPES}&apiKey=${API_KEY}`);
        const data = await response.json();
        recipes = data.recipes;
        updateWheel();
        document.getElementById('loading').style.display = 'none';
        document.querySelector('.wrapper').style.display = 'flex';
    } catch (error) {
        console.error('Error fetching recipes:', error);
        document.getElementById('loading').textContent = 'Failed to load recipes. Please try again later.';
    }
}

function updateWheel() {
    const wheel = document.querySelector('.wheel');
    wheel.innerHTML = ''; // Clear previous content

    recipes.forEach((recipe, index) => {
        const recipeElement = document.createElement('div');
        recipeElement.className = 'number';
        recipeElement.style.setProperty('--i', index + 1);
        recipeElement.style.setProperty('--clr', getRandomColor());
        const span = document.createElement('span');
        span.textContent = truncateText(recipe.title, 25);
        adjustFontSize(span, truncateText(recipe.title, 25), 70); // Adjust font size to fit
        recipeElement.appendChild(span);
        wheel.appendChild(recipeElement);
    });
}

function getRandomColor() {
    const colors = ['#f44336', '#ff9800', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0', '#e91e63', '#ff5722'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

function adjustFontSize(element, text, maxWidth) {
    let fontSize = 24; // Starting font size
    element.style.fontSize = fontSize + 'px';

    while (element.scrollWidth > maxWidth && fontSize > 12) {
        fontSize -= 1;
        element.style.fontSize = fontSize + 'px';
    }
}

function getSelectedRecipeIndex(finalRotation) {
    const degreesPerSegment = 360 / NUMBER_OF_RECIPES;
    const normalizedRotation = finalRotation % 360;
    return Math.floor((360 - normalizedRotation + (degreesPerSegment / 2)) / degreesPerSegment) % NUMBER_OF_RECIPES;
}

let spinBtn = document.querySelector('.spinBtn');
let value = Math.ceil(Math.random() * 3600);

spinBtn.onclick = function () {
    let wheel = document.querySelector('.wheel');
    let spinValue = Math.ceil(Math.random() * 3600);
    value += spinValue;
    wheel.style.transform = `rotate(${value}deg)`;

    setTimeout(() => {
        const selectedRecipeIndex = getSelectedRecipeIndex(value);
        window.location.href = `recipe.html?id=${recipes[selectedRecipeIndex].id}`;
    }, 5000); // Match the transition duration
}

// Fetch random recipes on page load
fetchRandomRecipes();

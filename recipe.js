const API_KEY = '73e3c0c1fa5044888a2abac3a84865fa';
async function getRecipeDetails(recipeId) {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`);
        const recipe = await response.json();
        displayRecipeDetails(recipe);
        getRelatedRecipes(recipeId);
    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
}

function displayRecipeDetails(recipe) {
    document.getElementById('recipe-title').textContent = recipe.title;
    document.getElementById('recipe-image').src = recipe.image;
    document.getElementById('prep-time').textContent = `${recipe.preparationMinutes} mins`;
    document.getElementById('cook-time').textContent = `${recipe.cookingMinutes} mins`;
    document.getElementById('servings').textContent = recipe.servings;

    const ingredientsList = document.getElementById('ingredients-list');
    recipe.extendedIngredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient.original;
        ingredientsList.appendChild(li);
    });

    const instructionsList = document.getElementById('instructions-list');
    recipe.analyzedInstructions[0].steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step.step;
        instructionsList.appendChild(li);
    });
}

async function getRelatedRecipes(recipeId) {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/similar?apiKey=${API_KEY}&number=5`);
        const relatedRecipes = await response.json();
        displayRelatedRecipes(relatedRecipes);
    } catch (error) {
        console.error('Error fetching related recipes:', error);
    }
}

function displayRelatedRecipes(recipes) {
    const slider = document.getElementById('related-recipes-slider');
    recipes.forEach(recipe => {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg" alt="${recipe.title}">
            <h4>${truncateText(recipe.title, 20)}</h4>
            <p>Prep: ${recipe.readyInMinutes - recipe.cookingMinutes} mins</p>
            <p>Cook: ${recipe.cookingMinutes} mins</p>
            <button onclick="location.href='recipe.html?id=${recipe.id}'">Get Details</button>
        `;
        slider.appendChild(div);
    });
}

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

// Get the recipe ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');

// Fetch and display the recipe details
if (recipeId) {
    getRecipeDetails(recipeId);
} else {
    console.error('No recipe ID provided');
}

const apiKey = "4b62a7b9dbaa45658301f53972e3f5a7"; // Replace with your Spoonacular API key

async function getRandomRecipe() {
  const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`);
  const data = await response.json();
  const recipe = data.recipes[0];

  // Update the image and title
  document.getElementById("recipe-image").src = recipe.image;
  document.getElementById("recipe-title").textContent = recipe.title;

  // Populate the ingredients list
  const ingredientsList = document.getElementById("ingredients-list");
  ingredientsList.innerHTML = ""; // Clear existing list
  recipe.extendedIngredients.forEach(ingredient => {
    const listItem = document.createElement("li");
    listItem.textContent = `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`;
    ingredientsList.appendChild(listItem);
  });

  // Populate the instructions
  document.getElementById("instructions-list").textContent = ""; // Clear existing instructions
  const instructionsList = document.getElementById("instructions-list");
  recipe.analyzedInstructions[0]?.steps.forEach(step => {
    const stepItem = document.createElement("li");
    stepItem.textContent = step.step;
    instructionsList.appendChild(stepItem);
  });

  // Display the preparation time and calories (if available)
  document.getElementById("prep-time").textContent = `${recipe.readyInMinutes} minutes`;
  const calories = recipe.nutrition?.nutrients.find(nutrient => nutrient.name === "Calories");
  document.getElementById("calories").textContent = calories ? `${calories.amount} kcal` : "N/A";
}
getRandomRecipe();

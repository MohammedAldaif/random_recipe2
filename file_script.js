const apiKey = "4b62a7b9dbaa45658301f53972e3f5a7"; // Your Spoonacular API key
// Function to fetch the random recipe
async function getRandomRecipe() {
    const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`);
    const data = await response.json();
    const recipe = data.recipes[0];
  
    // Update the recipe section with fetched data
    document.getElementById("recipe-image").src = recipe.image;
    document.getElementById("recipe-title").textContent = recipe.title;
  
    const ingredientsList = document.getElementById("ingredients-list");
    ingredientsList.innerHTML = "";
    recipe.extendedIngredients.forEach(ingredient => {
      const listItem = document.createElement("li");
      listItem.textContent = ingredient.original;
      ingredientsList.appendChild(listItem);
    });
  
    const instructionsList = document.getElementById("instructions-list");
    instructionsList.innerHTML = ""; // Clear previous instructions
  
    // Remove <ol>, <li> structure and just add plain paragraphs
    recipe.instructions.split('\n').forEach(instruction => {
      const instructionParagraph = document.createElement("p");
      instructionParagraph.textContent = instruction.trim();
      if (instructionParagraph.textContent) {
        instructionsList.appendChild(instructionParagraph); // Append instructions as paragraphs
      }
    });
  
    // Hide the landing page section and display the recipe section
    document.querySelector(".landing-page").style.display = "none";
    document.getElementById("recipe-section").style.display = "block";
  }  
// Add event listener for the button
document.getElementById("go-button").addEventListener("click", getRandomRecipe);

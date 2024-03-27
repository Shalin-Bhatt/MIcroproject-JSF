document.addEventListener('DOMContentLoaded', async () => {
    const getRecipesBtn = document.getElementById('getRecipesBtn');
    const dataContainer = document.getElementById('data-container');

    getRecipesBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/recipes');
            const recipes = await response.json();
            displayRecipes(recipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    });

    async function displayRecipes(recipes) {
        // Clear previous recipes
        dataContainer.innerHTML = '';

        // Display recipes
        recipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');
            recipeElement.innerHTML = `
                <h3>${recipe.name}</h3>
                <ul>
                    ${recipe.ingredients.map(ingredient => `<li> - ${ingredient}</li>`).join('')}
                </ul>
            `;
            dataContainer.appendChild(recipeElement);
        });
    }

    
});

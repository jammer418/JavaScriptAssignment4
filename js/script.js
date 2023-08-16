// main function that is executed when the button is pressed or when handleKeyUp(the function that detects if the enter key has been pressed) is run
function searchCocktails() {
    const searchInput = document.getElementById("searchInput").value;
    const cocktailList = document.getElementById("cocktailList");
    cocktailList.innerHTML = ""; // Clear previous results
    
    // fetches cocktail api data
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.drinks) {
                // Display each cocktail's information
                data.drinks.forEach(cocktail => {
                    const cocktailDiv = document.createElement("div");
                    cocktailDiv.classList.add("cocktail");
                    cocktailDiv.innerHTML = `
                        <h2>${cocktail.strDrink}</h2>
                        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
                        <p><strong>Category:</strong> ${cocktail.strCategory}</p>
                        <p><strong>Instructions:</strong> ${cocktail.strInstructions}</p>
                        <p><strong>Ingredients:</strong> ${getIngredients(cocktail)}</p>
                    `;
                    cocktailList.appendChild(cocktailDiv);
                });
            } else {
                cocktailList.innerHTML = "<p>No cocktails found.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

//fucntion that displays cocktail ingredients 
function getIngredients(cocktail) {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        const measure = cocktail[`strMeasure${i}`];
        if (ingredient) {
            ingredients.push(`${ingredient} (${measure})`);
        }
    }
    return ingredients.join(", ");
}


//function to detect if enter key is pressed 
function handleKeyUp(event) {
    if (event.keyCode === 13) { 
        searchCocktails();
    }
}
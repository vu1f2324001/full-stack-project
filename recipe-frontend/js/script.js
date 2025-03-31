// Recipe Search Functionality
function searchRecipes() {
    let input = document.getElementById("search").value.toLowerCase();
    let recipes = document.querySelectorAll(".recipe-card");
    recipes.forEach(card => {
        let title = card.querySelector("h3").innerText.toLowerCase();
        card.style.display = title.includes(input) ? "block" : "none";
    });
}

// Favorite Recipe System
function addToFavorites(recipe) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(recipe)) {
        favorites.push(recipe);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert(recipe + " added to favorites!");
    }
}

// User Recipe Submission
document.getElementById("recipeForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let name = document.getElementById("recipeName").value;
    let desc = document.getElementById("recipeDesc").value;
    let recipes = JSON.parse(localStorage.getItem("userRecipes")) || [];
    recipes.push({ name, desc });
    localStorage.setItem("userRecipes", JSON.stringify(recipes));
    alert("Recipe Submitted Successfully!");
});
function toggleDarkMode() {
    const body = document.body;

    body.classList.toggle("dark-mode");

    // Save user preference in localStorage
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}

// Apply dark mode if user has enabled it previously
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
});
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let email = document.querySelector("input[type='email']").value;
    let message = document.querySelector("textarea").value;

    if (!email.includes("@") || message.length < 10) {
        alert("Please enter a valid email and a message with at least 10 characters.");
    } else {
        alert("Message sent successfully!");
    }
});
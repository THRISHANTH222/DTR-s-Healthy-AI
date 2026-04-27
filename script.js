// Data and Logic
const unhealthyKeywords = ["fried", "burger", "pizza", "fries", "maggi", "chips", "coke", "soda", "cake", "ice cream"];
const healthyKeywords = ["salad", "fruit", "fruits", "boiled", "idli", "apple", "banana", "vegetable", "oats", "smoothie"];

const foodDatabase = {
    "pizza": { calories: 800, suggestion: "Try whole wheat veggie sandwich or a lighter homemade pizza." },
    "burger": { calories: 500, suggestion: "Try a grilled sandwich or a salad instead." },
    "fries": { calories: 400, suggestion: "Try baked potato wedges or sweet potato fries." },
    "dosa": { calories: 250, suggestion: "Pair with lots of vegetable sambar and less chutney." },
    "idli": { calories: 150, suggestion: "Great choice! Add a bowl of fresh fruit for vitamins." },
    "salad": { calories: 120, suggestion: "Keep it up! Watch out for high-calorie dressings." },
    "fruits": { calories: 90, suggestion: "Perfect natural snack. Add nuts for protein." },
    "maggi": { calories: 350, suggestion: "Try whole wheat noodles loaded with vegetables." },
    "rice": { calories: 200, suggestion: "Control portion size and add double the amount of veggies." },
    "chicken curry": { calories: 350, suggestion: "Opt for grilled chicken or use less oil in the curry." }
};

// AI Tips Simulation
const aiTips = [
    "Drinking water before meals can help you feel full and eat fewer calories.",
    "Eating protein with every meal helps stabilize your blood sugar.",
    "Aim for a colorful plate – different colors mean different nutrients!",
    "Chew your food slowly to improve digestion and prevent overeating.",
    "Swap sugary drinks for sparkling water with a squeeze of lemon.",
    "Don't ban your favorite foods, just enjoy them in moderation."
];

// DOM Elements
const foodInput = document.getElementById("foodInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const quickSelectBtns = document.querySelectorAll(".chip");

const resultsSection = document.getElementById("resultsSection");
const foodNameTitle = document.getElementById("foodNameTitle");
const healthLabel = document.getElementById("healthLabel");
const scoreValue = document.getElementById("scoreValue");
const caloriesValue = document.getElementById("caloriesValue");
const explanationText = document.getElementById("explanationText");
const suggestionText = document.getElementById("suggestionText");

const moodBtns = document.querySelectorAll(".mood-btn");
const moodResult = document.getElementById("moodResult");
const moodSuggestionText = document.getElementById("moodSuggestionText");

const aiTipBtn = document.getElementById("aiTipBtn");
const aiTipResult = document.getElementById("aiTipResult");
const aiTipText = document.getElementById("aiTipText");

// Event Listeners
analyzeBtn.addEventListener("click", () => {
    const food = foodInput.value.trim().toLowerCase();
    if (food) {
        analyzeFood(food);
    }
});

foodInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const food = foodInput.value.trim().toLowerCase();
        if (food) {
            analyzeFood(food);
        }
    }
});

quickSelectBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const food = btn.getAttribute("data-food");
        foodInput.value = food;
        analyzeFood(food);
    });
});

moodBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Reset active state
        moodBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const mood = btn.getAttribute("data-mood");
        handleMoodSelection(mood);
    });
});

aiTipBtn.addEventListener("click", () => {
    generateAITip();
});

// Core Logic Functions
function analyzeFood(food) {
    let score = 0;
    let category = "";
    let calories = 0;
    let suggestion = "";
    let explanation = "";

    // Determine category based on keywords
    let isHealthy = healthyKeywords.some(keyword => food.includes(keyword));
    let isUnhealthy = unhealthyKeywords.some(keyword => food.includes(keyword));

    if (isHealthy) {
        score = Math.floor(Math.random() * 3) + 8; // 8-10
        category = "healthy";
        explanation = "Excellent choice! Packed with nutrients and good for your body.";
        calories = Math.floor(Math.random() * 150) + 50; // 50-200
        suggestion = "Keep it up! Make sure you're getting a good balance of macros.";
    } else if (isUnhealthy) {
        score = Math.floor(Math.random() * 3) + 3; // 3-5
        category = "unhealthy";
        explanation = "High in calories, fats, or sugars. Best consumed in moderation.";
        calories = Math.floor(Math.random() * 400) + 400; // 400-800
        suggestion = "Try a baked or grilled alternative with more fiber.";
    } else {
        score = Math.floor(Math.random() * 3) + 5; // 5-7
        category = "moderate";
        explanation = "A decent choice. Watch your portion sizes to keep it balanced.";
        calories = Math.floor(Math.random() * 200) + 200; // 200-400
        suggestion = "Add a side of vegetables or a salad to boost the nutrition.";
    }

    // Override with hardcoded database if exists
    if (foodDatabase[food]) {
        calories = foodDatabase[food].calories;
        suggestion = foodDatabase[food].suggestion;
    }

    // Update UI
    updateResultsUI(food, score, category, calories, explanation, suggestion);
}

function updateResultsUI(food, score, category, calories, explanation, suggestion) {
    // Reset classes
    resultsSection.className = "card results-section";
    healthLabel.className = "badge";
    scoreValue.className = "stat-value";

    // Set text values
    foodNameTitle.textContent = food;
    scoreValue.textContent = score;
    caloriesValue.textContent = `~${calories}`;
    explanationText.textContent = explanation;
    suggestionText.textContent = suggestion;

    // Apply specific styles based on category
    resultsSection.classList.add(category);
    healthLabel.classList.add(category);

    // Set specific text for label
    if (category === "healthy") {
        healthLabel.textContent = "Healthy";
        scoreValue.classList.add("healthy-text");
    } else if (category === "moderate") {
        healthLabel.textContent = "Moderate";
        scoreValue.classList.add("moderate-text");
    } else {
        healthLabel.textContent = "Unhealthy";
        scoreValue.classList.add("unhealthy-text");
    }

    // Show section
    resultsSection.classList.remove("hidden");

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function handleMoodSelection(mood) {
    let response = "";

    switch (mood) {
        case "stressed":
            response = "Feeling stressed? Try calming foods like dark chocolate, a warm cup of green tea, or some berries. 🍫🍵";
            break;
        case "tired":
            response = "Need a boost? Grab a banana, a handful of almonds, or some oatmeal for sustained energy! 🍌🥜";
            break;
        case "energetic":
            response = "Keep the energy flowing! A light salad, smoothie, or some grilled protein will keep you going without weighing you down. 🥗🥤";
            break;
    }

    moodSuggestionText.textContent = response;
    moodResult.classList.remove("hidden");
}

function generateAITip() {
    // Add loading effect
    aiTipBtn.textContent = "Generating...";
    aiTipBtn.disabled = true;

    // Simulate network delay
    setTimeout(() => {
        const randomTip = aiTips[Math.floor(Math.random() * aiTips.length)];
        aiTipText.textContent = `🧠 AI Tip: "${randomTip}"`;
        aiTipResult.classList.remove("hidden");

        // Reset button
        aiTipBtn.innerHTML = "✨ Get another AI Tip";
        aiTipBtn.disabled = false;
    }, 800);
}

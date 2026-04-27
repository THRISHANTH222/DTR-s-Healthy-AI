# 🥗 DTR's Healthy AI

A lightweight, visually appealing, and responsive web application designed to help users make healthier food choices instantly. Built for hackathon demonstrations, this app simulates an AI-powered health analysis entirely on the frontend without requiring a backend or database.

## ✨ Features

- **Instant Food Analysis:** Enter a food item or use quick-select chips to instantly receive a health score (1-10), estimated calories, and a categorization (Healthy/Moderate/Unhealthy).
- **Smart Suggestions:** Provides practical, healthier alternatives based on the selected food.
- **Mood-Based Recommendations:** Suggests specific types of food depending on how you're feeling (Stressed, Tired, or Energetic).
- **Simulated AI Tips:** Generates actionable health tips with a realistic network delay simulation.
- **Premium UI/UX:** Features a modern glassmorphism design, vibrant color-coded cards, and animated ambient backgrounds.

## 🛠️ Tech Stack

- **Frontend:** Pure HTML5, Vanilla JavaScript, and CSS3.
- **Deployment:** Pre-configured with a `Dockerfile` for easy deployment to **Google Cloud Run** via Nginx.
- **Dependencies:** None! No `npm` or `node_modules` required to run this project locally.

## 🚀 How to Run Locally

Because this project is built entirely with vanilla web technologies, running it locally is incredibly easy.

**Option 1: Direct File Access**
Simply double-click the `index.html` file to open it directly in your web browser. Everything will work instantly!

**Option 2: Using a Local HTTP Server (Optional)**
If you prefer to run it through a server (e.g., to avoid CORS issues if you add APIs later):
- **Python:** Run `python -m http.server 8000` in the directory.
- **Node.js:** Run `npx serve .` in the directory.
- **VS Code:** Install the "Live Server" extension and click "Go Live".

## ☁️ Deployment to Google Cloud Run

This project is container-ready. You can deploy it to Google Cloud Run directly from source.

1. Ensure you have the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) installed and authenticated (`gcloud auth login`).
2. Open your terminal in the project directory.
3. Run the following command:

```bash
gcloud run deploy dtrs-healthy-ai --source . --allow-unauthenticated
```

4. Follow the prompts to select your region. Google Cloud will automatically build the container using the provided `Dockerfile` and give you a live URL!

## 📂 Project Structure

```
.
├── index.html       # The main structure of the application
├── styles.css       # Premium styling, animations, and responsiveness
├── script.js        # Rule-based logic, DOM manipulation, and interactions
├── Dockerfile       # Configuration for deploying via Nginx to Cloud Run
└── .dockerignore    # Files to exclude from the Docker deployment
```

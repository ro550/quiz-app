# Quiz App

A lightweight, responsive quiz application built with HTML, CSS, and JavaScript. This project provides a clean interface for taking multiple-choice quizzes, tracking scores, and reviewing results. It's intended as a simple, client-side web app you can open in any modern browser or host as a static site.

## Overview

Quiz App is a small web application that lets users take timed multiple-choice quizzes and see immediate feedback and final scores. The UI is responsive and designed to work on both desktop and mobile devices. The app stores high scores locally (in the browser) so users can track their progress across sessions.

The repository is primarily built with JavaScript (68.5%), CSS (19.7%), and HTML (11.8%).

## Technologies Used

- HTML5
- CSS3 (responsive layout, simple transitions)
- JavaScript (vanilla ES6+)
- Browser localStorage (for persisting high scores)
- Optional: use a static server (e.g., `live-server`, `http-server`) for local development

## Features

- Multiple-choice question support
- Timed quizzes with configurable durations
- Immediate feedback on answers (correct / incorrect)
- Final score calculation and summary
- High-scores stored in browser localStorage
- Responsive and mobile-friendly UI
- Progress indicator for remaining questions
- Keyboard accessible controls for quick answering

## Getting Started

To run the app locally:

1. Clone the repository:

   git clone https://github.com/ro550/quiz-app.git

2. Open `index.html` in your browser, or serve the directory using a static server:

   - Using `live-server` (recommended for development):
     - Install: `npm install -g live-server`
     - Run: `live-server`

   - Using Python simple server (Python 3):
     - Run: `python -m http.server 8000`
     - Open: `http://localhost:8000`

## Usage

- Launch the app and choose a quiz (or category, if available).
- Start the quiz to begin the timer and view the first question.
- Select an answer for each question and proceed to the next.
- At the end of the quiz you will see a score summary and, if enabled, an option to save your score.

## Contributing

Contributions are welcome. If you'd like to add features, improve accessibility, or fix bugs:

1. Fork the repository
2. Create a branch for your change (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am "Add feature"`)
4. Push to your fork (`git push origin feature/my-feature`)
5. Open a Pull Request with a clear description of your changes

## License

This project is licensed under the MIT License. See `LICENSE` for details.

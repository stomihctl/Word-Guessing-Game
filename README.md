# Rečko - Word Guessing Game

## Overview
"Rečko" is a word-guessing game developed as a laboratory exercise for the Web Design course during the 2024/25 academic year. Inspired by Wordle, the player’s goal is to guess a secret five-letter word within a limited number of attempts. After each guess, feedback is provided through colored tiles:
- **Green**: Letter is in the secret word and in the correct position.
- **Yellow**: Letter is in the secret word but in the wrong position.
- **Gray**: Letter is not in the secret word.

The game supports input via a physical or on-screen keyboard, with valid guesses limited to a predefined dictionary of ten words. The game ends with a success message if the word is guessed or reveals the secret word if attempts are exhausted.

## Features
- **Interactive Grid**: Displays guesses (rows) and letters (columns), with tiles colored based on feedback after each guess.
- **On-Screen Keyboard**: Allows input and reflects feedback through colored keys.
- **Game Outcome**: Shows a success message for correct guesses or the secret word upon failure.
- **Additional Functionality**:
  - Button to view detailed game instructions.
  - Statistics panel displaying the distribution of successful guesses (e.g., wins in 1st, 2nd, ..., 6th attempt, and losses).
- **Custom Design**: Intuitive and visually appealing interface, designed independently from the provided example.

## Technologies Used
- **HTML**: Structures the game interface (grid, keyboard, buttons).
- **CSS**: Provides responsive and modular styling (separate `.css` files).
- **JavaScript**: Manages game logic, including word validation, feedback, attempt tracking, and statistics.

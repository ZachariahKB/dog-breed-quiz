document.addEventListener('DOMContentLoaded', function() {
    const takeQuizButton = document.getElementById('take-quiz-btn');
    const quizSection = document.getElementById('quiz-section');
    const quizSubmitButton = document.getElementById('quiz-submit');
    const resultsSection = document.getElementById('results-section');
    const resultHeading = document.getElementById('result-heading');
    const resultContent = document.getElementById('result-content');

    // Event listener for when the "Take the Quiz" button is clicked
    takeQuizButton.addEventListener('click', function() {
        quizSection.style.display = 'block';
        takeQuizButton.style.display = 'none';
    });

    // Event listener for when the quiz is submitted
    quizSubmitButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission
        const quizFormData = new FormData(quizSection);
        const choices = {};
        for (const [name, value] of quizFormData.entries()) {
            choices[name] = value;
        }
        // Here you can process the user's choices and determine the result
        // For demonstration purposes, let's assume the result is just based on the first choice
        const result = choices.choice1;

        // Display the result
        resultHeading.textContent = 'Your Recommended Dog Breed';
        resultContent.textContent = `Based on your choices, your recommended dog breed is: ${result}`;
        resultsSection.style.display = 'block';
    });
});

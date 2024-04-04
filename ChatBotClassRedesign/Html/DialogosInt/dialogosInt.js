window.onload = function() {
    getDialogos();
};

let currentOrder = 1; // Keep track of the current order

function getDialogos() {
    fetch('http://127.0.0.1:5000/getDialogosInt', {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle the JSON response data here
        const dialogue = data.dialogue_phrases.find(dialogue => dialogue.order === currentOrder);

        if (dialogue) {
            const phrases = dialogue.phrases;
            const answer = dialogue.answer;

            const questionsDiv = document.getElementById('questionsDiv');

            // Clear any previous content in questionsDiv
            questionsDiv.innerHTML = '';

            // Loop through each phrase and create a paragraph element
            phrases.forEach(phrase => {
                const paragraph = document.createElement('p');
                paragraph.textContent = phrase;
                questionsDiv.appendChild(paragraph);
            });

            // Create a button for the answer
            const answerButton = document.createElement('button');
            answerButton.textContent = currentOrder === data.dialogue_phrases.length ? data.dialogue_phrases[data.dialogue_phrases.length - 1].answer : answer;
            answerButton.addEventListener('click', () => {
                if (currentOrder === data.dialogue_phrases.length) {
                    // Redirect to another HTML page
                    window.location.href = '../Avaliacao/avaliacao.html';
                } else {
                    // Increment currentOrder and call getDialogos() again
                    currentOrder++;
                    getDialogos();
                }
            });
            questionsDiv.appendChild(answerButton);
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

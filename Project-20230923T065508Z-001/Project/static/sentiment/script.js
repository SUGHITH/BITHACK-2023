document.addEventListener('DOMContentLoaded', function () {
    const reviewInput = document.getElementById('reviewInput');
    const analyzeButton = document.getElementById('analyzeButton');
    const resultContainer = document.getElementById('resultContainer');
    const overallSentiment = document.getElementById('overallSentiment');
    const positiveAspects = document.getElementById('positiveAspects');
    const negativeAspects = document.getElementById('negativeAspects');

    analyzeButton.addEventListener('click', function (event) {
        const review = reviewInput.value.trim();
        event.preventDefault();
        // Check if the review is empty
        if (review === '') {
            alert('Please Enter a review.');
            return;
        }

        // Send the review to the server for analysis
        fetch('/analyze', {
            method: 'POST',
            body: new URLSearchParams({ review }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(response => response.json())
        .then(data => {
            // Display overall sentiment
            overallSentiment.textContent = `Overall sentiment: "${data.overall_sentiment}"`;

            // Display positive aspects
            const positiveAspectList = data.positive_aspects;
            positiveAspects.innerHTML = '';
            for (let i = 0; i < positiveAspectList.length; i++) {
                const aspectItem = document.createElement('li');
                aspectItem.textContent = `${i + 1}: ${positiveAspectList[i]}`;
                positiveAspects.appendChild(aspectItem);
            }

            // Display negative aspects
            const negativeAspectList = data.negative_aspects;
            negativeAspects.innerHTML = '';
            for (let i = 0; i < negativeAspectList.length; i++) {
                const aspectItem = document.createElement('li');
                aspectItem.textContent = `${i + 1}: ${negativeAspectList[i]}`;
                negativeAspects.appendChild(aspectItem);
            }

            // Show the result container
            resultContainer.style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
    });
});

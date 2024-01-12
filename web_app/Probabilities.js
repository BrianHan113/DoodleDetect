function Probabilities(predictResult) {

    let data = predictResult.predictions // Array of probabilities
    let prediction = predictResult.guess // Index of largest probability
    let dataPercent = data.map(element => element * 100);

    // Get the context of the canvas element
    const canvas = document.getElementById('probDist');
    const context = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    // Clear the previous histogram
    let existingChart = Chart.getChart(context);
    if (existingChart) {
        existingChart.destroy();
    }

    console.log(classNames[prediction]); // Classname logged to console for testing
    
    // Create a bar chart using Chart.js
    Chart.defaults.font.size = 16;
    const probDistChart = new Chart(context, {
        type: 'bar',
        data: {
            labels: classNames,
            datasets: [{
                data: dataPercent,
                backgroundColor: '#3498db',
                borderWidth: 1,
                label: '', // Remove unnecesary text
            }]
        },
        options: {
            indexAxis: 'y', // Labels on the Y-axis, percentages on the X-axis
            scales: {
                // Set font-colour to white
                y: {
                    ticks: {
                        color: 'white',
                    }
                },

                x: {
                    ticks: {
                        color: 'white',
                    }
                },
            },
        }
    });
}


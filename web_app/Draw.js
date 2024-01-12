const canvas = document.getElementById('drawingBoard')
const context = canvas.getContext('2d')
const toolbar = document.getElementById('toolbar')

let drawing = false;
let strokeSize = document.getElementById('strokeSize').value; // Preset size in html
let startX;
let startY;
let colour;

// Preprocesses the pixels on canvas, and displays the predictions made by model on the histogram
async function getPrediction() {
    inputTensor = ProcessImg(context, canvas.width, canvas.height);
    const predictResult = await Predict(inputTensor);
    Probabilities(predictResult);
}

// Handles the visual effect of the toggle 'draw' and 'eraser' buttons
function toggleButton(button) {
    const buttons = document.querySelectorAll('.button');
    let isActive = button.classList.contains('active');
  
    buttons.forEach((btn) => {
        if (btn !== button) {
            btn.classList.remove('active');
        }
    });
  
    if (!isActive) {
        button.classList.add('active');
        context.strokeStyle = button.getAttribute('data-colour');
    }
}

// Get the width and height of the canvas
function handleResize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    context.fillStyle = 'rgb(255, 255, 255)';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

window.onload = handleResize;
window.addEventListener('resize', handleResize);

// Make predictions when the user selects their datasets
document.addEventListener('classNamesUpdated', function() {
    getPrediction();
});

// Handle event for the clear button
toolbar.addEventListener('click', async e => {
    
    if (e.target.id === 'clearButton'){
        context.fillRect(0, 0, canvas.width, canvas.height);
        getPrediction(); // Refresh the histogram to base state
    }
});

// Handle changing the stroke size
toolbar.addEventListener('change', e =>{
    if (e.target.id === 'strokeSize'){
        strokeSize = e.target.value;
    }
});

// Handle Drawing on the canvas
const draw = (e) => {
    if(!drawing) {
        return;
    }
    context.lineWidth = strokeSize;
    context.lineCap = 'round';

    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.stroke();
}

canvas.addEventListener('mousedown', e => {
    drawing = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    drawing = false;
    context.stroke();
    context.beginPath();
    getPrediction(); // Get a prediction for every finished stroke
});

canvas.addEventListener('mousemove', draw);
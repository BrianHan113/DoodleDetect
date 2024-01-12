let cachedModel;

// Load in the pretrained model
async function loadModel() {
    // No need to load model more than once
    if (!cachedModel) {
        cachedModel = await tf.loadLayersModel('web_model/model.json');
        console.log("Model loaded");
    };

    return cachedModel;
}

// Get the model's predictions
async function Predict(image) {
    const model = await loadModel();
    const predictions = model.predict(image);

    // Array of probabilities/confidences for each class
    const predictionsArray = predictions.arraySync()[0]; 

    // Find the index of the largest probability in the array 
    let largestNum = predictionsArray[0];
    let largestIndex = 0;
    for (let i = 1; i < classNames.length; i++) {
        if (predictionsArray[i] > largestNum) {
            largestNum = predictionsArray[i];
            largestIndex = i;
        }
    }

    return { predictions: predictionsArray, guess: largestIndex };
}
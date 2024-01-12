// Takes drawing on canvas and processes it so it can be fed into the model
function ProcessImg(context, width, height) {
    var imageData = context.getImageData(0, 0, width, height);
    var pixelData = imageData.data;
    var greyscaleArray = [];
    
    // Make 1D array of greyscale pixel values
    for (var i = 0; i < pixelData.length; i += 4) {
        // Inverse colour and normalize between 0 and 1 for CNN model (trained on inverted colour imgs)
        var greyscale = ((255 - pixelData[i]) / 255.0); // Arbitrarily take red value, RGB all the same
        greyscaleArray.push(greyscale);
    }

    // Convert 1D array to 2D
    var greyscale2DArray = [];
    for (var i = 0; i < greyscaleArray.length; i += width) {
        greyscale2DArray.push(greyscaleArray.slice(i, i + width)); // .slice() end index is not inclusive
    }

    // Use downsizeArray to generate 28x28 2d array in order to match model's trained dataset
    var resizedArray = downsizeArray(greyscale2DArray, 28, 28);

    // Code gets JSON string to visualize the img in python for testing
    // var jsonString = JSON.stringify(resizedArray);
    // var tempTextArea = document.createElement("textarea");
    // tempTextArea.value = jsonString;
    // document.body.appendChild(tempTextArea);
    // tempTextArea.select();
    // document.execCommand("copy");
    // document.body.removeChild(tempTextArea);

    // Format and add dimensions to fit size requirement for tf model
    var inputTensor = tf.tensor2d(resizedArray);
    inputTensor = inputTensor.expandDims(2);
    inputTensor = inputTensor.expandDims(0);
    
    return inputTensor;
}

// Downsize original 2D array into desired dimensions using bilinear interpolation
function downsizeArray(originalArray, newWidth, newHeight) {
    var originalWidth = originalArray[0].length;
    var originalHeight = originalArray.length;

    // Scaling factors responsible for picking out samples from original array
    var scaleX = originalWidth / newWidth;
    var scaleY = originalHeight / newHeight;

    var resizedArray = [];

    for (var y = 0; y < newHeight; y++) {
        var row = [];
        for (var x = 0; x < newWidth; x++) {
            var sampleX = Math.floor(x * scaleX);
            var sampleY = Math.floor(y * scaleY);

            // Get the sampled row, and the row directly below it
            var topRow = originalArray[sampleY] || [];
            var bottomRow = originalArray[sampleY + 1] || [];

            // For each of the two rows, get the sampled column value
            var top = topRow[sampleX] || 0;
            var bottom = bottomRow[sampleX] || 0;

            // Bilinear interpolation formula
            row.push(0.5 * (top + bottom));
        }
        resizedArray.push(row);
    }

    return resizedArray;
}

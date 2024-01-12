from keras.models import load_model
from PIL import Image
import numpy as np
from getClassNames import classNames

def Predict(input_img):
    model = load_model('model.h5')

    input_img = input_img[:,:,0] # Convert 3D array to 2D greyscale
    input_img = np.transpose(input_img)

    # Resize image to 28 x 28
    pil_image = Image.fromarray(input_img)
    resized_image = pil_image.resize((28, 28), Image.LANCZOS)
    resized_image = np.array(resized_image)

    # Invert colour to match dataset and normalize pixel values to [0, 1]
    image = (255 - resized_image) / 255
    image = np.expand_dims(image, axis=0) # To match required shape by tf

    prediction = model.predict(image)

    print(prediction * 100)
    index = np.argmax(prediction)
    guess = (classNames[index])

    return guess
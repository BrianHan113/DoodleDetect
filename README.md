# DoodleDetect
Detects what you draw using a convolutional neural network trained with selected QuickDraw datasets. 

This repo comes with pretrained models on the Google QuickDraw Dataset
I used these datasets:
 - Bee
 - Book
 - Skull

 ## How to make your own model
 You can delete the pretrained models and placeholder datasets, and train your own with any QuickDraw Numpy datasets you choose from: https://console.cloud.google.com/storage/browser/quickdraw_dataset/full/numpy_bitmap

1. Make sure to save the downloaded datasets as full_numpy_bitmap_{NAME}.npy in the QuickDrawDataset Folder
2. Run model.py, which will create your model, saved as model.h5 in the same directory
3. You can then run draw.py to draw and guess directly in python

**NOTE:** The repo comes with BLANK datasets that are just placeholders required for the website to work. Please note that you will not be able to train and make a model using these placeholder datasets.

## Running on the Website
1. Go to tfjs_model_converter.ipynb to convert the model.h5 to a tfjs model compatible with JS
2. Run each codeblock, and find the web_model output folder in files on the left taskbar
3. Save the model.json and the .bin files in the web_model folder, and run index.html
4. On the website, you must click the bottom left button and select your dataset files to allow access to filenames

**NOTE:** You need to open index.html with a live server, or disable CORS for your browser in order to run correctly.
The purpose of the google colab notebook to convert the model is due to documented version and OS compatibility problems with tfjs converter
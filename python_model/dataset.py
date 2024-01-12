import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
import os

collatedTrain = []
collatedTrainLabels = []
collatedValidation = []
collatedValidationLabels = []
collatedTest = []
collatedTestLabels = []
encodingNum = 0
NUM_IMAGES_PER_CLASS = 60000 # Number of images to get per label
DATASET_LIST = os.listdir('../QuickDrawDataset') # Gets the filenames of all datasets in the folder
TRAIN_PERCENTAGE = 0.9
VALIDATE_PERCENTAGE = 0.099999

# Create labelled subsets for each numpy dataset saved in the QuickDrawDataset folder
for item in DATASET_LIST:
    item = item.strip()
    filePath = f'../QuickDrawDataset/{item}'
    bitmapData = np.load(filePath)

    # Split the dataset into train, validate, testing subsets
    totalImages = NUM_IMAGES_PER_CLASS
    numTrain = int(totalImages * TRAIN_PERCENTAGE)
    numValidate = int(totalImages * VALIDATE_PERCENTAGE)
    numTest = totalImages - numTrain - numValidate
    train = bitmapData[:numTrain]
    validate = bitmapData[numTrain:(numTrain + numValidate)]
    test = bitmapData[(numTrain + numValidate):totalImages]

    # Reshape dataset to 2D arrays
    train = np.array(train).reshape(-1, 28, 28)
    validate = np.array(validate).reshape(-1, 28, 28)
    test = np.array(test).reshape(-1, 28, 28)

    # Normalize pixel values between [0, 1]
    train = train / 255.0
    validate = validate / 255.0
    test = test / 255.0

    # Create encoding number arrays with length of each subset
    trainLabels = np.full(numTrain, encodingNum)
    validateLabels = np.full(numValidate, encodingNum)
    testLabels = np.full(numTest, encodingNum)

    # Store subsets and their labels to corresponding lists
    collatedTrain.append(train)
    collatedTrainLabels.append(trainLabels)
    collatedValidation.append(validate)
    collatedValidationLabels.append(validateLabels)
    collatedTest.append(test)
    collatedTestLabels.append(testLabels)

    encodingNum += 1

# Convert all labeled datasets to tensorflow dataset
trainDataset = tf.data.Dataset.from_tensor_slices((np.concatenate(collatedTrain), np.concatenate(collatedTrainLabels)))
validateDataset = tf.data.Dataset.from_tensor_slices((np.concatenate(collatedValidation), np.concatenate(collatedValidationLabels)))
testDataset = tf.data.Dataset.from_tensor_slices((np.concatenate(collatedTest), np.concatenate(collatedTestLabels)))

print("Dataset Created Successfully")
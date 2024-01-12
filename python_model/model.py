from dataset import trainDataset, validateDataset, testDataset, encodingNum
from getClassNames import classNames
import tensorflow as tf
from keras import layers, models
import numpy as np
import matplotlib.pyplot as plt

BATCH_SIZE = 32
SHUFFLE_BUFFER_SIZE = 500000
LEARNING_RATE = 0.001
EPOCHS = 3

# Setting up subsets
trainBatches = trainDataset.shuffle(SHUFFLE_BUFFER_SIZE).batch(BATCH_SIZE)
validateBatches = validateDataset.batch(BATCH_SIZE)
testBatches = testDataset.batch(BATCH_SIZE)

model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    layers.MaxPooling2D(2, 2),
    layers.Conv2D(64, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    layers.MaxPooling2D(2, 2),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(encodingNum, activation='softmax') 
    # At the end of running dataset.py, encodingNum contains the total number of classes
])

model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=LEARNING_RATE),
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=False),
              metrics=['accuracy'])

# Training
history = model.fit(trainBatches,
                    epochs=EPOCHS,
                    validation_data=validateBatches)

acc = history.history['accuracy']
print("Model accuracy: ", acc)

# Testing
testLoss, testAcc = model.evaluate(testBatches, verbose=0)
print("Test accuracy: ", testAcc)

# Predictions
# predictions = model.predict(testBatches)

# for images, labels in testBatches:
#     batch_predictions = model.predict(images)

#     for i in range(images.shape[0]):
#         index = np.argmax(batch_predictions[i])
#         actual_class = classNames[int(labels[i].numpy())]
#         predicted_class = classNames[index]
#         print("Actual Class: ", actual_class, " | Predicted Class: ", predicted_class)

#         plt.figure()
#         plt.imshow(images[i].numpy().reshape(28, 28), cmap="gray")
#         plt.colorbar()
#         plt.grid(False)
#         plt.show()

model.save("model.h5")
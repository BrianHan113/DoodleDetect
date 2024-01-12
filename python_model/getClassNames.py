import os

DATASET_LIST = os.listdir('../QuickDrawDataset')
classNames = []

# Formats each dataset filename to get a list of class names
for item in DATASET_LIST:
    item = item.strip()
    classNames.append(item.replace('full_numpy_bitmap_', '').replace('.npy', '').title())
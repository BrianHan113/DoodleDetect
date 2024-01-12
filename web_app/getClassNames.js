let classNames = [];

document.getElementById('fileInput').addEventListener('change', function(event) {
    classNames = [];
    const fileList = event.target.files; // List of dataset filenames selected
    
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      let fileName = file.name;
      // Format the filename for clarity in the class name
      fileName = fileName.replace('full_numpy_bitmap_', '').replace('.npy', '');
      fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
      classNames.push(fileName);
    }

    // Notify that the user has selected their datasets
    document.dispatchEvent(new Event('classNamesUpdated'));
});
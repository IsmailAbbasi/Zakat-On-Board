import imageCompression from 'browser-image-compression';

/**
 * Compresses an image file to a target size
 * @param {File} file - The image file to compress
 * @param {number} maxSizeMB - Maximum size in MB (default: 1)
 * @returns {Promise<File>} - Compressed image file
 */
export async function compressImage(file, maxSizeMB = 1) {
  const options = {
    maxSizeMB,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: file.type,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw new Error('Failed to compress image');
  }
}

/**
 * Validates if file is an image
 * @param {File} file - The file to validate
 * @returns {boolean}
 */
export function isValidImageType(file) {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  return validTypes.includes(file.type);
}

/**
 * Validates file size (before compression)
 * @param {File} file - The file to validate
 * @param {number} maxSizeMB - Maximum size in MB (default: 10)
 * @returns {boolean}
 */
export function isValidFileSize(file, maxSizeMB = 10) {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

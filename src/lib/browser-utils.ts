// Browser-compatible utilities for image processing

/**
 * Convert a File to base64 string
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Convert base64 string to Uint8Array (browser-compatible)
 */
export function base64ToUint8Array(base64: string): Uint8Array {
  // Remove data URL prefix if present
  const base64Data = base64.includes(',') ? base64.split(',')[1] : base64;

  // Convert base64 to binary string
  const binaryString = atob(base64Data);

  // Convert binary string to Uint8Array
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}

/**
 * Convert Uint8Array to base64 string
 */
export function uint8ArrayToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Validate if a string is a valid base64 image
 */
export function isValidBase64Image(base64: string): boolean {
  // Check if it's a data URL
  if (base64.startsWith('data:image/')) {
    return true;
  }

  // Check if it's a valid base64 string
  try {
    // Remove padding if present
    const cleanBase64 = base64.replace(/=+$/, '');

    // Check if it contains only valid base64 characters
    if (!/^[A-Za-z0-9+/]*$/.test(cleanBase64)) {
      return false;
    }

    // Try to decode it
    atob(cleanBase64);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get image dimensions from base64 string
 */
export function getImageDimensions(
  base64: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = base64.startsWith('data:')
      ? base64
      : `data:image/jpeg;base64,${base64}`;
  });
}

/**
 * Resize image to fit within max dimensions while maintaining aspect ratio
 */
export function resizeImage(
  base64: string,
  maxWidth: number = 800,
  maxHeight: number = 600
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Calculate new dimensions
      let { width, height } = img;
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw resized image
      ctx.drawImage(img, 0, 0, width, height);

      // Convert back to base64
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = base64.startsWith('data:')
      ? base64
      : `data:image/jpeg;base64,${base64}`;
  });
}

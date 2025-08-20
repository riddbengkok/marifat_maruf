export interface ConvertedImage {
  file: File;
  previewUrl: string;
  originalName: string;
}

/**
 * Checks if the code is running on the client side
 */
function isClientSide(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Converts HEIC images to JPEG format for browser compatibility
 * @param file - The input file (HEIC or other image format)
 * @returns Promise<ConvertedImage> - The converted image file and preview URL
 */
export async function convertHeicToJpeg(file: File): Promise<ConvertedImage> {
  // Check if we're on the client side
  if (!isClientSide()) {
    throw new Error('HEIC conversion is only available on the client side');
  }

  // Check if the file is HEIC
  const isHeic =
    file.name.toLowerCase().endsWith('.heic') ||
    file.name.toLowerCase().endsWith('.heif') ||
    file.type === 'image/heic' ||
    file.type === 'image/heif';

  if (!isHeic) {
    // If it's not HEIC, return the original file
    return {
      file,
      previewUrl: URL.createObjectURL(file),
      originalName: file.name,
    };
  }

  try {
    // Dynamically import the HEIC library only on the client side
    const heic2any = (await import('heic2any')).default;

    // Convert HEIC to JPEG
    const convertedBlob = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.8, // Good quality while keeping file size reasonable
    });

    // Create a new file with the converted data
    const convertedFile = new File(
      [convertedBlob as Blob],
      file.name.replace(/\.(heic|heif)$/i, '.jpg'),
      {
        type: 'image/jpeg',
        lastModified: file.lastModified,
      }
    );

    // Create preview URL
    const previewUrl = URL.createObjectURL(convertedFile);

    return {
      file: convertedFile,
      previewUrl,
      originalName: file.name,
    };
  } catch (error) {
    console.error('Error converting HEIC file:', error);
    throw new Error(`Failed to convert HEIC file: ${file.name}`);
  }
}

/**
 * Checks if a file is a HEIC image
 * @param file - The file to check
 * @returns boolean - True if the file is HEIC
 */
export function isHeicFile(file: File): boolean {
  return (
    file.name.toLowerCase().endsWith('.heic') ||
    file.name.toLowerCase().endsWith('.heif') ||
    file.type === 'image/heic' ||
    file.type === 'image/heif'
  );
}

/**
 * Gets the supported file types for the file input
 * @returns string - The accept attribute value
 */
export function getSupportedFileTypes(): string {
  return 'image/*,.heic,.heif';
}

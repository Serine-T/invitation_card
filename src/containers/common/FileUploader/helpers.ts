export const imgExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
export const fileExtensions = [...imgExtensions, '.pdf'];

export const getMimeType = (filename: string): string => {
  const extension = filename.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'pdf':
      return 'image/pdf';
    default:
      return 'application/octet-stream'; // Fallback type
  }
};

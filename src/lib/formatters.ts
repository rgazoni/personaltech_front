export function formatCref(value: string, type: 'natural' | 'juridical') {
  // Remove all non-alphanumeric characters
  const alphanumericValue = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  // Apply the formatting pattern
  let formatted = '';
  for (let i = 0; i < alphanumericValue.length; i++) {
    if (i === 6) {
      formatted += '-';
    } else if (i === 7 && type === 'natural') {
      formatted += '/';
    } else if (i === 8 && type === 'juridical') {
      formatted += '/';
    }
    formatted += alphanumericValue[i];
  }

  return formatted;
}

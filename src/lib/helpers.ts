export const isValidEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function isValidCref(cref: string, type: 'juridical' | 'natural'): boolean {
  let regex;
  if (type === 'natural') {
    regex = /^\d{6}-[A-Z]{1}\/[A-Z]{2}$/;
  } else { // juridical
    regex = /^\d{6}-[A-Z]{2}\/[A-Z]{2}$/;
  }
  return regex.test(cref);
}

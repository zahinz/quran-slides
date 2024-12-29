export const convertToArabicNumber = (num: number | string): string => {
  const arabicNumbers =
    '\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669';
  return num
    .toString()
    .replace(/[0123456789]/g, (d) => arabicNumbers[parseInt(d, 10)]);
};

export const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts: string[] = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  return undefined;
};

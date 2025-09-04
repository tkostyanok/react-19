/**
 * @name firstLetterCapitalize
 * @description Takes first letter and capitalize it
 * @params name -> string
 * @return string
 */

export const firstLetterCapitalize = (word: string) => {
  if (!word) return '';
  return word
    .split('')
    .map((letter, index) => (letter = index === 0 ? letter.toUpperCase() : letter))
    .join('');
};

/* eslint-disable linebreak-style */

/**
 * Trancscribe a DNA sequence to RNA
 * @param {String} sequence DNA sequence
 * @returns {String} RNA sequence
 */
export const toRna = (sequence) => {
  const carry = sequence.trim().toLowerCase().split('');

  const DNA_RNA = {
    a: 'u',
    g: 'c',
    c: 'g',
    t: 'a',
  };

  carry.forEach((char) => {
    if (!(char in DNA_RNA)) throw new Error('Invalid input DNA.');
  });

  return carry.map(c => DNA_RNA[c]).join('').toUpperCase();
};

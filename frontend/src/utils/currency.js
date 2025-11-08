/**
 * Format a number as Indian Rupees
 * @param {number} amount - The amount to format
 * @returns {string} Formatted amount in INR
 */
export const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
};
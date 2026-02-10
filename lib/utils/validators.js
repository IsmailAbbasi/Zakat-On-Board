/**
 * Validates email format
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates Indian phone number (10 digits)
 */
export function validatePhone(phone) {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
}

/**
 * Validates UPI ID format
 */
export function validateUPI(upi) {
  const upiRegex = /^[\w.-]+@[\w.-]+$/;
  return upiRegex.test(upi);
}

/**
 * Validates amount is positive
 */
export function validateAmount(amount) {
  return amount > 0;
}

/**
 * Sanitizes user input to prevent XSS
 */
export function sanitizeInput(input) {
  if (!input) return '';
  return input
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 5000); // Max length
}

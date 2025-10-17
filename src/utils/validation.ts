/**
 * signup - signin에서 필요한 input 유효성 검사 유틸
 */

/**
 * 이메일 유효성 검사
 * @param email
 * @returns
 */
export const validateEmail = (email: string): { valid: boolean; message: string } => {
  if (!email) {
    return { valid: false, message: 'Email is required' }
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Please enter a valid email address' }
  }
  return { valid: true, message: '' }
}

/**
 * 비밀번호 유효성 검사
 * @param password
 * @returns
 */
export const validatePassword = (password: string): { valid: boolean; message: string } => {
  if (!password) {
    return { valid: false, message: 'Password is required' }
  }

  if (password.length < 8 || password.length > 16) {
    return { valid: false, message: 'Please enter 8 - 16 Characters' }
  }

  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)

  if (!hasLetter || !hasNumber) {
    return { valid: false, message: 'Enter at least 1 letter/number' }
  }

  return { valid: true, message: '' }
}

/**
 * 필수 항목 검사
 * @param value
 * @param fieldName
 * @returns
 */
export const validateRequired = (
  value: string,
  fieldName: string
): { valid: boolean; message: string } => {
  if (!value || value.trim() === '') {
    return { valid: false, message: `${fieldName} is required` }
  }
  return { valid: true, message: '' }
}

export const firebaseErrorMessages: Record<string, string> = {
  'auth/invalid-email': 'The email address is badly formatted.',
  'auth/user-not-found': 'No user found with this email.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/too-many-requests':
    'Too many unsuccessful login attempts. Please try again later.',
  'auth/email-already-in-use': 'This email address is already in use.',
  'auth/network-request-failed': 'Network error. Please check your connection.',
  'auth/invalid-credential': 'Invalid credentials',
};

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
  sendEmailVerification,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { firebaseApp } from '../../core';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<any>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
  resendVerificationEmail: (email: string, password: string) => Promise<any>;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  const signUp = async (
    email: string,
    password: string,
    displayName: string,
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      // Update the user's profile with their display name and email verification
      if (result.user) {
        await updateProfile(result.user, { displayName });
        await sendEmailVerification(result.user);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (!result.user.emailVerified) {
        await signOut(auth); // Log them out immediately
        return { success: true, isEmailVerified: false };
      }

      return { success: true, isEmailVerified: result.user.emailVerified };
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error logging in with Google:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  const getIdToken = async () => {
    if (!currentUser) return null;
    try {
      return await currentUser.getIdToken();
    } catch (error) {
      console.error('Error getting ID token:', error);
      return null;
    }
  };

  const resendVerificationEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (result.user) {
        if (result.user.emailVerified) {
          await auth.signOut();
          return {
            success: true,
            message: 'Your email is already verified. You can log in now.',
          };
        }

        // Send verification email again
        await sendEmailVerification(result.user);

        // Sign out since we're just sending the verification
        await auth.signOut();

        return {
          success: true,
          message: 'Verification email resent. Please check your inbox.',
        };
      }
    } catch (error: any) {
      console.error('Error resending verification:', error);
      throw error;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    signUp,
    login,
    loginWithGoogle,
    logout,
    getIdToken,
    resendVerificationEmail,
    forgotPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

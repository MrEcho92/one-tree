import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { decodeToken } from '../utils';

type IsAdminType = {
  isAdmin: boolean;
  loading: boolean;
};

function useIsAdmin(user: User | null | undefined): IsAdminType {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAdminStatus() {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const token = await user.getIdToken(true);
        const decodedToken = decodeToken(token);
        setIsAdmin(Boolean(decodedToken.roles?.includes('admin')));
        setLoading(false);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        setLoading(false);
      }
    }

    checkAdminStatus();
  }, [user]);

  return { isAdmin, loading };
}

export default useIsAdmin;

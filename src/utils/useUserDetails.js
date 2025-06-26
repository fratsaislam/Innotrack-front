'use client';
import { useEffect, useState } from 'react';

export const useUserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await fetch('https://innotrack.onrender.com/api/auth/check', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            setUser(data.user);
            // console.log(data.user)
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.warn('User details fetch failed:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, []);

  return { user, loading };
};
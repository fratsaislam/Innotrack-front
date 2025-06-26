'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/auth/check', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Full response:', data); // Debug line
          
          // Check if the response has success: true and user data
          if (data.success && data.user.role === "admin") {
            setIsAuthenticated(true);
            setUser(data.user);
            console.log('User set:', data.user); // Debug line
          } else {
            // Backend returned 200 but success: false
            setIsAuthenticated(false);
            setUser(null);
            router.push('/');
          }
        } else {
          // Handle non-200 responses
          const errorData = await response.json().catch(() => ({}));
          console.log('Auth failed:', response.status, errorData);
          setIsAuthenticated(false);
          setUser(null);
          router.push('/');
        }
      } catch (error) {
        console.warn('Auth check failed:', error);
        setIsAuthenticated(false);
        setUser(null);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return { isAuthenticated, user, loading };
};
import { useState, useEffect } from 'react';

// For the prototype, we use a simple local state "store" for auth.
// In a real app, you would use Context or Zustand + Supabase Auth.

export type Role = 'admin' | 'faculty' | 'student';

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
  avatarInitials: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for mock session
    const storedUser = localStorage.getItem('lumora_mock_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const loginAsUser = (userObj: User) => {
    setUser(userObj);
    localStorage.setItem('lumora_mock_user', JSON.stringify(userObj));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lumora_mock_user');
  };

  return { user, loginAsUser, logout, loading };
};

import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { LOGIN_URL } from '../utils/constant';

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const login = useCallback(
    async (username: string, password: string, roleId: number, deviceType: string, deviceToken: string): Promise<boolean> => {
      setLoading(true);

      try {
        const response = await fetch(LOGIN_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, role_id: roleId, device_type: deviceType, device_token: deviceToken }),
        });

        const result = await response.json();
        const { statusCode, message } = result;

        if (!response.ok) {
          toast.error(message || 'Login failed. Please try again.', { position: 'top-center' });
          return false;
        }

        const token = result.data?.token;

        if (statusCode === 200 && token) {
          localStorage.setItem('authToken', token);
          toast.success(message || 'Login successful!', { position: 'top-center' });
          return true;
        }

        toast.error(message || 'Login failed. Please try again.', { position: 'top-center' });
        return false;
      } catch (error) {
        toast.error('An error occurred during login. Please try again.', { position: 'top-center' });
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, login };
};

export default useLogin;

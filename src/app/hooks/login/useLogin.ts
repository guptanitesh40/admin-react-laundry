import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { LOGIN_URL } from '../../utils/constant';

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const login = useCallback(
    async (username: string, password: string, roleId: number, deviceType: string, deviceToken: string): Promise<boolean> => {
      const token = localStorage.getItem('authToken');
      setLoading(true);

      try {
        const response = await fetch(LOGIN_URL, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username, password, role_id: roleId, device_type: deviceType, device_token: deviceToken }),
        });

        const result = await response.json();
        const { statusCode, message, data } = result;

        if (!response.ok) {
          toast.error(message, { position: 'top-center' });
          return false;
        }

        const authToken = data?.token;

        if (statusCode === 200 && authToken) {
          localStorage.setItem('authToken', authToken);
          localStorage.setItem('user', JSON.stringify(data?.user));
          toast.success(message, { position: 'top-center' });
          return true;
        }

        toast.error(message, { position: 'top-center' });
        return false;
      } catch (error: any) {
        toast.error(error?.message, { position: 'top-center' });
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

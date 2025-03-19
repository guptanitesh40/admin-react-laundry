import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { LOGIN_URL } from "../../utils/constant";
import { login as loginAction } from "../../utils/authSlice";
import useGetUserPermissions from "../roles/useGetUserPermissions";

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { fetchUserPermissions } = useGetUserPermissions();

  const login = useCallback(
    async (
      username: string,
      password: string,
      roleId: number,
      deviceType: string,
      deviceToken: string
    ): Promise<boolean> => {
      setLoading(true);

      try {
        const response = await fetch(LOGIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password,
            role_id: roleId,
            device_type: deviceType,
            device_token: deviceToken,
          }),
        });

        const result = await response.json();
        const { statusCode, message, data } = result;

        if (!response.ok) {
          toast.error(message, { position: "top-center" });
          return false;
        }

        const authToken = data?.token;
        const user = data?.user;

        if (statusCode === 200 && authToken && user) {
          localStorage.setItem("authToken", authToken);
          localStorage.setItem("user", JSON.stringify(user));

          dispatch(
            loginAction({
              isAuthenticated: true,
              token: authToken,
              permissions: [],
              role_id: user.role_id,
            })
          );         
  
          fetchUserPermissions(authToken).then((permissions) => {
            dispatch(
              loginAction({
                isAuthenticated: true,
                token: authToken,
                permissions,
                role_id: user.role_id,
              })
            );
          });

          toast.success(message, { position: "top-center" });
          return true;
        }

        toast.error(message, { position: "top-center" });
        return false;
      } catch (error: any) {
        toast.error(error?.message || "Login failed", {
          position: "top-center",
        });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [dispatch, fetchUserPermissions]
  );

  return { loading, login };
};

export default useLogin;
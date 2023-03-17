import { useContext, useState } from "react";
import { TokenContext } from "../contexts/TokenContext";
import useCookie from "react-use-cookie";
import axios from "axios";
import useLogin from "./useLogin";

const API_URL = import.meta.env.VITE_API_URL;

export default function useRegister() {
  const { token, setToken } = useContext(TokenContext);
  const [, setTokenDataCookie] = useCookie("tokenData", undefined);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { handleLogin } = useLogin();

  async function handleRegister(registerObject) {
    setLoading(true);

    try {
      // creates new user
      const response = await axios.post(`${API_URL}/api/v1/users`, registerObject);

      // when new user is created, login with same credentials
      if (response.status === 200) {
        await handleLogin({
          username: registerObject.username,
          password: registerObject.password,
          rememberMe: registerObject.rememberMe,
        });
      }

    } catch (error) {
      // Error in registration data
      if (error.response) {
        setError("Ugyldig registreringsdata.");
        return;
      }

      // All other errors
      setError("Intern serverfejl");
    } finally {
      setLoading(false);
    }
  }

  return { handleRegister, error, loading };
}

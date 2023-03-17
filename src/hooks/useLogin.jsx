import { useContext, useState } from "react";
import { TokenContext } from "../contexts/TokenContext";
import useCookie from "react-use-cookie";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function useLogin() {
  const { token, setToken } = useContext(TokenContext)
  const [, setTokenDataCookie] = useCookie("tokenData", undefined)

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(loginObject) {
    setLoading(true)

    try {
      const response = await axios.post(`${API_URL}/auth/token`, loginObject);

      // If user clicked "remember me", save to cookie
      if (loginObject.rememberMe) {
        const milliseconds = response.data.validUntil - Date.now()
        const validFor = milliseconds / (1000 * 60 * 60 * 24)

        setTokenDataCookie(JSON.stringify(response.data), {
          days: validFor,
          SameSite: "Strict"
        })
      }

      setToken(response.data)

    } catch (error) {

      // Fejl i brugernavn eller adgangskode
      if (error.response) {
        setError("Ugyldig brugernavn eller adgangskode.")
        return
      }

      // Alle andre fejl
      setError("Intern serverfejl")

    } finally {
      setLoading(false)
    }
  }

  return { handleLogin, error, loading }
}
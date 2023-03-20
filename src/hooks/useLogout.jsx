import { useContext } from "react";
import { TokenContext } from "../contexts/TokenContext";
import useCookie from "react-use-cookie";

export default function useLogout() {
  const { setToken } = useContext(TokenContext);
  const [, setTokenDataCookie] = useCookie("tokenData", undefined)

  function handleLogout() {
    // Clear token from context
    setToken(null);

    // Remove token data from cookie
    setTokenDataCookie("", {
      days: 0,
      SameSite: "Strict"
    })
  }

  return { handleLogout };
}

import splashImage from "../assets/images/splash-image.jpg"
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useInput from "../hooks/useInput";
import useLogin from "../hooks/useLogin";
import useCheckboxInput from "../hooks/useCheckboxInput"
import { RotatingLines } from "react-loader-spinner"

export default function LogIn() {
  useDocumentTitle({ title: "Log ind" })

  const { input: userInput, value: userValue } = useInput({
    containerClassName: "w-full mb-3",
    className: "bg-white text-black w-full h-[50px]",
    placeholder: "Brugernavn",
  });

  const { input: passwordInput, value: passwordValue } = useInput({
    containerClassName: "w-full mb-3",
    className: "bg-white text-black w-full h-[50px]",
    placeholder: "Adgangskode",
    type: "password"
  });

  const { input: rememberCheckbox, isChecked: rememberValue } = useCheckboxInput({ label: "Husk mig", containerClassName: "mb-7 justify-end text-white w-full" });

  const loginObject = {
    username: userValue,
    password: passwordValue,
    rememberMe: rememberValue
  }

  const { handleLogin, loading, error } = useLogin()

  return (
    <div className="grid h-[100dvh] overflow-hidden">
      <img src={splashImage} alt="Image of guy dancing made with splash paint." className="grid-area-1 h-full object-cover" />
      <div className="bg-[#5E2E5350] grid-area-1 w-full h-full scale-125 rotate-45"></div>
      <div className="self-center grid-area-1 mx-5 z-10 flex flex-col">
        <h1 className="text-[48px] text-white mb-1 flex gap-3">Log ind
          {loading && <RotatingLines
            strokeColor="#E1A1E9"
            strokeWidth="5"
            animationDuration="0.75"
            width="34"
            visible={true}
          />}
        </h1>
        <form onSubmit={(e) => handleLogin(e, loginObject)} className="flex flex-col">
          {userInput}
          {passwordInput}
          {rememberCheckbox}
          <button disabled={loading} type="submit" className="bg-primary mx-auto max-w-[90%] text-white p-4 text-center rounded-2xl text-base inline-block w-full outline-none">Log ind</button>
        </form>
        <Link to="/register" className="ml-auto text-base text-blue-700 py-3">Opret bruger?</Link>
      </div>
    </div>
  );
}
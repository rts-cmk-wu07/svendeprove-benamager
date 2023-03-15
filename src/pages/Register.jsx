import splashImage from "../assets/images/splash-image.jpg"
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useInput from "../hooks/useInput";

export default function Register() {
  useDocumentTitle({ title: "Opret bruger" })

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

  const { input: nameInput, value: nameValue } = useInput({
    containerClassName: "w-full mb-3",
    className: "bg-white text-black w-full h-[50px]",
    placeholder: "Fornavn",
  });

  const { input: surnameInput, value: surnameValue } = useInput({
    containerClassName: "w-full mb-3",
    className: "bg-white text-black w-full h-[50px]",
    placeholder: "Efternavn",
  });

  const { input: ageInput, value: ageValue } = useInput({
    containerClassName: "w-full mb-7",
    className: "bg-white text-black w-full h-[50px]",
    placeholder: "Alder",
  });

  return (
    <div className="grid h-[100dvh] overflow-hidden">
      <img src={splashImage} alt="Image of guy dancing made with splash paint." className="grid-area-1 h-full object-cover" />
      <div className="bg-[#5E2E5350] grid-area-1 w-full h-full scale-[145%] rotate-45"></div>
      <div className="self-center grid-area-1 mx-5 z-10 flex flex-col">
        <h1 className="text-[48px] text-white mb-1">Opret bruger</h1>
        <form className="flex flex-col">
          <div className="flex gap-3">
            {nameInput}
            {surnameInput}
          </div>
          {userInput}
          {passwordInput}
          {ageInput}
          <button className="bg-primary mx-auto max-w-[90%] text-white p-4 text-center rounded-2xl text-base inline-block w-full outline-none">Opret bruger</button>
        </form>
        <Link to="/login" className="ml-auto text-base text-blue-700 py-3">Log ind?</Link>
      </div>
    </div>
  );
}
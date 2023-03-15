import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle({ title: "Ikke fundet" })

  return (
    <div className="flex flex-col h-[100dvh] items-center justify-center">
      <h1 className="text-lg text-center text-white mb-5">Siden du leder efter kunne ikke findes.</h1>
      <Link to="/activities" className="grid-area-1 bg-white text-black p-3 text-center w-[220px] rounded-xl text-base drop-shadow-xl">Gå tilbage</Link>
    </div>
  );
}
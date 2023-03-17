import useDocumentTitle from "../hooks/useDocumentTitle";
import { TokenContext } from "../contexts/TokenContext";
import { useContext } from "react";
import CalendarInstructor from "../components/CalendarInstructor";
import CalendarUser from "../components/CalendarUser";

export default function Calendar() {
  useDocumentTitle({ title: "Kalender" })
  const { token } = useContext(TokenContext)

  return (
    <div className="mx-5 mt-5 mb-[100px]">
      <h1 className="text-xl text-white mb-5">Kalender</h1>
      {!token && <p>Du er ikke logget ind...</p>}
      {token && token.role === "default" &&
        <CalendarUser token={token} />
      }
      {token && token.role === "instructor" &&
        <CalendarInstructor token={token} />
      }
    </div>
  );
}
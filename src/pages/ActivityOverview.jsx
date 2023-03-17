import useDocumentTitle from "../hooks/useDocumentTitle";
import { TokenContext } from "../contexts/TokenContext";
import { useContext } from "react";
import useAxios from "../hooks/useAxios";

export default function ActivityOverview() {
  useDocumentTitle({ title: "Hej" })
  const { token } = useContext(TokenContext)

  const instructorId = token.userId
  const { data, loading, error } = useAxios({ url: "http://localhost:4000/api/v1/activities/" })

  return (
    <div className="mx-5 mt-5 mb-[100px]">
      <h1 className="text-xl text-white mb-5">Kalender</h1>
    </div>
  );
}
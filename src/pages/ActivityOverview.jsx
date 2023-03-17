import useDocumentTitle from "../hooks/useDocumentTitle";
import { TokenContext } from "../contexts/TokenContext";
import { useContext } from "react";
import useAxios from "../hooks/useAxios";
import { useParams } from "react-router-dom";
import InfoCard from "../components/InfoCard";
import { FiCalendar } from "react-icons/fi";

export default function ActivityOverview() {
  const { activityId } = useParams()
  const { token } = useContext(TokenContext)

  const { data, loading, error } = useAxios({ url: `http://localhost:4000/api/v1/activities/${activityId}` })
  useDocumentTitle({ title: data ? data.name : null })

  const activityUsers = data?.users || [];

  return (
    <div className="mx-5 mt-5 mb-[100px]">
      <h1 className="text-xl text-white mb-5 text-ellipsis whitespace-nowrap overflow-hidden">{data?.name}</h1>
      <ul>
        {activityUsers.length === 0 &&
          <InfoCard
            icon={FiCalendar}
            className="mt-[125px]"
            title="Ingen elever i din klasse"
            description="Det var ærgeligt"
            linkText="Se kalender"
            linkTo="/calendar"
          />
        }
        {activityUsers.map(user => <li className="text-base text-white">{user.username}</li>)}
      </ul>
    </div>
  );
}
import useAxios from "../hooks/useAxios";
import CalendarActivity from "./CalendarActivity";
import { useNavigate } from "react-router-dom";
import InfoCard from "./InfoCard";
import { FiCalendar } from "react-icons/fi";

export default function CalendarInstructor({ token }) {
  const navigate = useNavigate()

  const instructorId = token.userId
  const { data, loading, error } = useAxios({ url: "http://localhost:4000/api/v1/activities" })

  const instructorClasses = data?.filter(activity => activity.instructorId === instructorId) || []

  return (
    <ul className="flex flex-col gap-7">
      {instructorClasses.length === 0 &&
        <InfoCard
          icon={FiCalendar}
          className="mt-[125px]"
          title="Du har ingen klasser"
          description="Spørg chefen om du stadig er ansat.."
        />
      }
      {instructorClasses.map(activity => {
        return <CalendarActivity key={activity.id} activityData={activity} clickHandler={() => navigate(`/activity-overview/${activity.id}`)} />
      })}
    </ul>
  );
}
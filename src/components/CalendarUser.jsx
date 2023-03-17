import useAxios from "../hooks/useAxios"
import CalendarActivity from "./CalendarActivity";
import { useNavigate } from "react-router-dom";

export default function CalendarUser({ token }) {
  const navigate = useNavigate()

  const { data, loading, error } = useAxios({
    url: `http://localhost:4000/api/v1/users/${token.userId}`,
    headers: {
      "Authorization": `Bearer ${token.token}`,
    },
  })

  const usersActivities = data?.activities || [];

  return (
    <ul className="flex flex-col gap-7">
      {usersActivities.map(activity => {
        return <CalendarActivity key={activity.id} activityData={activity} clickHandler={() => navigate(`/activity-details/${activity.id}`)} />
      })}
    </ul>
  );
}
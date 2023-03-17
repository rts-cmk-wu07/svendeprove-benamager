import { useNavigate } from "react-router-dom";

export default function CalendarActivity({ activityData, clickHandler }) {
  const navigate = useNavigate()

  return (
    <li onClick={clickHandler} className="bg-white w-full rounded-2xl">
      <article className="ml-6 leading-tight py-5 pr-2 cursor-pointer">
        <h1 className="text-xl text-ellipsis whitespace-nowrap overflow-hidden">{activityData.name}</h1>
        <p className="text-base pb-1">{activityData.weekday} {activityData.time}</p>
      </article>
    </li>
  );
}
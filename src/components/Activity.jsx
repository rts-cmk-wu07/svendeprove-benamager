import { useNavigate } from "react-router-dom";
import ShimmerLoading from "./ShimmerLoading";

export default function Activity({ activityData, type }) {
  const navigate = useNavigate()

  // navigate to details page and pass data along, this skips one fetch request
  function handlePress() {
    navigate(`/activity-details/${activityData.id}`, {
      state: { activityData }
    });
  }

  return (
    <>
      {type === "loading" ?
        <ShimmerLoading className="rounded-[39px_39px_0_39px] overflow-hidden w-full h-[350px] opacity-50" /> :
        <article onClick={handlePress} className="grid rounded-[39px_39px_0_39px] overflow-hidden w-full cursor-pointer h-[350px]">
          <img src={activityData.asset.url} alt="" className="grid-area-1 shadow-lg object-cover h-full w-full" />
          <div className="grid-area-1 self-end bg-secondary bg-opacity-80 py-4 pl-7 text-base">
            <h2>{activityData.name}</h2>
            <span>{activityData.minAge}-{activityData.maxAge} år</span>
          </div>
        </article>
      }
    </>
  );
}
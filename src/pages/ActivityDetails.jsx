import { useLocation, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";
import ShimmerLoading from "../components/ShimmerLoading";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useActivityParticipation from "../hooks/useActivityParticipation";
import { RotatingLines } from "react-loader-spinner"
import InfoCard from "../components/InfoCard";
import { BiErrorAlt } from "react-icons/bi"

export default function ActivityDetails() {
  const { state } = useLocation();
  const { activityId } = useParams();

  // Get activityData passed from the previous page, or set it to null
  const [activityData, setActivityData] = useState(state?.activityData || null);

  // Fetch data if locationActivityData is not present
  const { data, loading, error } = useAxios({
    url: !activityData ? `http://localhost:4000/api/v1/activities/${activityId}` : null,
  });

  // Update activityData if data is fetched
  useEffect(() => {
    if (data) setActivityData(data);
  }, [data]);

  // Change document title to activity name
  useDocumentTitle({ title: activityData?.name })

  const { showBtn, btnText, disabled, loading: loadingParticipation, clickHandler } = useActivityParticipation({ activityData: activityData })

  return (
    <>
      {loading && <ShimmerLoading className="h-[480px]" />}
      {error &&
        <InfoCard
          icon={BiErrorAlt}
          className="mt-[200px] mx-3"
          title="Ikke fundet"
          description="Aktiviteten du leder efter blev ikke fundet..."
          linkText="Gå tilbage"
          linkTo="/activities"
        />
      }
      {activityData && (
        <section>
          <div className="h-[480px] grid">
            <img className="w-full h-full object-cover grid-area-1" src={activityData.asset.url} alt={activityData.name} />
            {showBtn &&
              <button
                disabled={disabled}
                onClick={clickHandler}
                className="grid-area-1 flex justify-center gap-3 bg-primary self-end ml-auto mb-4 mr-5 text-white p-3 text-center w-[220px] rounded-xl text-base drop-shadow-xl">
                <span>{btnText}</span>
                {loadingParticipation && <RotatingLines
                  strokeColor="#EAEAEA"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="20"
                  visible={true}
                />}
              </button>}
          </div>
          <div className="mx-5 mt-4 text-white text-base">
            <h2 className="text-lg">{activityData.name}</h2>
            <p className="mb-3"><span className="capitalize">{activityData.weekday}</span> | {activityData.minAge}-{activityData.maxAge} år</p>
            <p>{activityData.description}</p>
          </div>
        </section>
      )}
    </>
  );
}

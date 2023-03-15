import { useLocation, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";
import ShimmerLoading from "../components/ShimmerLoading";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function ActivityDetails() {
  const { state } = useLocation();
  const { activityId } = useParams();

  // Get activityData passed from the previous page, or set it to null
  const [activityData, setActivityData] = useState(state?.activityData || null);

  // Fetch data if locationActivityData is not present
  const { data, loading } = useAxios({
    url: !activityData ? `http://localhost:4000/api/v1/activities/${activityId}` : null,
  });

  // Update activityData if data is fetched
  useEffect(() => {
    if (data) setActivityData(data);
  }, [data]);

  // Change document title to activity name
  useDocumentTitle({ title: activityData ? activityData.name : null })

  return (
    <>
      {loading && <ShimmerLoading className="h-[480px]" />}
      {activityData && (
        <section>
          <div className="h-[480px] grid">
            <img className="w-full h-full object-cover grid-area-1" src={activityData.asset.url} alt={activityData.name} />
            <button className="grid-area-1 bg-primary self-end ml-auto mb-4 mr-5 text-white p-3 text-center w-[220px] rounded-xl text-base drop-shadow-xl">Tilmeld</button>
          </div>
          <div className="mx-5 mt-4 text-white text-base">
            <h2 className="text-lg">{activityData.name}</h2>
            <p className="mb-3">{activityData.minAge}-{activityData.maxAge} år</p>
            <p>{activityData.description}</p>
          </div>
        </section>
      )}
    </>
  );
}

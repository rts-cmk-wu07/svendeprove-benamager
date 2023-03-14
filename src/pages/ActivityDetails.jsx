import { useLocation } from "react-router-dom";

export default function ActivityDetails() {
  const location = useLocation();
  const { activityData: locationActivityData } = location.state || null; // get passed data from previous page

  console.log(locationActivityData)

  return (
    <section>
      <img src="" alt="" />
    </section>
  );
}
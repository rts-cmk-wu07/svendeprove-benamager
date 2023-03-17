import useDocumentTitle from "../hooks/useDocumentTitle";
import useAxios from "../hooks/useAxios";
import Activity from "../components/Activity";

export default function Activities() {
  useDocumentTitle({ title: "Aktiviteter" })
  const { data, loading, error } = useAxios({ url: "http://localhost:4000/api/v1/activities" })

  return (
    <div className="mx-5 mt-5">
      <h1 className="text-xl text-white mb-5">Aktiviteter</h1>
      <section className="grid grid-cols-auto-200 gap-8 overflow-y-scroll h-[80dvh] hide-scrollbar pb-11">
        {data && !loading ?
          data.map(activity => {
            return <Activity key={activity.id} activityData={activity} />
          }) :
          Array.from({ length: 3 }, (_, index) => {
            return <Activity key={index} type="loading" />;
          })
        }
      </section>
    </div>
  );
}
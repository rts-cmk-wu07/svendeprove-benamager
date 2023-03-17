import useDocumentTitle from "../hooks/useDocumentTitle";
import useInput from "../hooks/useInput";
import Activity from "../components/Activity";
import useAxios from "../hooks/useAxios";
import { useState, useEffect } from "react";
import InfoCard from "../components/InfoCard";
import { FiSearch } from "react-icons/fi";

export default function Activities() {
  useDocumentTitle({ title: "Søg" });
  const { input, value } = useInput({
    containerClassName: "w-full mb-11",
    className: "bg-[#C4C4C430] w-full h-11 text-white",
    icon: true,
  });

  const { data, loading, error } = useAxios({
    url: "http://localhost:4000/api/v1/activities",
  });

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data) {
      const searchValue = value.toLowerCase();
      const filtered = data.filter((activity) =>
        activity.name.toLowerCase().includes(searchValue) ||
        activity.description.toLowerCase().includes(searchValue) ||
        activity.weekday.toLowerCase().includes(searchValue) ||
        activity.time.toLowerCase().includes(searchValue)
      );
      setFilteredData(filtered);
    }
  }, [data, value]);

  return (
    <section className="mx-5 mt-5 mb-[100px]">
      <h1 className="text-xl text-white mb-2">Søg</h1>
      {input}
      <div className="grid grid-cols-auto-200 gap-8 mb-5">
        {value.length === 0 &&
          <InfoCard
            icon={FiSearch}
            className="mt-11"
            title="Find aktiviteter lige for dig"
            description="Begynd at søge i søgefeltet"
          />
        }
        {value && filteredData.length === 0 && (
          <p className="text-white">Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget andet.</p>
        )}
        {value &&
          filteredData.map((activity) => (
            <Activity key={activity.id} activityData={activity} />
          ))}
      </div>
    </section>
  );
}

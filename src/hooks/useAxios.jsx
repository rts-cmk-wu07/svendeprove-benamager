import axios from "axios"
import { useEffect, useState } from "react";

export default function useAxios({ url, method = "GET", headers = {} }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getData() {
      if (!url) return // throw new Error("Missing url prop...")

      try {

        setLoading(true);
        const response = await axios({ url, method, headers });
        setData(response.data);

      } catch (error) {
        setError("Noget gik galt");
        console.error(error)

      } finally {
        setLoading(false);
      }

    };
    getData();

    /* eslint disable-next-line */
  }, [url]);

  return { data, loading, error };
}
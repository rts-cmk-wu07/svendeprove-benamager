import useAxios from "./useAxios";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { TokenContext } from "../contexts/TokenContext";
import getCurrentWeekday from "../utils/getCurrentWeekday";

const API_URL = import.meta.env.VITE_API_URL;

export default function useActivityParticipation({ activityData }) {
  const { token } = useContext(TokenContext);

  const { data: userData } = useAxios({
    url: token ? `${API_URL}/api/v1/users/${token.userId}` : null,
    headers: {
      "Authorization": `Bearer ${token?.token}`,
    },
  })

  const [canJoin, setCanJoin] = useState(false);
  const [btnText, setBtnText] = useState("Tilmeld");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const [disabled, setDisabled] = useState(false); // Added disabled state

  useEffect(() => {
    if (!token || !userData || !activityData) return;

    const usersActivities = userData?.activities || [];

    const userIsJoinedActivity = usersActivities.some(
      (userObj) => userObj.id === activityData.id
    );

    if (userIsJoinedActivity) {
      setCanJoin(false);
      setBtnText("Forlad");
    } else {
      const usersAge = userData.age;
      const activityMinAge = activityData.minAge;
      const activityMaxAge = activityData.maxAge;

      if (usersAge >= activityMinAge && usersAge <= activityMaxAge) {
        if (getCurrentWeekday() !== activityData.weekday) {
          setCanJoin(true);
        } else {
          setBtnText("For sent");
          setError("Du kan ikke tilmelde dig på samme ugedag.");
        }
      } else {
        setBtnText("Udenfor aldersgrænsen..");
        setError("Du er udenfor aldersgrænsen.");
      }
    }
  }, [userData, token, activityData]);

  async function clickHandler() {
    if (error) {
      return;
    }

    setLoading(true);
    setDisabled(true);

    try {
      const URL = `${API_URL}/api/v1/users/${userData.id}/activities/${activityData.id}`;
      const headers = {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      };

      if (canJoin === true) {
        await axios.post(URL, {}, headers);
        setCanJoin(false);
        setBtnText("Forlad");
      } else {
        await axios.delete(URL, headers);
        setCanJoin(true);
        setBtnText("Tilmeld");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  }

  return {
    showBtn: token?.role === "default" ? true : false,
    btnText: btnText,
    clickHandler: clickHandler,
    loading: loading, // Return loading state
    disabled: disabled, // Return disabled state
  };
}

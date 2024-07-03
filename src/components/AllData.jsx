import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserActivities } from "./UserActivitiesContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AllData = () => {
  const { activities, setActivities } = useUserActivities();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/user/${userId}/activities`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setActivities(response.data.transactions);
      } catch (error) {
        setError("Error fetching activities");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [token, userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      className="card mx-auto"
      style={{ maxWidth: "600px", marginTop: "20px" }}
    >
      <div className="card-body">
        <h5 className="card-title">All User Activities</h5>
        <div className="card-text">
          {activities && activities.length > 0 ? (
            <ul className="list-group">
              {activities.map((activity, index) => (
                <li key={index} className="list-group-item">
                  {activity.type}: {activity.message}
                </li>
              ))}
            </ul>
          ) : (
            <p>No activities recorded.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllData;

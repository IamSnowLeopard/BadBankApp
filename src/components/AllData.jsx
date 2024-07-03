import React, { useEffect, useState } from "react";
import { useUserActivities } from "./UserActivitiesContext";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AllData = () => {
  const [activities, setActivities] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/transactions`, {
          headers: {
            "x-auth-token": token,
          },
        });
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities", error);
      }
    };

    fetchActivities();
  }, [token]);

  return (
    <div
      className="card mx-auto"
      style={{ maxWidth: "600px", marginTop: "20px" }}
    >
      <div className="card-body">
        <h5 className="card-title">All User Activities</h5>
        <div className="card-text">
          {activities.length > 0 ? (
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

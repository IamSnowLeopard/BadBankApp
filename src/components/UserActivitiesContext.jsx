import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserActivitiesContext = createContext();

export const useUserActivities = () => useContext(UserActivitiesContext);

export const UserActivitiesProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [balance, setBalance] = useState(0);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBalance(response.data.balance);
        setActivities(response.data.transactions);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (userId && token) {
      fetchData();
    }
  }, [userId, token, API_BASE_URL]);

  const addActivity = async (activity) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/transactions/${activity.type.toLowerCase()}`,
        {
          userId,
          amount: parseFloat(activity.amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newActivity = response.data.transaction;
      setActivities((currentActivities) => [...currentActivities, newActivity]);
      setBalance(newActivity.balanceAfterTransaction);
    } catch (error) {
      console.error(`Error processing ${activity.type}:`, error);
    }
  };

  return (
    <UserActivitiesContext.Provider
      value={{ activities: activities || [], addActivity, balance }}
    >
      {children}
    </UserActivitiesContext.Provider>
  );
};

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserActivitiesContext = createContext();

export const useUserActivities = () => useContext(UserActivitiesContext);

export const UserActivitiesProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [balance, setBalance] = useState(0);

  // Retrieve token and userId from localStorage
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBalance(response.data.balance);
        setActivities(response.data.transactions);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (userId && token) {
      fetchData();
    }
  }, [userId, token]);

  const addActivity = async (activity) => {
    try {
      const response = await axios.post(
        `http://localhost:5001/transactions/${activity.type.toLowerCase()}`,
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
      value={{ activities, addActivity, balance }}
    >
      {children}
    </UserActivitiesContext.Provider>
  );
};

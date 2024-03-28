import React, { createContext, useContext, useState } from "react";

const UserActivitiesContext = createContext();

export const useUserActivities = () => useContext(UserActivitiesContext);

export const UserActivitiesProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [balance, setBalance] = useState(100); // Start with an initial balance

  const addActivity = (activity) => {
    setActivities((currentActivities) => [...currentActivities, activity]);
    if (activity.type === "Deposit") {
      setBalance(
        (currentBalance) => currentBalance + parseFloat(activity.amount)
      );
    } else if (activity.type === "Withdrawal") {
      setBalance(
        (currentBalance) => currentBalance - parseFloat(activity.amount)
      );
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

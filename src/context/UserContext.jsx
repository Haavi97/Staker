import React, { createContext, useContext, useState } from "react";

// Create a context to hold user data
const UserContext = createContext({
  userData: {}, // Initial empty object, or a more detailed structure as needed
  setUserData: () => {},
});

// Custom hook to access user data
export const useUserData = () => useContext(UserContext);

// Create a context provider
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

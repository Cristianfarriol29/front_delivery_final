import React, { useContext, useState, useEffect } from "react";

export const UserContext = React.createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export default function UserProvider({ children }) {
  const [userRole, setUserRole] = useState("basic");

  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    user !== null ? setUserRole(user.role) : setUserRole("basic");
  }, [user]);

  const store = {
    userRole,
    user,
  };

  return <UserContext.Provider value={store}>{children}</UserContext.Provider>;
}

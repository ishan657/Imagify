import { createContext, useState } from "react";

export const AppContext = createContext(null);

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const value = {
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

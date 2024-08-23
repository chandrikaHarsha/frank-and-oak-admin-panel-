import React, { createContext, useState } from "react";

export const NavToggle = createContext();
function Context({ children }) {
  let [navVisible, setNavVisibility] = useState(false);
  let globalData = { navVisible, setNavVisibility };
  return <NavToggle.Provider value={globalData}>{children}</NavToggle.Provider>;
}

export default Context;

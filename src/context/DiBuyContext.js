import React from "react";

const DiBuyContext = React.createContext({
    currentRoute: "",
    setCurrentRoute: () => { },
    cartCount: 0,
    setCartCount: () => { }
})
export default DiBuyContext
import React, { useState, createContext, useEffect } from "react";
import { getAllPurchases } from "../ApiManager";

export const NavBarContext = createContext()

export const NavBarProvider = (props) => {
    const [createMessage, setCreateMessage] = useState(false)
    const [msgReadSwitch, setMsgReadSwitch] = useState(false)
    const [filteredByYear, setFilteredByYear] = useState(0)
    const [filteredByUser, setFilteredByUser] = useState(0)
    const [filteredByFavorite, setFilteredByFavorite] = useState(false)
    const [renderSwitch, setRenderSwitch] = useState(false)

    // const localGiffyUser = localStorage.getItem("giffy_user")
    // const giffyUserObj = JSON.parse(localGiffyUser)

    

    return (
        <NavBarContext.Provider value={{
            createMessage, setCreateMessage, msgReadSwitch, setMsgReadSwitch, filteredByYear, setFilteredByYear, filteredByUser, setFilteredByUser, filteredByFavorite, setFilteredByFavorite, renderSwitch, setRenderSwitch
        }}>
            {props.children}
        </NavBarContext.Provider>
    )
}
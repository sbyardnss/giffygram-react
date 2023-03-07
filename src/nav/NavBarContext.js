import React, { useState, createContext, useEffect } from "react";
import { getAllPurchases } from "../ApiManager";

export const NavBarContext = createContext()

export const NavBarProvider = (props) => {
    const [createMessage, setCreateMessage] = useState(false)
    const [msgReadSwitch, setMsgReadSwitch] = useState(false)
    // const localGiffyUser = localStorage.getItem("giffy_user")
    // const giffyUserObj = JSON.parse(localGiffyUser)

    

    return (
        <NavBarContext.Provider value={{
            createMessage, setCreateMessage, msgReadSwitch, setMsgReadSwitch
        }}>
            {props.children}
        </NavBarContext.Provider>
    )
}
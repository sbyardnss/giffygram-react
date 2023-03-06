import { Link, Navigate, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import "../styles/navigation.css"
import { ReactSVG } from "react"
import { penIcon } from "../images/penSVG"
// import "./Navbar.css"
// import { ShoppingCartContext } from "./NavbarContext"

export const NavBar = () => {
    // const { purchasesFromSpecificUser } = useContext(ShoppingCartContext)

    const localGiffyUser = localStorage.getItem("giffy_user")
    const giffyUserObj = JSON.parse(localGiffyUser)



    return (
        <header className="navigation">

            <Link className="navigation__icon" to="/"><img src={require('../images/pb.png')} /></Link>
            <h1 id="navName" className="navigation__name">Giffygram</h1>
            <div className="navigation__message">
                <img id="directMessageIcon" src={() => penIcon()} />
                <button id="messageCount" className="notification__count">5</button>
            </div>
            <div className="navigation__logout">
                <Link className="navigation__icon" to="" onClick={() => {
                    localStorage.removeItem("giffy_user")
                    Navigate("/", { replace: true })
                }}>Logout</Link>
            </div>
        </header>
    )
}
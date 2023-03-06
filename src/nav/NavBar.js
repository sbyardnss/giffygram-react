import { Link, Navigate, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import "../styles/navigation.css"
import { ReactSVG } from "react"
import { ReactComponent as PenIcon } from "../images/fountain-pen.svg"
import { NavBarContext } from "./NavBarContext"


// import "./Navbar.css"
// import { ShoppingCartContext } from "./NavbarContext"

export const NavBar = () => {

    const localGiffyUser = localStorage.getItem("giffy_user")
    const giffyUserObj = JSON.parse(localGiffyUser)
    const { setCreateMessage } = useContext(NavBarContext)


    return (
        <header className="navigation">

            <Link className="navigation__icon" to="/"><img src={require('../images/pb.png')} /></Link>
            <h1 id="navName" className="navigation__name">Giffygram</h1>
            <div className="navigation__message">
                <PenIcon onClick={() => setCreateMessage(true)} ></PenIcon>
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
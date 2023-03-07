import { useContext, useEffect, useState } from "react"
import { getAllPosts, getAllUsers } from "../ApiManager"
import "../styles/footer.css"
import { NavBarContext } from "./NavBarContext"


export const Footer = () => {

    const [yearFilters, setYearFilters] = useState([])
    const [userFilters, setUserFilters] = useState([])
    const { setFilteredByYear, setFilteredByUser, setFilteredByFavorite, filteredByFavorite, renderSwitch, setRenderSwitch } = useContext(NavBarContext)


    useEffect(
        () => {
            getAllPosts()
                .then((postArray) => {
                    let yearArr = []
                    postArray.map((post) => {
                        const [, , year] = post.date.split("/")
                        yearArr.push(year)
                    })
                    const uniqueYears = [...new Set(yearArr)]
                    setYearFilters(uniqueYears)
                })


        },
        []
    )

    useEffect(
        () => {
            getAllUsers()
                .then((userArray) => {
                    setUserFilters(userArray)
                })

        },
        []
    )




    return <>
        <footer>

            <div className="footer">
                <div className="footer__item">
                    Posts since
                    <select className="yearSelection" id="yearSelection" onChange={(evt) => setFilteredByYear(evt.target.value).then(setRenderSwitch(!renderSwitch))}>
                        <option key="0" value="0">Select A Year</option>
                        {
                            yearFilters.map(year => {
                                return <>
                                    <option key={year} className="yearSelection" value={year}>{year}</option>
                                </>
                            })
                        }
                    </select>
                </div>
                <div className="footer__item">
                    Posts by user
                    <select key="selectUser" className="userSelection" id="userSelection" onChange={(evt) => {
                        setFilteredByUser(evt.target.value)
                        setRenderSwitch(!renderSwitch)
                    }}>
                        <option key="0" value="0">Select A User</option>
                        {
                            userFilters.map(user => {
                                return <>
                                    <option key={user.id} className="userSelection" value={user.id}>{user.firstName} {user.lastName}</option>
                                </>
                            })
                        }
                    </select>
                </div>
                <div className="footer__item">
                    Show only favorites
                    <input type="checkbox" onClick={() => setFilteredByFavorite(!filteredByFavorite)} value={localStorage.getItem("giffy_user")}>
                    </input>
                </div>
                {/* <div className="footer__item">
                <button id="clearFilters">Clear Filters</button>
            </div>
            <div className="footer__item">
                <button id="checkTransientState">Check</button>
            </div> */}
            </div>
        </footer>
    </>




}
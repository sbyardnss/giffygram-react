import { useContext, useEffect, useState } from "react"
import { getAllPosts, getAllUsers } from "../ApiManager"
import "../styles/footer.css"


export const Footer = () => {

    const [yearFilters, setYearFilters] = useState([])
    const [userFilters, setUserFilters] = useState([])


    useEffect(
        () => {
            getAllPosts()
                .then((postArray) => {
                    let yearArr = []
                    postArray.map((post) => {
                        const [,,year] = post.date.split("/")
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
        <div className="footer">
            <div className="footer__item">
                Posts since
                <select className="yearSelection" id="yearSelection">
                    <option value="0">Select A Year</option>
                    {
                        yearFilters.map(year => {
                            return <>
                                <option className="yearSelection" value={year}>{year}</option>
                            </>
                        })
                    }
                </select>
            </div>
            <div className="footer__item">
                Posts by user
                <select className="userSelection" id="userSelection">
                    <option value="0">Select A User</option>
                    {
                        userFilters.map(user => {
                            return <>
                                <option className="userSelection" value={user.id}>{user.firstName} {user.lastName}</option>
                            </>
                        })
                    }
                </select>
            </div>
            <div className="footer__item">
                Show only favorites
                <input type="checkbox" value={localStorage.getItem("giffy_user")}>
                </input>
            </div>
            <div className="footer__item">
                <button id="clearFilters">Clear Filters</button>
            </div>
            <div className="footer__item">
                <button id="checkTransientState">Check</button>
            </div>
            </div>
        </>




}
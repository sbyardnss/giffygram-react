import { useContext, useEffect, useState } from "react"
import { getAllUsers, sendNewMessage } from "../ApiManager"
import { NavBarContext } from "../nav/NavBarContext"
import "./newMessage.css"

export const NewMessage = () => {
    const [users, updateUsers] = useState([])
    const localGiffyUser = localStorage.getItem("giffy_user")
    const giffyUserObj = JSON.parse(localGiffyUser)
    const { createMessage, setCreateMessage } = useContext(NavBarContext)

    useEffect(
        () => {
            getAllUsers()
                .then((usersArr) => {
                    updateUsers(usersArr)
                })
        },
        []
    )


    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    const newDate = year + "/" + month + "/" + day

    const [newMessage, updateNewMessage] = useState({
        postRecipient: 0,
        message: ""

    })

    const newMessageToSendToAPI = {
        postUser: giffyUserObj.id,
        postRecipient: newMessage.postRecipient,
        message: newMessage.message,
        date: newDate,
        read: false
    }




    if (createMessage === true) {

        return <>
            <div className="directMessage">
                <h2>Direct Message</h2>
                <form>
                    <fieldset className="newPost__input">
                        <div>
                            <label>Recipient:</label>
                            <select onChange={
                                (evt) => {
                                    const copy = { ...newMessage }
                                    copy.postRecipient = parseInt(evt.target.value)
                                    updateNewMessage(copy)
                                }
                            } >

                                <option value="0">Choose A Recipient...</option>
                                {
                                    users.map(user => {
                                        if (user.id !== parseInt(localStorage.getItem("giffy_user"))) {
                                            return <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                                        }
                                    })
                                }

                            </select>
                        </div>


                        <div className="newPost__input">
                            <textarea id="messageSection" className="message__section" placeholder="Message to user" onChange={
                                (evt) => {
                                    const copy = { ...newMessage }
                                    copy.message = evt.target.value
                                    updateNewMessage(copy)
                                }
                            }></textarea>
                        </div>
                        <div>
                            <button onClick={() => sendNewMessage(newMessageToSendToAPI)} id="saveMessage">Save</button>
                            <button onClick={() => setCreateMessage(false)} id="cancelMessage">Cancel</button>
                        </div>
                    </fieldset>
                </form>
            </div>

        </>
    }

}
import { useContext, useEffect, useState } from "react"
import { getAllMessages, getAllMessagesForCurrentUser, getAllUsers } from "../ApiManager"
import { NavBarContext } from "../nav/NavBarContext"


export const MessageList = () => {
    const [messages, setMessages] = useState([])
    const [sortedMsgs, setSortedMsgs] = useState([])
    const [users, setUsers] = useState([])
    const { msgReadSwitch, setMsgReadSwitch } = useContext(NavBarContext)

    const localGiffyUser = localStorage.getItem("giffy_user")
    const giffyUserObj = JSON.parse(localGiffyUser)

    useEffect(
        () => {
            getAllMessagesForCurrentUser()
                .then((msgArray) => {
                    if (msgArray.length > 1) {
                        const sortedUserMessages = msgArray.sort((a, b) => b.id - a.id)
                        setSortedMsgs(sortedUserMessages)

                    }
                    else {
                        setSortedMsgs(msgArray)
                    }
                    // msgArray.filter(message => message.postRecipient === giffyUserObj.id)
                }
                )
        },
        [msgReadSwitch]
    )
    const setAsRead = (oldMsgId, newMsgObj) => {
        fetch(`http://localhost:8088/messages/${oldMsgId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMsgObj)

        })
            .then(response => response.json())

    }
    useEffect(
        () => {
            getAllUsers()
                .then(userArray => {
                    setUsers(userArray)
                })
        },
        []
    )

    // const matchSender = (msgObj) => {
    //     const matchedUser = users.find(user => user.id === msgObj.userId)
    //     return matchedUser.firstName
    // }

        return <>

            <div className="giffygram__feed" id="directMessage">
                <article>
                    <ul id="messageInboxList">


                        {

                            sortedMsgs.map(userMsg => {
                                if (userMsg.read === false) {
                                    return <li key={userMsg.id} id={userMsg.id} className="unreadMsg">
                                        <div className="message__author">From {userMsg.user.firstName} {userMsg.user.lastName} </div>
                                        <div>{userMsg.message}</div>
                                        <div>{userMsg.date}</div>
                                        <button className="markAsReadButton" onClick={() => {
                                            const msgCopy = { ...userMsg }
                                            msgCopy.read = true
                                            delete msgCopy.user
                                            setAsRead(userMsg.id, msgCopy)
                                            setMsgReadSwitch(!msgReadSwitch)

                                        }} id="markRead--${userMsg.id}">Mark Read</button>
                                    </li>
                                } else {
                                    return <li key={userMsg.id} id={userMsg.id} className="readMsg">
                                        <div className="message__author">From {userMsg.user.firstName} {userMsg.user.lastName} </div>
                                        <div>{userMsg.message}</div>
                                        <div>{userMsg.date}</div>
                                    </li>
                                }
                            })
                        }
                    </ul>
                </article>

            </div>
        </>
    
    
}
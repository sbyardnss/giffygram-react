const localGiffyUser = localStorage.getItem("giffy_user")
const giffyUserObj = JSON.parse(localGiffyUser)

export const getAllPosts = () => {
    return fetch(`http://localhost:8088/posts?_expand=user`)
        .then(res => res.json())
}



export const sendNewPost = (newPostForAPI) => {
    return fetch(`http://localhost:8088/posts?_expand=user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPostForAPI)
    })
        .then(getAllPosts())

}


export const getAllMessages = () => {
    return fetch(`http://localhost:8088/messages?_expand=user`)
        .then(res => res.json())


}

export const getAllMessagesForCurrentUser = () => {
    return fetch(`http://localhost:8088/messages/?_expand=user&postRecipient=${giffyUserObj.id}`)
        .then(res => res.json())


}

export const sendNewMessage = (newMsgForAPI) => {
    return fetch(`http://localhost:8088/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMsgForAPI)
    })
        .then(res => res.json())

}

export const getAllUsers = () => {
    return fetch(`http://localhost:8088/users`)
        .then(res => res.json())


}

export const getAllUserFavorites = () => {
    return fetch(`http://localhost:8088/userFavorites`)
        .then(res => res.json())


}

export const sendUserFavorite = (userFav) => {
    return fetch(`http://localhost:8088/userFavorites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userFav)
    })
    .then(res => res.json())

}
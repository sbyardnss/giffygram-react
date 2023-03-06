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

export const sendNewMessage = (newMsgForAPI) => {
    return fetch(`http://localhost:8088/messages?_expand=user`, {
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
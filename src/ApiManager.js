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
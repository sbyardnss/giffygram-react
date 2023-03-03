export const getAllPosts = () => {
    return fetch(`http://localhost:8088/posts?_expand=user`)
        .then(res => res.json())
}
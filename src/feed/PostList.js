import { getAllPosts } from "../ApiManager"
import { useEffect, useState } from "react"
import "../styles/feed.css"



export const PostList = () => {
    const [posts, setPosts] = useState([])

    useEffect(
        () => {
            getAllPosts()
                .then((postsArr) => {
                    setPosts(postsArr)
                })
        },
        []
    )





    return <>
    <div className="giffygram__feed">
        <article>

        {
            posts.map(post => {
                return (
                <section className="post">
                    <h4>{post.title}</h4>
                    <img className="post__image" src={post.url}/>
                    <div className="post__tagline">{post.story}</div>
                    <div className="post__remark">this was posted by {post?.user?.firstName} on {post.date}</div>
                    <section className="post__actions">
                    </section>
                </section>
            )
              
        })
    }
        </article>
        

    </div>
        
    </>

    
}



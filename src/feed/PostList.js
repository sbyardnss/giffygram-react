import { getAllPosts } from "../ApiManager"
import { useEffect, useState } from "react"
import "./postList.css"
import { NewPost } from "../newPost/newPost"
import { NewMessage } from "../newMessage/newMessage"


export const PostList = () => {
    const [sortedPosts, setSortedPosts] = useState([])
    
    useEffect(
        () => {
            getAllPosts()
                .then((postsArr) => {
                    postsArr.sort((a, b) => b.id - a.id)
                    setSortedPosts(postsArr)
                })
        },
        []
    )



    // posts.sort((a, b) => b.id - a.id)

    return <>
        <div className="giffygram__feed">
            <article id="postFeed">
                <NewPost />
                <NewMessage />

                {
                    sortedPosts.map(post => {
                        return (
                            <section className="post" key={post.id}>
                                <h4>{post.title}</h4>
                                <img className="post__image" src={post.url} />
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



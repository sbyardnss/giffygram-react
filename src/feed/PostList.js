import { getAllPosts, getAllUserFavorites, sendUserFavorite } from "../ApiManager"
import { useEffect, useState } from "react"
import "./postList.css"
import { NewPost } from "../newPost/newPost"
import { NewMessage } from "../newMessage/newMessage"
import "../styles/feed.css"
import { Footer } from "../nav/Footer"
import { ReactComponent as YellowStar } from "../images/favorite-star-yellow.svg"
import { ReactComponent as BlankStar } from "../images/favorite-star-blank.svg"
import { ReactComponent as TrashIcon } from "../images/block.svg"



export const PostList = () => {

    const [sortedPosts, setSortedPosts] = useState([])
    const [posts, setPosts] = useState([])
    const localGiffyUser = localStorage.getItem("giffy_user")
    const giffyUserObj = JSON.parse(localGiffyUser)

    useEffect(
        () => {
            getAllPosts()
                .then((postsArr) => {
                    postsArr.sort((a, b) => b.id - a.id)
                    setSortedPosts(postsArr)

                    setPosts(postsArr)
                })
        },
        []
    )


    const isFavorited = (post) => {
        const userFavorites = getAllUserFavorites()
        const matchedFavorite = userFavorites.find(userFav => (userFav.postId === post.id) && (userFav.userId === parseInt(localStorage.getItem("giffy_user"))))
        if (matchedFavorite) {
            return <>
                <YellowStar onClick={() => {
                    fetch(`http://localhost:8088/userFavorites/${matchedFavorite.id}`, {
                        method: "DELETE"
                    })
                }} ></YellowStar>
            </>
        } else {
            return <>
                <BlankStar onClick={() => {
                    const newUserFav = {
                        userId: giffyUserObj.id,
                        postId: post.id
                    }
                    sendUserFavorite(newUserFav)
                } } ></BlankStar>
            </>
        }
    }




    const deleteOption = (post) => {
        const matchedUser = parseInt(localStorage.getItem("giffy_user"))
        if (post.userId === matchedUser) {
            return <>
                <TrashIcon onClick={() =>
                    fetch(`http://localhost:8088/posts/${post.id}`, {
                        method: "DELETE"
                    })
                } ></TrashIcon>
            </>
        }
    }

    return <>
        <div className="giffygram__feed">
            <article id="postFeed">
                <NewMessage />
                <NewPost />

                {
                    sortedPosts.map(post => {
                        return (
                            <section className="post" key={post.id}>
                                <h4>{post.title}</h4>
                                <img className="post__image" src={post.url} />
                                <div className="post__tagline">{post.story}</div>
                                <div className="post__remark">this was posted by {post?.user?.firstName} on {post.date}</div>
                                <section class="post__actions">
                                    ${isFavorited(post)}
                                    ${deleteOption(post)}
                                </section>
                            </section>
                        )

                    })
                }
            </article>
            <footer>
                <Footer />
            </footer>

        </div>

    </>





}



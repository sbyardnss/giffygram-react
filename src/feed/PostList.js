import { getAllPosts, getAllUserFavorites, sendUserFavorite } from "../ApiManager"
import { useContext, useEffect, useState } from "react"
import "./postList.css"
import { NewPost } from "../newPost/newPost"
import { NewMessage } from "../newMessage/newMessage"
import "../styles/feed.css"
import { Footer } from "../nav/Footer"
import { ReactComponent as YellowStar } from "../images/favorite-star-yellow.svg"
import { ReactComponent as BlankStar } from "../images/favorite-star-blank.svg"
import { ReactComponent as TrashIcon } from "../images/block.svg"
import { NavBarContext } from "../nav/NavBarContext"



export const PostList = () => {

    const [sortedPosts, setSortedPosts] = useState([])
    // const [posts, setPosts] = useState([])
    const [userFavorites, setUserFavorites] = useState([])
    const [renderSwitch, setRenderSwitch] = useState(false)
    const { filteredByYear, filteredByUser, filteredByFavorite } = useContext(NavBarContext)
    const [stateOfFilter, setStateOfFilter] = useState({})
    const [filterUpdated, setFilterUpdated] = useState(false)
    const [printedPosts, setPrintedPosts] = useState([])


    const localGiffyUser = localStorage.getItem("giffy_user")
    const giffyUserObj = JSON.parse(localGiffyUser)


    useEffect(
        () => {
            stateOfFilter.selectedYear = parseInt(filteredByYear)
            setFilterUpdated(!filterUpdated)
        },
        [filteredByYear]
    )
    useEffect(
        () => {
            stateOfFilter.selectedUser = parseInt(filteredByUser)
            setFilterUpdated(!filterUpdated)

        },
        [filteredByUser]
    )
    useEffect(
        () => {
            stateOfFilter.favoritesOnly = filteredByFavorite
            setFilterUpdated(!filterUpdated)

        },
        [filteredByFavorite]
    )
    useEffect(
        () => {
            getAllPosts()
                .then((postsArr) => {
                    postsArr.sort((a, b) => b.id - a.id)
                    setSortedPosts(postsArr)
                    setPrintedPosts(postsArr)
                    // setPosts(postsArr)
                })
        },
        []
    )

    useEffect(
        () => {
            getAllUserFavorites()
                .then((userFavoriteArray) => {

                    setUserFavorites(userFavoriteArray)
                })
        },
        [renderSwitch]
    )


    const filteredYear = stateOfFilter.selectedYear


    useEffect(
        () => {
            if (sortedPosts) {
                // setPrintedPosts(sortedPosts)
                let filteredPosts = sortedPosts

                if (stateOfFilter.selectedYear !== 0) {
                    filteredPosts = filteredPosts.filter(post => {
                        let [, , postYear] = post.date.split("/")
                        if (parseInt(postYear) === filteredYear) {
                            return true
                        }
                    })
                }
                if (stateOfFilter.selectedUser) {
                    filteredPosts = filteredPosts.filter(post => post.userId === stateOfFilter.selectedUser)
                }
                if (filteredByFavorite === true) {
                    let filteredFavPosts = []
                    {
                        userFavorites.map(userFav => {
                            if (giffyUserObj.id === userFav.userId) {
                                filteredFavPosts.push(userFav)
                            }
                        })
                    }


                    let favArr = []
                    filteredFavPosts.map(filteredFav => {  
                        let favPost = filteredPosts.find(post => post.id === filteredFav.postId)
                        favArr.push(favPost)

                        // filteredPosts = filteredPosts.filter(post => {
                        //     if (post.id === filteredFav.postId) {
                        //         return true
                        //     }
                        //     return false
                        // })

                    })
                    filteredPosts = favArr

                }
                setPrintedPosts(filteredPosts)


            }
        },
        [filterUpdated, sortedPosts]
    )

    const isFavorited = (post) => {
        // const userFavorites = getAllUserFavorites()
        // const matchedFavorite = userFavorites.find(userFav => (userFav.postId === post.id && userFav.userId === parseInt(localStorage.getItem("giffy_user"))))
        const activeUserFavorites = userFavorites.filter(userFav => userFav.userId === giffyUserObj.id)
        const matchedFavorite = activeUserFavorites.find(userFav => userFav.postId === post.id)
        if (matchedFavorite) {
            return <>
                <YellowStar className="post__reactions" key={post.id} onClick={() => {
                    fetch(`http://localhost:8088/userFavorites/${matchedFavorite.id}`, {
                        method: "DELETE"
                    })
                    setRenderSwitch(!renderSwitch)
                }} ></YellowStar>
            </>
        } else {
            return <>
                <BlankStar key={post.id} onClick={() => {
                    const newUserFav = {
                        userId: giffyUserObj.id,
                        postId: post.id
                    }
                    sendUserFavorite(newUserFav)
                    setRenderSwitch(!renderSwitch)
                }} ></BlankStar>
            </>
        }
    }




    const deleteOption = (post) => {
        const matchedUser = giffyUserObj
        if (post.userId === matchedUser.id) {
            return <>
                <TrashIcon onClick={() =>
                    fetch(`http://localhost:8088/posts/${post.id}`, {
                        method: "DELETE"
                    })
                        .then(setRenderSwitch(!renderSwitch))
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
                    printedPosts.map(post => {
                        return (
                            <section className="post" key={post.id}>
                                <h4>{post.title}</h4>
                                <img className="post__image" src={post.url} />
                                <div className="post__tagline">{post.story}</div>
                                <div className="post__remark">this was posted by {post?.user?.firstName} on {post.date}</div>
                                <section className="post__actions">
                                    {isFavorited(post)}
                                    {deleteOption(post)}
                                </section>
                            </section>
                        )

                    })
                }
            </article>
            <Footer />

        </div>

    </>





}



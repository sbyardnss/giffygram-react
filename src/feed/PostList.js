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
    const [posts, setPosts] = useState([])
    const [userFavorites, setUserFavorites] = useState([])
    // const [renderSwitch, setRenderSwitch] = useState(false)
    const { filteredByYear, filteredByUser, filteredByFavorite, renderSwitch, setRenderSwitch } = useContext(NavBarContext)
    const [stateOfFilter, setStateOfFilter] = useState({})

    const localGiffyUser = localStorage.getItem("giffy_user")
    const giffyUserObj = JSON.parse(localGiffyUser)

    
    useEffect(
        () => {
            stateOfFilter.selectedYear = parseInt(filteredByYear)

        },
        [filteredByYear]
    )
    useEffect(
        () => {
            stateOfFilter.selectedUser = parseInt(filteredByUser)
        },
        [filteredByUser]
    )
    useEffect(
        () => {
            stateOfFilter.favoritesOnly = true
        },
        [filteredByFavorite]
    )

    useEffect(
        () => {
            getAllPosts()
                .then((postsArr) => {
                    postsArr.sort((a, b) => b.id - a.id)
                    setSortedPosts(postsArr)

                    setPosts(postsArr)
                })
        },
        [renderSwitch]
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

    // useEffect(
    //     () => {
    //         if(filteredByYear === "0") {
    //             setSortedPosts(posts)
    //         } 
    //         else {
    //             const postsFilteredByYear = posts.filter(post => {
    //                 const [,,postYear] = post.date.split("/")
    //                 return filteredByYear === postYear
    //             })
    //             setSortedPosts(postsFilteredByYear)
                
    //         }
    //     },
    //     [filteredByYear]
    // )

    // useEffect(
    //     () => {
    //         const activeUserFavorites = userFavorites.filter(userFav => userFav.userId === giffyUserObj.id)
    //         let newFavoriteArr = []
    //         if (filteredByFavorite) {
    //             activeUserFavorites.map(userFav => {
    //                 const matchedFavorite = sortedPosts.find(post => post.id === userFav.postId)
    //                 newFavoriteArr.push(matchedFavorite)
    //             })
    //             newFavoriteArr.sort((a, b) => b.id - a.id)

    //             setSortedPosts(newFavoriteArr)
    //         }
    //     },
    //     [filteredByFavorite]
    // )

    // useEffect(
    //     () => {
    //         if(filteredByUser === "0") {
    //             setSortedPosts(posts)
    //         } 
    //         else {
    //             const postsFilteredByUser = posts.filter(post => post.userId === parseInt(filteredByUser))

    //             setSortedPosts(postsFilteredByUser)
                
    //         }
    //     },
    //     [filteredByUser]
    // )

    let filteredPosts = sortedPosts

    

    useEffect(
        () => {
            if (stateOfFilter.selectedYear) {
                filteredPosts = filteredPosts.filter(post => {
                    let [,,postYear] = post.date.split("/")
                    return postYear === stateOfFilter.selectedYear
                })
            }
            if (stateOfFilter.selectedUser) {
                filteredPosts = filteredPosts.filter(post => post.userId === stateOfFilter.selectedUser)
            }
            if (stateOfFilter.favoritesOnly) {
                let filteredFavPosts = []
                {
                    userFavorites.map(userFav => {
                        if (giffyUserObj.id === userFav.userId) {
                            filteredFavPosts.push(userFav)
                        }
                    })
                }
                
                
                filteredPosts = filteredPosts.filter(post => {
                    filteredFavPosts.map(filteredFav => {
                        if (post.id === filteredFav.postId) {
                            return true
                        }
                        return false
                    }
                    )
                    
                })
                
            }
        },
        [stateOfFilter]
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
                } } ></BlankStar>
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
                    filteredPosts.map(post => {
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



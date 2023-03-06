import { useEffect, useState } from "react"
import { sendNewPost } from "../ApiManager"
import "./newPost.css"

export const NewPost = () => {
    const [createPost, setCreatePost] = useState(false)
    const localGiffyUser = localStorage.getItem("giffy_user")
    const giffyUserObj = JSON.parse(localGiffyUser)

    var dateObj = new Date();
            var month = dateObj.getUTCMonth() + 1; //months from 1-12
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();

            const newDate = year + "/" + month + "/" + day
            
    const [newPost, updateNewPost] = useState({
        title: "",
        url: "",
        story: "",
        userId: giffyUserObj.id,

    })

    const newPostToSendToAPI = {
        title: newPost.title,
        url: newPost.url,
        story: newPost.story,
        userId: newPost.userId,
        date: newDate
    }

    // const updateNewPost = (evt) => {
    //     const copy = {...post}
    //     copy[evt.target.id] = evt.target.value
    //     setNewPost(copy)
    // }

    if (createPost === false) {
        return <>
            <div id="createPost">
                <section  onClick={() => setCreatePost(true)} className="miniMode" id="haveAGif">

                    have a gif to post?

                </section>
            </div>
        </>
    }
    if (createPost === true) {

        return <>
            <div class="newPost">
                <form>

                    <fieldset className="newPost__input">

                        <div  >
                            <input type="text" id="title" placeholder="title" onChange={
                                (evt) => {
                                    const copy = {...newPost}
                                    copy.title = evt.target.value
                                    updateNewPost(copy)
                                }
                            }/>
                        </div>
                    

                        <div className="newPost__input">
                            <input id="url" type="text" placeholder="URL of gif" onChange={
                                (evt) => {
                                    const copy = {...newPost}
                                    copy.url = evt.target.value
                                    updateNewPost(copy)
                                }
                            }/>
                        </div>
                    

                        <div className="newPost__input">
                            <textarea id="story" placeholder="Story behind your gif..." onChange={
                                (evt) => {
                                    const copy = {...newPost}
                                    copy.story = evt.target.value
                                    updateNewPost(copy)
                                }
                            }></textarea>
                        </div>

                    

                        <div>
                            <button onClick={() => sendNewPost(newPostToSendToAPI)} id="savePost">Save</button>
                            <button onClick={() => setCreatePost(false)} id="cancelPost">Cancel</button>
                        </div>
                    </fieldset>
                </form>
            </div>

        </>
    }

}
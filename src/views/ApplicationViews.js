import { Outlet, Route, Routes } from "react-router-dom"
import { PostList } from "../feed/PostList.js"
import { MessageList } from "../Messages/messageList.js"
import { Footer } from "../nav/Footer.js"
import { NewPost } from "../newPost/newPost.js"

export const ApplicationViews = () => {
	

	return (
		<Routes>
			<Route path="/" element={
				<>
					<div id="mainHeader">
						

					</div>
					<Outlet />
				</>
			}>

					{/* <Route path="/" element={ <NewPost/> } /> */}

					<Route path="/" element={ <PostList /> } />
					<Route path="/messages" element={<MessageList/>} />
					

			</Route>
		</Routes>
	)
}
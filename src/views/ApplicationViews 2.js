import { Outlet, Route, Routes } from "react-router-dom"
import { PostList } from "../feed/PostList.js"

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


					<Route path="/" element={ <PostList/> } />
					<Route path="" element={<></>} />
					

			</Route>
		</Routes>
	)
}
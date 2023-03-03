import { Route, Routes } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { NavBar } from "./nav/NavBar"
// import { NavBar } from "./nav/Navbar"
import { ApplicationViews } from "./views/ApplicationViews"
import { Authorized } from "./views/Authorized"
// import { FilterContext } from "./Nav/NavbarContext"


export const GiffyGram = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<>
				<Authorized >
					
						<NavBar />
						<ApplicationViews />
					
				</Authorized>
			</>

		} />
	</Routes>
}
export default GiffyGram
import "./App.css";
import Footer from "./components/views/Footer";
import Header from "./components/views/Header";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/SignUp";
import MainPage from "./pages/MainPage";
import Update from "./pages/UpdatePage";
import Sidebar from "./components/views/Sidebar";
import DefaultPage from "./pages/DefaultPage";
import SignUp from "./pages/SignUp";
import LoggedIn from "./pages/LoggedIn";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" exact={true} Component={DefaultPage} />
				<Route path="/SignUp" exact={true} Component={SignUp} />
				<Route path="/LoggedIn" exact={true} Component={LoggedIn} />
			</Routes>
		</div>
	);
}

export default App;

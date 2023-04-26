import "./App.css";
import Footer from "./components/views/Footer";
import Header from "./components/views/Header";
import {Route, Routes} from "react-router-dom";
import Signup from "./components/views/SignUp";
import MainPage from "./components/views/MainPage";
import Update from "./components/views/UpdatePage";
import Sidebar from "./components/views/Sidebar";

function App() {

	return (
		<div className="App">
			
			<header className="App-header">
					<Header />
			</header>
			<div>
				<Sidebar />	
			</div>
			
			<div className="Main">
				<Routes>
					<Route path="/" exact={true} Component={MainPage} />
					<Route path="/signup" exact={true} Component={Signup} />
					<Route path="/Update" exact={true} Component={Update} />
				</Routes>
			</div>
			<Footer />
		</div>
	)
}

export default App;

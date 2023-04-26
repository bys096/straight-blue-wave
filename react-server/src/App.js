import "./App.css";
import Footer from "./components/views/Footer";
import Header from "./components/views/Header";
import {Route, Routes} from "react-router-dom";
import Signup from "./pages/SignUp";
import MainPage from "./pages/MainPage";
import Update from "./pages/UpdatePage";
import Sidebar from "./components/views/Sidebar";

function App() {

	return (
		<div className="App">
			
			<header className="App-header">
				<Header />
			</header>
			
			
			<div className="article">
				<div>
					<Sidebar />	
				</div>
				<div className="main">
					<Routes>
						<Route path="/" exact={true} Component={MainPage} />
						<Route path="/signup" exact={true} Component={Signup} />
						<Route path="/Update" exact={true} Component={Update} />
					</Routes>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default App;

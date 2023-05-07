import "./App.css";
import Footer from "./components/views/Footer";
import Header from "./components/views/Header";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/SignUp";
import Update from "./pages/UpdatePage";
import Sidebar from "./components/views/Sidebar";
import DefaultPage from "./pages/DefaultPage";
import SignUp from "./pages/SignUp";
import LoggedIn from "./pages/LoggedIn";
import CommunityPage from "./pages/CommunityPage";
import ShoppingPage from "./pages/ShoppingPage";
import LoginPage from "./pages/LoginPage";
import CalendarForm from "./pages/CalendarForm";
import SettingPage from "./pages/SettingPage";
import UpdatePage from "./pages/UpdatePage";
import TeamCreate from "./pages/TeamCreate";
import TeamDetail from "./pages/TeamDetail";
import ProjectCreate from "./pages/ProjectCreate";
import ProjectDetail from "./pages/ProjectDetail";
import ChattingPage from "./pages/ChattingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact={true} Component={DefaultPage} />
        <Route path="/SignUp" exact={true} Component={SignUp} />
        <Route path="/login" exact={true} Component={LoginPage} />
        <Route path="/LoggedIn" exact={true} Component={LoggedIn} />
        <Route path="/community" exact={true} Component={CommunityPage} />
        <Route path="/shopping" exact={true} Component={ShoppingPage}></Route>
        <Route path="/calendar" exact={true} Component={CalendarForm}></Route>
        <Route path="/setting" exact={true} Component={SettingPage}></Route>
        <Route path="/update" exact={true} Component={UpdatePage}></Route>
        <Route
          path="/chattingroom"
          exact={true}
          Component={ChattingPage}
        ></Route>
        <Route path="/TeamCreate" exact={true} Component={TeamCreate}></Route>
        <Route path="/team/:tmId" Component={TeamDetail} />
        <Route path="/project/:prjId" Component={ProjectDetail}></Route>
        <Route
          path="/ProjectCreate"
          exact={true}
          Component={ProjectCreate}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

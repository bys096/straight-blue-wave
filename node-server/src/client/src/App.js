import "./App.css";
import Footer from "./components/views/Footer";
import Header from "./components/views/Header";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/SignUp";
import Sidebar from "./components/views/Sidebar";
import DefaultPage from "./pages/DefaultPage";
import SignUp from "./pages/SignUp";
import LoggedIn from "./pages/LoggedIn";
import LoginPage from "./pages/LoginPage";
import CalendarForm from "./pages/CalendarForm";
import SettingPage from "./pages/SettingPage";
import ProjectCreate from "./pages/ProjectCreate";
import ProjectDetail from "./pages/ProjectDetail";
import ChattingPage from "./pages/ChattingPage";
import { Navigate } from "react-router-dom";
import PostPage from "./pages/PostPage";
import PostDetail from "./pages/PostDetail";
import CreatePostPage from "./pages/CreatePostPage";
import Wbs from "./components/Wbs";
import ProjectList from "./pages/ProjectList";
import GptPage from "./pages/GptPage";
import MemberList from "./pages/MemberList";

// ui 용으로 임시 라우팅
import Chat from "./pages/MainPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
        <Route path="/" exact={true} Component={DefaultPage} />
        <Route path="/SignUp" exact={true} Component={SignUp} />
        <Route path="/login" exact={true} Component={LoginPage} />
        <Route path="/LoggedIn" exact={true} Component={LoggedIn} />
        <Route path="/calendar" exact={true} Component={CalendarForm}></Route>
        <Route path="/setting" exact={true} Component={SettingPage}></Route>
        <Route
          path="/chattingroom"
          exact={true}
          Component={ChattingPage}
        ></Route>
        <Route path="/team/:tmId" Component={ProjectList} />
        <Route path="/project/:prjId" Component={ProjectDetail}></Route>
        <Route
          path="/ProjectCreate"
          exact={true}
          Component={ProjectCreate}
        ></Route>
        <Route
          path="/ProjectCreate"
          exact={true}
          Component={ProjectCreate}
        ></Route>
        <Route path="/post" Component={PostPage}></Route>
        <Route path="/post/:post_id" Component={PostDetail}></Route>
        <Route path="/createpost" Component={CreatePostPage}></Route>
        <Route path="/wbs" Component={Wbs}></Route>
        <Route path="/gpt" Component={GptPage}></Route>
        <Route path="/memlist" Component={MemberList}></Route>
        <Route path="/post/modify/:post_id" element={<CreatePostPage />} />
        <Route path="/chat" element={<Chat />} />

      </Routes>
    </div>
  );
}

export default App;

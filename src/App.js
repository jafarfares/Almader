import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Context/Context";

// Pages
import ProminentAppBar from "./AppBar";
import Login from "./Login";
import Profile from "./Profile";
import Dashoard from "./Dashboard";
import Register from "./Register";
import MyPost from "./MyPost";
import Posts from "./Posts";
import Settings from "./Settings";
import CreatePost from "./CreatePost";
function App() {
  return (
    <ThemeProvider>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/Register" element={<Register />} />
        
        <Route path="/dashboard" element={<ProminentAppBar />}>

          <Route index element={<Dashoard />} />

          
          <Route path="profile" element={<Profile />} />

          <Route path="MyPost" element={<MyPost/>}/>

          <Route path="Posts" element={<Posts/>}/>

          <Route path="Settings" element={<Settings/>}/>

          <Route path="CreatePost" element={<CreatePost />}/>

        </Route>

      </Routes>
    </ThemeProvider>
  );
}

export default App;

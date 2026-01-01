import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Context/Context";
import { SnackbarProvider } from "./SnackbarContext";

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
import EditPost from "./EditPost";

function App() {
  
  return (
    <ThemeProvider>
     <SnackbarProvider>
  
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

          <Route path="EditPost/:id" element={<EditPost/>}/>

        </Route>

      </Routes>
     </SnackbarProvider> 
    </ThemeProvider>
  );
}

export default App;

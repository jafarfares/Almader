import { Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "./SnackbarContext";
import { ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
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
import EditPost from "./EditPost";

function App() {
  const [mode, setMode] = useState(()=>{
    return localStorage.getItem("theme")||"light";
  }); 

  // Toggle function
  const toggleTheme = () => setMode(prev => {
    const newMode = prev === "light" ? "dark" : "light";
    localStorage.setItem("theme",newMode);
    return newMode;
  });

  // Theme MUI
  const theme = createTheme({
    palette: {
      mode, 
    },
  });

  return (
    <ThemeProvider>
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          <Route path="/dashboard" element={<ProminentAppBar />}>
            <Route index element={<Dashoard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="MyPost" element={<MyPost />} />
            <Route path="Posts" element={<Posts />} />
            
            <Route path="Settings" element={<Settings mode={mode} toggleTheme={toggleTheme} />} />
            <Route path="CreatePost" element={<CreatePost />} />
            <Route path="EditPost/:id" element={<EditPost />} />
          </Route>
        </Routes>
      </SnackbarProvider>
    </MUIThemeProvider>
    </ThemeProvider>
  );
}

export default App;

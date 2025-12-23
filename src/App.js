import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Context/Context";

// Pages
import ProminentAppBar from "./AppBar";
import Login from "./Login";
import Profile from "./Profile";
import Dashoard from "./Dashboard";
import Register from "./Register";

function App() {
  return (
    <ThemeProvider>
      <Routes>

        {/* Login */}

        <Route path="/" element={<Login />} />

        <Route path="/Register" element={<Register />} />

        
        <Route path="/dashboard" element={<ProminentAppBar />}>
          

          <Route index element={<Dashoard />} />

          
          <Route path="profile" element={<Profile />} />

        </Route>

      </Routes>
    </ThemeProvider>
  );
}

export default App;

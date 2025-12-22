import { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { Outlet } from "react-router-dom";

import Dashoard from "./Dashboard";

import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom"

//icon
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";

import PersonIcon from '@mui/icons-material/Person';

import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  "@media all": {
    minHeight: 128,
  },
}));

export default function ProminentAppBar() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [color,setColor]=useState(false)

  const array = [
    {name:"My dashboard",icon:<DashboardIcon/>},
    {name:"Posts",icon:<WysiwygIcon/>},
    {name:"My post",icon:<PersonIcon/>},
    {name:"Create post",icon:<PostAddIcon/>},
    {name:"Profile",icon:<AccountCircleIcon/>},
    {name:"Settings",icon:<SettingsIcon/>},
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: sidebarOpen ? 200 : 0,
          transition: "width 0.3s",
          backgroundColor: "white",
          color: "white",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          gap: "30px",
          
          borderRadius: "10px",
          height: "100vh",

          position: "sticky", 
          top: 0,
          overflowY: "auto",
        }}
      >
        <div>
          <h2 style={{ marginTop: "30px", color: "black" }}>Almder</h2>
        </div>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
             gap: 1,
            marginTop:"20px"
          }}
        >
          {array.map((item, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Button
                fullWidth
                sx={{
                  maxWidth: "80%",
                  color:color===index?"black":"#7c7878ff",
                  textTransform: "none",
                  justifyContent: "flex-start",
                  gap: 1,
                  backgroundColor:color===index?"#f5f5f5":"white",
                }}
                onClick={()=>setColor(index)}
              >
                {item.icon} <strong>{item.name}</strong>
              </Button>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Main content wrapper */}
      <Box
        sx={{
          flexGrow: 1,
          transition: "margin-left 0.3s",
          marginLeft: sidebarOpen ? "5px" : "0px",
        }}
      >
        <AppBar
          position="static"
          sx={{ height: "60px", backgroundColor: "white", boxShadow: "none" }}
        >
          <StyledToolbar
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <IconButton
                size="large"
                edge="start"
                color="black"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={toggleSidebar}
                backgroundColor="black"
              >
                <MenuIcon />
              </IconButton>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <IconButton size="large" aria-label="search" color="black">
                <SettingsBrightnessIcon />
              </IconButton>

              <IconButton
                size="large"
                aria-label="display more actions"
                edge="end"
                color="black"
                onClick={() => navigate("profile")}
              >
                <AccountCircleIcon />
              </IconButton>
            </div>
          </StyledToolbar>
        </AppBar>

        <Box sx={{ padding: "20px" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

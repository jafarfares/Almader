// import { useState,useEffect } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { Outlet } from "react-router-dom";

import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom"

//icon
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import PersonIcon from '@mui/icons-material/Person';

import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { NavLink } from "react-router-dom";
import { useState,useEffect } from "react";

import axios from "axios";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  padding: "0 16px",
  "@media all": {
    minHeight: 64,
  },
}));

export default function ProminentAppBar() {





const [show,setShow]=useState({imge:""})

const token=localStorage.getItem("token");

useEffect(() => {
    async function fetchProfile() {
      try {
        if (!token) return;

        const res = await axios.get(
          "https://backendlaravel.cupital.xyz/api/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const profile = res.data.data;
        if (!profile) return;

        setShow({
          imge: profile.image_url || "",
        });
      } catch (error) {
        console.log("Fetch profile error:", error);
      }
    }

    fetchProfile();
  }, [token]);







  const navigate = useNavigate();

  const [color, setColor] = useState(false);

  const array = [
    // To move to the index path, we write  path:"."
    {name:"My dashboard",icon:<DashboardIcon/>,path:"."},
    {name:"Posts",icon:<WysiwygIcon/>,path:"Posts"},
    {name:"My post",icon:<PersonIcon/>,path:"MyPost"},
    {name:"Settings",icon:<SettingsIcon/>,path:"Settings"},
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 200,
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
          position: "fixed",
          left: 0,
          top: 0,
          overflowY: "auto",
          zIndex: 1200,
          marginTop:"60px"
        }}
      >
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
                //to move between paths
                component={NavLink}
                to={item.path}
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
          marginLeft: "205px", // account for fixed sidebar width + gap
          width: "calc(100% - 200px)",
          marginTop: "60px",
        }}
        >
        <AppBar  position="fixed" sx={{ width: "100%",left: 0,zIndex: 1300,height: "60px", backgroundColor: "#f6f4f7ff", boxShadow: "none" }}>
          <StyledToolbar
            sx={{ display: "flex", justifyContent: "space-between" ,alignItems:"center"}}
          >
            <div>
              <h2 style={{color:"black"}}>Almader</h2>
            </div>

            {/* <div  style={{ display: "flex", alignItems: "center", gap: "10px",backgroundColor:"red"}}> */}
              <button style={{border:"none",background:"none"}}>
              {show.imge ? (
                  <img
                    src={show.imge}
                    alt="avatar"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("profile")}
                  />
                ):(
              <AccountCircleIcon onClick={() => navigate("profile")} sx={{ color: "#b8b2b2ff",marginTop:"5px",fontSize:"30px" }} />
              )}
              </button>
            {/* </div> */}

          </StyledToolbar>
        </AppBar>
        

        <Box sx={{ overflowX: "hidden" ,msrginTop:"60px"}}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

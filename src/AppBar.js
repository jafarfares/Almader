//This component includes both AppBar and sidebar

//react imports
import { useState, useEffect } from "react";

//react router imports
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

//MUI imports
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";

//icon MUI imports
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";

//axios import
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

//ProminentAppBar
export default function ProminentAppBar() {

  const theme = useTheme();
  const [show, setShow] = useState({ imge: "" });

  // Get token from local storage
  const token = localStorage.getItem("token");

  // This APIURL is used to fetch the profile image of the user  
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

  const array = [
    // To move to the index path, we write  path:"."
    // { name: "My dashboard", icon: <DashboardIcon />, path: "." },
    { name: "Posts", icon: <WysiwygIcon />, path: "." },
    { name: "My post", icon: <PersonIcon />, path: "MyPost" },
    { name: "Settings", icon: <SettingsIcon />, path: "Settings" },
  ];

  return (
    <Box sx={{ display: "flex" }}>

      {/* Sidebar */}
      <Box
        sx={{
          width: 200,
          transition: "width 0.3s",
          backgroundColor: theme.palette.mode === "dark" ? "#000" : "white",
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
          marginTop: "50px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            marginTop: "20px",
          }}
        >

          {/* Button  for the sidebar */}
          {array.map((item) => (
            <Box
              key={item.path}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <NavLink
                to={item.path}
                end
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  textDecoration:"none",
                }}
              >
                {({ isActive }) => (
                  <Button
                    fullWidth
                    sx={{
                      maxWidth: "80%",
                      textTransform: "none",
                      justifyContent: "flex-start",
                      gap: 1,
                      borderRadius: "10px",
                      color: isActive ? "#000" : "#7c7878",
                      backgroundColor: isActive ? "#f5f5f5" : "transparent",
                      "&:hover": {
                        backgroundColor: "#eeeeee",
                      },
                    }}
                  >
                    {item.icon} <strong style={{ textDecoration: "none" }}>{item.name}</strong>
                  </Button>
                )}
              </NavLink>
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
        <AppBar
          position="fixed"
          sx={{
            width: "100%",
            left: 0,
            zIndex: 1300,
            height: "60px",
            //backgroundColor: "#f6f4f7ff",
            backgroundColor: theme.palette.mode === "dark" ? "#000" : "#f6f4f7ff",
            boxShadow: "none",
          }}
        >
          <StyledToolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2 style={{ color: theme.palette.mode === "dark" ? "white" : "#000"}}>Almader</h2>
            </div>

            <button style={{ border: "none", background: "none" }}>
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
              ) : (
                <AccountCircleIcon
                  onClick={() => navigate("profile")}
                  sx={{
                    color: "#b8b2b2ff",
                    marginTop: "5px",
                    fontSize: "30px",
                  }}
                />
              )}
            </button>
            
          </StyledToolbar>
        </AppBar>

        <Box sx={{ overflowX: "hidden"}}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

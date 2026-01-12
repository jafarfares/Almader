//react
import { useState, useEffect } from "react";

//MUI
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  Switch,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

//axios
import axios from "axios";

//router
import { useNavigate } from "react-router-dom";

export default function Settings({ mode, toggleTheme }) {
  const navigate = useNavigate();
  const [infoSetting, setInfoSetting] = useState({
    name: "",
    email: "",
    imge: "",
  });
  
  const token = localStorage.getItem("token");
  const logout = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        await axios.post(
          "https://backendlaravel.cupital.xyz/api/logout",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (err) {
      console.log("Logout API error:", err);
    } finally {
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    }
  };

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

        setInfoSetting({
          name: profile.name || "",
          email: profile.email || "",
          imge: profile.image_url || "",
        });
      } catch (error) {
        console.log("Fetch profile error:", error);
      }
    }

    fetchProfile();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: mode === "dark" ? "#121212" : "#f4f4f4",
        transition: "background-color 0.3s",
      }}
    >
      <Card sx={{ width: 380, borderRadius: "16px" }}>
        <CardContent>
          {/* Profile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
           
            <Avatar src={infoSetting.imge || ""} sx={{ width: 56, height: 56 }}>
              {!infoSetting.imge && <AccountCircleIcon fontSize="large" />}
            </Avatar>

            <Box>
              <Typography
                fontWeight={600}
                color={mode === "dark" ? "#fff" : "#000"}
              >
                {infoSetting.name}
              </Typography>
              <Typography
                fontSize={13}
                color={mode === "dark" ? "#ccc" : "text.secondary"}
              >
                {infoSetting.email}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Theme toggle */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
              <Typography color={mode === "dark" ? "#fff" : "#000"}>
                Theme
              </Typography>
            </Box>
            <Switch checked={mode === "dark"} onChange={toggleTheme} />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Logout */}
          <Button
            fullWidth
            onClick={logout}
            sx={{
              textTransform: "none",
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#fecaca" },
            }}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

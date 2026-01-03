//This is Dashboard page code

//axios
import axios from "axios";

//react
import { useContext } from "react";
import ThemeContext from "./Context/Context";

//react router
import { useNavigate } from "react-router-dom";

//MUI
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from "@mui/material";

export default function Dashboard() {
   
  const navigate = useNavigate();

  const {information } = useContext(ThemeContext);
  
  async function logout() {
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
  }

  return (
    <>
    <div>

      <div
        style={{
          backgroundColor: "#f5f3f3ff",
          color: "white",
          borderRadius: "5px",
          width: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap:"5px",
          padding:"5px"
        }}
      >
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap:"5px"
        }}>
          <AccountCircleIcon style={{color:"black"}}/>
          <p style={{color:"black"}}><strong>{information.name}</strong></p>
        </div>
        <p style={{color:"#7c7a7aff",fontSize:"12px"}}><strong>{information.email}</strong></p>

      </div>

      <Button style={{color:"black",backgroundColor:"#f5f3f3ff", textTransform: "none",fontSize:"15px",width: "210px",marginTop:"5px"}} onClick={logout}><strong>Logout</strong></Button>

    </div>
    </>
  );
}

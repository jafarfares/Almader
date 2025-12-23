import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "./Context/Context";

function Register() {


     const { information, setInformation } = useContext(ThemeContext);
   
   
     const navigate = useNavigate();
     const [loading, setLoading] = useState(false);
     const [error,setError]=useState(null);
     
     async function AddUser(e) {
       e.preventDefault();
   
       const forbidden = /[.;:\[\]]/;
   
       if (!information.name || !information.email || !information.password) {
         setError("Fill in all fields");
         return;
       }
       if(forbidden.test(information.name)||information.name.length<3||information.name.length>15||/\d/.test(information.name)){
         setError("The name must be between 3 and 15 characters and not contain numbers");
         return;
       }
       if(information.password.length<6){
         setError("The password must consist of at least 6 numbers or letters");
         return;
       }
       if(!/\S+@\S+\.\S+/.test(information.email)){
         setError("The password must consist of at least 6 numbers or letters");
         return;
       }
       setLoading(true);
   
       try {
         const res = await axios.post(
           "http://a04wg0wwccosgc4kk40kkwo8.168.231.110.172.sslip.io/api/register",
           information
         );
   
         if (res.data?.token) {
           localStorage.setItem("token", res.data.token);
           localStorage.setItem("user",  JSON.stringify(information));
           navigate("/Dashboard", { replace: true });
         } else {
           alert("Login failed");
         }
       } catch (err) {
         console.log(err.response?.data || err.message);
         alert(err.response?.data?.message || "Login failed");
       } finally {
         setLoading(false);
       }
     }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        
        backgroundColor:"#594664ff",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Glass Card */}
      {/* rgba(255, 255, 255, 0.15) */}
      <Box
        style={{
          width: "380px",
          padding: "30px",
          borderRadius: "18px",
          background: "rgba(121, 117, 117, 0.15)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          border: "1px solid rgba(255,255,255,0.2)",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          style={{ color: "#6a1b9a", fontWeight: "600" }}
        >
          Register
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{
            style: {
              color: "white",
              borderRadius: "12px",
            },
          }}
          value={information.name}
                        onChange={(e) =>
                          setInformation({ ...information, name: e.target.value })
                        }
        />


        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{
            style: {
              color: "white",
              borderRadius: "12px",
            },
          }}
          value={information.email}
                        onChange={(e) =>
                          setInformation({ ...information, email: e.target.value })
                        }
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{
            style: {
              color: "white",
              borderRadius: "12px",
            },
          }}
          value={information.password}
                        onChange={(e) =>
                          setInformation({ ...information, password: e.target.value })
                        }
        />

        <Button
          fullWidth
          style={{
            marginTop: "10px",
            padding: "12px",
            borderRadius: "25px",
            background: "white",
            color: "#6a1b9a",
            fontWeight: "bold",
            textTransform: "none",
          }}
          onClick={(e)=>AddUser(e)}
        >
          Register
        </Button>

        <Typography
          align="center"
          style={{ color: "#6a1b9a", fontSize: "14px" }}
        >
          Already have an account?{" "}
          <button style={{background:"none",border:"none", fontWeight: "600", cursor: "pointer" ,color:"blue"}} onClick={()=>navigate("/", { replace: true })}>
            Login
          </button>
        </Typography>
      </Box>
    </div>
  );
}

export default Register;

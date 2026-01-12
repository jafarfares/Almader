import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

export default function Login() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [information,setInformation]=useState({email:"",password:""})
  
  async function LoginUser(e){
    e.preventDefault();
    setLoading(true);
    try{
      const res=await axios.post("https://backendlaravel.cupital.xyz/api/login",{
      email:information.email,
      password:information.password
      })
      localStorage.setItem("token", res.data.token);
      navigate("/Dashboard", { replace: true });
    }catch(error){
      console.log("error",error)
    }finally{
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
        backgroundColor: "#F4F5F7",
      }}
    >
      {/* Glass Card */}
      <div
        style={{
          width: "380px",
          padding: "30px",
          borderRadius: "18px",
          background: "#FFFFFF",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          border: "1px solid rgba(255,255,255,0.2)",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#6A1B9A",
            fontWeight: "600",
            marginBottom: "10px",
          }}
        >
          Login
        </h2>

        <form onSubmit={LoginUser}>
          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ color: "white", fontSize: "14px" }}>Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              style={{
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #E0E0E0",
                backgroundColor:"#E0E0E0",
                color: "#333333",
                outline: "none",
                fontSize: "14px",
              }}
              value={information.email}
              onChange={(e)=>setInformation({...information,email:e.target.value})}
            />
          </div>

          {/* Password */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ color: "white", fontSize: "14px" }}>Password</label>
            <input
              type="password"
              placeholder="Password"
              style={{
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #E0E0E0",
                backgroundColor:"#E0E0E0",
                color: "#333333",
                outline: "none",
                fontSize: "14px",
              }}
              value={information.password}
              onChange={(e)=>setInformation({...information,password:e.target.value})}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="Button"
            style={{
              marginTop: "15px",
              width: "100%",
              padding: "12px",
              borderRadius: "25px",
              background: "#6A1B9A",
              color: "#FFFFFF",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
            
          >
            {loading ? "loading...":"Login"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#333333",
          }}
        >
          Don’t have an account?{" "}
          <button
            style={{
              background: "none",
              border: "none",
              color: "#6A1B9A",
              cursor: "pointer",
              fontWeight: "600",
            }}
            onClick={()=>navigate("/Register", { replace: true })}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

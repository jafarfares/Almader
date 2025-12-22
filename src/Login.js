import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "./Context/Context";


import axios from "axios";

export default function Login() {

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
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#080707ff",
          padding: "40px 30px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
          width: "350px",
          maxWidth: "90%",
          textAlign: "center",
          
        }}
      >
        <h2 style={{ marginBottom: "25px", color: "#f9f6f6ff" }}>Login</h2>
        <form onSubmit={AddUser}>
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "#f9f6f6ff",
              }}
            >
              Name
            </label>
            <input
              type="text"
              placeholder="enter your name"
              value={information.name}
              onChange={(e) =>
                setInformation({ ...information, name: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #cccccc",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "#f9f6f6ff",
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              value={information.email}
              onChange={(e) =>
                setInformation({ ...information, email: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #cccccc",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "#f9f6f6ff",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              value={information.password}
              onChange={(e) =>
                setInformation({ ...information, password: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #cccccc",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <h5 style={{color:"red"}}>{error}</h5>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#426a6eff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#207079ff")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#426a6eff")}
          >
            Entrance
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [information, setInformation] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/Dashboard", { replace: true });
    }
  }, [navigate]);

  
  async function AddUser(e) {
    e.preventDefault();

   
    if (!information.name || !information.email || !information.password) {
      alert("املأ كل الحقول");
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
        navigate("/Dashboard", { replace: true });
      } else {
        alert("لم يتم تسجيل المستخدم بنجاح");
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "فشل التسجيل");
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

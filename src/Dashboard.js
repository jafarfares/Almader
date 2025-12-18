import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();

  async function logout() {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        await axios.post(
          "http://a04wg0wwccosgc4kk40kkwo8.168.231.110.172.sslip.io/api/logout",
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
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>
    </>
  );
}


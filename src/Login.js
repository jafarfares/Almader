// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import ThemeContext from "./Context/Context";


// import axios from "axios";

// export default function Login() {

//   // const { information, setInformation } = useContext(ThemeContext);


//   // const navigate = useNavigate();
//   // const [loading, setLoading] = useState(false);
//   // const [error,setError]=useState(null);
  
//   // async function AddUser(e) {
//   //   e.preventDefault();

//   //   const forbidden = /[.;:\[\]]/;

//   //   if (!information.name || !information.email || !information.password) {
//   //     setError("Fill in all fields");
//   //     return;
//   //   }
//   //   if(forbidden.test(information.name)||information.name.length<3||information.name.length>15||/\d/.test(information.name)){
//   //     setError("The name must be between 3 and 15 characters and not contain numbers");
//   //     return;
//   //   }
//   //   if(information.password.length<6){
//   //     setError("The password must consist of at least 6 numbers or letters");
//   //     return;
//   //   }
//   //   if(!/\S+@\S+\.\S+/.test(information.email)){
//   //     setError("The password must consist of at least 6 numbers or letters");
//   //     return;
//   //   }
//   //   setLoading(true);

//   //   try {
//   //     const res = await axios.post(
//   //       "http://a04wg0wwccosgc4kk40kkwo8.168.231.110.172.sslip.io/api/register",
//   //       information
//   //     );

//   //     if (res.data?.token) {
//   //       localStorage.setItem("token", res.data.token);
//   //       localStorage.setItem("user",  JSON.stringify(information));
//   //       navigate("/Dashboard", { replace: true });
//   //     } else {
//   //       alert("Login failed");
//   //     }
//   //   } catch (err) {
//   //     console.log(err.response?.data || err.message);
//   //     alert(err.response?.data?.message || "Login failed");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // }

//   return (
//     <div
//       style={{
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "#080707ff",
//           padding: "40px 30px",
//           borderRadius: "15px",
//           boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
//           width: "350px",
//           maxWidth: "90%",
//           textAlign: "center",
          
//         }}
//       >
//         <h2 style={{ marginBottom: "25px", color: "#f9f6f6ff" }}>Login</h2>
//         {/* onSubmit={AddUser} */}
//         <form >
//           <div style={{ marginBottom: "20px", textAlign: "left" }}>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: "5px",
//                 fontWeight: "bold",
//                 color: "#f9f6f6ff",
//               }}
//             >
//               Name
//             </label>
//             <input
//               type="text"
//               placeholder="enter your name"
//               // value={information.name}
//               // onChange={(e) =>
//               //   setInformation({ ...information, name: e.target.value })
//               // }
//               style={{
//                 width: "100%",
//                 padding: "10px 12px",
//                 borderRadius: "8px",
//                 border: "1px solid #cccccc",
//                 fontSize: "14px",
//                 outline: "none",
//               }}
//             />
//           </div>

//           <div style={{ marginBottom: "20px", textAlign: "left" }}>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: "5px",
//                 fontWeight: "bold",
//                 color: "#f9f6f6ff",
//               }}
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="example@email.com"
//               // value={information.email}
//               // onChange={(e) =>
//               //   setInformation({ ...information, email: e.target.value })
//               // }
//               style={{
//                 width: "100%",
//                 padding: "10px 12px",
//                 borderRadius: "8px",
//                 border: "1px solid #cccccc",
//                 fontSize: "14px",
//                 outline: "none",
//               }}
//             />
//           </div>

//           <div style={{ marginBottom: "20px", textAlign: "left" }}>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: "5px",
//                 fontWeight: "bold",
//                 color: "#f9f6f6ff",
//               }}
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="password"
//               // value={information.password}
//               // onChange={(e) =>
//               //   setInformation({ ...information, password: e.target.value })
//               // }
//               style={{
//                 width: "100%",
//                 padding: "10px 12px",
//                 borderRadius: "8px",
//                 border: "1px solid #cccccc",
//                 fontSize: "14px",
//                 outline: "none",
//               }}
//             />
//           </div>
           
//           {/* <h5 style={{color:"red"}}>{error}</h5> */}

//           <button
//             type="submit"
//             style={{
//               width: "100%",
//               padding: "12px",
//               background: "#426a6eff",
//               color: "white",
//               border: "none",
//               borderRadius: "8px",
//               fontSize: "16px",
//               cursor: "pointer",
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.background = "#207079ff")}
//             onMouseLeave={(e) => (e.currentTarget.style.background = "#426a6eff")}
//           >
//             Entrance
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }










import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "./Context/Context";
import axios from "axios";
import { Password } from "@mui/icons-material";
import "./index.css";

export default function Login() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [information,setInformation]=useState({email:"",password:""})
  
  async function LoginUser(e){
    e.preventDefault();
    setLoading(true);
    try{
      //http://a04wg0wwccosgc4kk40kkwo8.168.231.110.172.sslip.io/api/login
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

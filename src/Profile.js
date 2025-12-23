
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Profile.css";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function Profile() {
  const [create, setCreate] = useState({
    name: "",
    bio:"",
    email:"",
    phone: "",
    age: "",
    country:"",
    city:"",
    imge: "",
    gender:"",
    language:""
  });

  const token = localStorage.getItem("token");



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedProfile = { ...create, imge: reader.result, file };
        setCreate(updatedProfile);
      };
      reader.readAsDataURL(file);
    }
  };

  async function CreateProfile() {
    try {
      // const token = localStorage.getItem("token");

      if (!token) {
        console.log("❌ No token found");
        return;
      }

      
      if (!create.file && (!create.imge || create.imge === "")) {
        console.log("❌ Image is required before creating profile");
        alert("Please select a profile image before saving.");
        return;
      }
      

      let res;
      if (create.file) {
        const form = new FormData();
        form.append("name", create.name || "");
        form.append("bio", create.bio || "");
        form.append("email", create.email || "");
        form.append("phone", create.phone || "");
        form.append("country", create.country || "");
        form.append("city", create.city || "");
        form.append("gender",create.gender||"");
        form.append("language",create.language||"");
        if (create.age) form.append("age", String(create.age));
        form.append("image", create.file);

        console.log("Sending profile as FormData (with file)");

        res = await axios.post(
          "http://a04wg0wwccosgc4kk40kkwo8.168.231.110.172.sslip.io/api/profile",
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              
            }
          }
        );
      } else {
        const payload = {
          name: create.name,
          bio: create.bio,
          email: create.email,
          phone: create.phone,
          country: create.country,
          city: create.city,
          age: Number(create.age),
          image: create.imge,
          gender:create.gender,
          language:create.language
        };

        console.log("Sending profile payload:", payload);

        res = await axios.post(
          "http://a04wg0wwccosgc4kk40kkwo8.168.231.110.172.sslip.io/api/profile",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }

      console.log("TOKEN:", token);
      console.log("Profile created:", res.data);
    } catch (error) {
      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      } else {
        console.log("Error:", error.message);
      }
    }
  }

  useEffect(() => {
  async function fetchProfile() {
    try {
      if (!token) return;

      const res = await axios.get(
        "http://a04wg0wwccosgc4kk40kkwo8.168.231.110.172.sslip.io/api/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      const profile = res.data.data;
      if (!profile) return;

      setCreate({
        name: profile.name || "",
        bio: profile.bio || "",
        email: profile.email || "",
        phone: profile.phone || "",
        age: profile.age || "",
        country: profile.country || "",
        city: profile.city || "",
        imge: profile.image_url || "",
        gender:profile.gender||"",
        language:profile.language||""

      });
      
    } catch (error) {
      console.log("Fetch profile error:", error);
    }
  }

  fetchProfile();
}, []);

  return (
    <div className="profile-page" style={{ backgroundColor: "white" }}>
      <div className="profile-header" >
        <div>
          <h3>My profile</h3>
        </div>
      </div>

      <div className="overlay-card">
        <div className="profile-main">
          <div className="left-card">
            <div className="avatar-wrap">
              <label htmlFor="profile-image">
                {create.imge ? (
                  <img
                    src={create.imge}
                    alt="avatar"
                    style={{
                      width: 140,
                      height: 140,
                      borderRadius: "50%",
                      objectFit: "cover",
                      cursor: "pointer"
                    }}
                  />
                ) : (
                  <AccountCircleIcon
                    className="avatar-icon"
                    style={{ cursor: "pointer" }}
                  />
                )}
              </label>
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>

            <div className="profile-info" style={{ width: "70%" }}>
              <div className="info-row" style={{ width: "100%" }}>
                <TextField
                  label="Name"
                  variant="standard"
                  value={create.name}
                  onChange={(e) =>
                    setCreate({ ...create, name: e.target.value })
                  }
                />
              </div>

              <div className="info-row" style={{ width: "100%" }}>
                <TextField style={{width:"100%"}}  variant="standard" label="Email" value={create.email} onChange={(e) =>
                    setCreate({ ...create, email: e.target.value }  )
                  }
                  slotProps={{
                input: {
                 readOnly: true,
                },
                }}/>
              </div>

              <div className="info-row" style={{ width: "100%" }}>
                <TextField  variant="standard" label="Bio" value={create.bio} onChange={(e) =>
                    setCreate({ ...create, bio: e.target.value })
                  }/>
              </div>
              
              <div className="save-row">
                <button className="save-btn" onClick={CreateProfile} >
                  Create
                </button>
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="card accounts-card">
              
              <div className="account-item">
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={create.gender}
                onChange={(e)=>setCreate({...create,gender:e.target.value})}
                label="gender "
              >
                <MenuItem value="">
                  <em>Not Set</em>
                </MenuItem>
                <MenuItem value="male">male</MenuItem>
                <MenuItem value="female">female</MenuItem>
              </Select>

              </div>
              <div className="account-item muted">
               <TextField value={create.language} variant="standard" label="Language" onChange={(e)=>setCreate({...create,language:e.target.value})}/>
              </div>
            </div>

            <div className="card bills-card">
            
              <ul className="bills-list" style={{listStyle:"none",padding:10,display:"flex",flexDirection:"column",gap:"10px"}}>
                <li >
                  <TextField
                  label="Age"
                  variant="standard"
                  value={create.age}
                  onChange={(e) =>
                    setCreate({ ...create, age: e.target.value })
                  }
                /> 
                  
                </li>
                <li>
                  <TextField
                  label="Phone"
                  variant="standard"
                  value={create.phone}
                  onChange={(e) =>
                    setCreate({ ...create, phone: e.target.value })
                  }
                />
                  
                </li>
                <li>
                  <TextField  variant="standard" label="Country" value={create.country} onChange={(e) =>
                    setCreate({ ...create, country: e.target.value })
                  }/>
                 
                </li>
                <li>
                  <TextField  variant="standard" label="City" value={create.city} onChange={(e) =>
                    setCreate({ ...create, city: e.target.value })
                  }/>
                  
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;












// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import TextField from "@mui/material/TextField";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import "./Profile.css";

// function Profile() {
//   const [create, setCreate] = useState({
//     name: "",
//     bio:"",
//     email:"",
//     phone: "",
//     age: "",
//     country:"",
//     city:"",
//     imge: ""
//   });


//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const updatedProfile = { ...create, imge: reader.result, file };
//         setCreate(updatedProfile);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   async function CreateProfile() {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         console.log("❌ No token found");
//         return;
//       }

      
//       if (!create.file && (!create.imge || create.imge === "")) {
//         console.log("❌ Image is required before creating profile");
//         alert("Please select a profile image before saving.");
//         return;
//       }
      
//       let res;
//       if (create.file) {
//         const form = new FormData();
//         form.append("name", create.name || "");
//         form.append("bio", create.bio || "");
//         form.append("email", create.email || "");
//         form.append("phone", create.phone || "");
//         form.append("country", create.country || "");
//         form.append("city", create.city || "");
//         if (create.age) form.append("age", String(create.age));
//         form.append("image", create.file);

//         console.log("Sending profile as FormData (with file)");

//         res = await axios.post(
//           "http://a04wg0wwccosgc4kk40kkwo8.168.231.110.172.sslip.io/api/profile",
//           form,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
              
//             }
//           }
//         );
//       } else {
//         const payload = {
//           name: create.name,
//           bio: create.bio,
//           email: create.email,
//           phone: create.phone,
//           country: create.country,
//           city: create.city,
//           age: Number(create.age),
//           image: create.imge,
//         };

//         console.log("Sending profile payload:", payload);

//         res = await axios.post(
//           "http://a04wg0wwccosgc4kk40kkwo8.168.231.110.172.sslip.io/api/profile",
//           payload,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         );
//       }

//       console.log("TOKEN:", token);
//       console.log("Profile created:", res.data);

//       // حفظ البروفايل في localStorage مرتبطًا بالتوكن الحالي
//       try {
//         const currentToken = localStorage.getItem("token");
//         if (currentToken) {
//           const key = `profile_${currentToken}`;
//           const toStore = res.data || create;
//           localStorage.setItem(key, JSON.stringify(toStore));
//         }
//       } catch (e) {
//         console.warn("Could not save profile to localStorage", e);
//       }
//     } catch (error) {
//       if (error.response) {
//         console.log("Status:", error.response.status);
//         console.log("Data:", error.response.data);
//       } else {
//         console.log("Error:", error.message);
//       }
//     }
//   }

//   // عندما يُحمَّل المكون، نحاول جلب بيانات البروفايل المحفوظة بناءً على التوكن
//   useEffect(() => {
//     try {
//       const currentToken = localStorage.getItem("token");
//       if (currentToken) {
//         const key = `profile_${currentToken}`;
//         const stored = localStorage.getItem(key);
//         if (stored) setCreate(JSON.parse(stored));
//       }
//     } catch (e) {
//       console.warn("Failed to load stored profile", e);
//     }
//   }, []);

//   return (
//     <div className="profile-page" style={{ backgroundColor: "white" }}>
//       <div className="profile-header">
//         <div>
//           <h2>My profile</h2>
//           <p className="muted">Welcome to your personal settings — keep your info up to date</p>
//         </div>
//       </div>

//       <div className="overlay-card">
//         <div className="profile-main">
//           <div className="left-card">
//             <div className="avatar-wrap">
//               <label htmlFor="profile-image">
//                 {create.imge ? (
//                   <img
//                     src={create.imge}
//                     alt="avatar"
//                     style={{
//                       width: 140,
//                       height: 140,
//                       borderRadius: "50%",
//                       objectFit: "cover",
//                       cursor: "pointer"
//                     }}
//                   />
//                 ) : (
//                   <AccountCircleIcon
//                     className="avatar-icon"
//                     style={{ cursor: "pointer" }}
//                   />
//                 )}
//               </label>
//               <input
//                 id="profile-image"
//                 type="file"
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 onChange={handleImageChange}
//               />
//             </div>

//             <div className="profile-info" style={{ width: "70%" }}>
//               <div className="info-row" style={{ width: "100%" }}>
//                 <TextField
//                   label="Name"
//                   variant="standard"
//                   value={create.name}
//                   onChange={(e) =>
//                     setCreate({ ...create, name: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="info-row" style={{ width: "100%" }}>
//                 <TextField
//                   label="Phone Number"
//                   variant="standard"
//                   value={create.phone}
//                   onChange={(e) =>
//                     setCreate({ ...create, phone: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="info-row" style={{ width: "100%" }}>
//                 <TextField
//                   label="Age"
//                   variant="standard"
//                   value={create.age}
//                   onChange={(e) =>
//                     setCreate({ ...create, age: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="save-row">
//                 <button className="save-btn" onClick={CreateProfile}>
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="right-column">
//             <div className="card accounts-card">
//               <div className="card-title">My Profile</div>
//               <div className="account-item">
//                 <TextField  variant="standard" />
//               </div>
//               <div className="account-item muted">
//                <TextField  variant="standard"/>
//               </div>
//             </div>

//             <div className="card bills-card">
//               <div className="card-title">My bills</div>
//               <ul className="bills-list">
//                 <li>
//                   <TextField  variant="standard" label="bio" value={create.bio} onChange={(e) =>
//                       setCreate({ ...create, bio: e.target.value })
//                     }/>
//                 </li>
//                 <li>
//                   <TextField  variant="standard" label="email" value={create.email} onChange={(e) =>
//                     setCreate({ ...create, email: e.target.value })
//                   }/>
//                 </li>
//                 <li>
//                   <TextField  variant="standard" label="country" value={create.country} onChange={(e) =>
//                     setCreate({ ...create, country: e.target.value })
//                   }/>
//                 </li>
//                 <li>
//                   <TextField  variant="standard" label="city" value={create.city} onChange={(e) =>
//                     setCreate({ ...create, city: e.target.value })
//                   }/>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;

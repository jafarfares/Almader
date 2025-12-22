
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Profile.css";

function Profile() {
  const [create, setCreate] = useState({
    name: "",
    bio:"",
    email:"",
    phone: "",
    age: "",
    country:"",
    city:"",
    imge: ""
  });

  
  
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
      const token = localStorage.getItem("token");

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

  return (
    <div className="profile-page" style={{ backgroundColor: "white" }}>
      <div className="profile-header">
        <div>
          <h2>My profile</h2>
          <p className="muted">
            Welcome to your personal settings — keep your info up to date
          </p>
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
                <TextField
                  label="Phone Number"
                  variant="standard"
                  value={create.phone}
                  onChange={(e) =>
                    setCreate({ ...create, phone: e.target.value })
                  }
                />
              </div>

              <div className="info-row" style={{ width: "100%" }}>
                <TextField
                  label="Age"
                  variant="standard"
                  value={create.age}
                  onChange={(e) =>
                    setCreate({ ...create, age: e.target.value })
                  }
                />
              </div>

              <div className="save-row">
                <button className="save-btn" onClick={CreateProfile}>
                  Save
                </button>
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="card accounts-card">
              <div className="card-title">My Profile</div>
              <div className="account-item">
                <TextField  variant="standard" />
              </div>
              <div className="account-item muted">
               <TextField  variant="standard"/>
              </div>
            </div>

            <div className="card bills-card">
              <div className="card-title">My bills</div>
              <ul className="bills-list">
                <li>
                  <TextField  variant="standard" label="bio" onChange={(e) =>
                    setCreate({ ...create, bio: e.target.value })
                  }/>
                  <button className="pill">Bill paid</button>
                </li>
                <li>
                  <TextField  variant="standard" label="email" onChange={(e) =>
                    setCreate({ ...create, email: e.target.value })
                  }/>
                  <button className="pill">Next pay</button>
                </li>
                <li>
                  <TextField  variant="standard" label="country" onChange={(e) =>
                    setCreate({ ...create, country: e.target.value })
                  }/>
                  <button className="pill">Bill paid</button>
                </li>
                <li>
                  <TextField  variant="standard" label="city" onChange={(e) =>
                    setCreate({ ...create, city: e.target.value })
                  }/>
                  <button className="pill">Bill paid</button>
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

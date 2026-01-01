import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useSnackbar } from "./SnackbarContext";
import { useParams } from "react-router-dom";

const APPBAR_HEIGHT = 60;

export default function EditPost() {
  const [loading, setLoading] = useState(false);
  const [Info, setInfo] = useState({
    name: "",
    dec: "",
    image: null,
  });

  const { showSnackbar } = useSnackbar();

  const { id } = useParams();

  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function Edit() {

  if (!Info.name || !Info.dec) {
    console.log("Please fill all fields and upload an image");
    return;
  }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", Info.name);
      formData.append("dec", Info.dec);
      formData.append("image", Info.image);
      

      await axios.post(
        `https://backendlaravel.cupital.xyz/api/post/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showSnackbar("Post Edited successfully");
      navigate("/dashboard/MyPost");
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  function resetForm() {
  setInfo({ name: "", dec: "", image: null });
  if (fileInputRef.current) {
    fileInputRef.current.value = null; 
  }
}

  return (
    
    
    <div
      style={{
        height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
        backgroundColor:"white",
        padding: "20px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Card */}
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#f7f5f5ff",
          padding: "32px",
          boxSizing: "border-box",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* title */}
        <h2 style={{ marginBottom: "28px", fontWeight: 600 }}>
          Edit Post
        </h2>

        
        <div
          style={{
            display: "flex",
            gap: "40px",
            alignItems: "flex-start",
          }}
        >
          {/* input */}
          <div style={{ width: "50%" }}>
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Title</label>
              <input
                type="text"
                value={Info.name}
                onChange={(e) =>
                  setInfo({ ...Info, name: e.target.value })
                }
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Dec</label>
              <textarea
                rows={5}
                value={Info.dec}
                onChange={(e) =>
                  setInfo({ ...Info, dec: e.target.value })
                }
                style={textareaStyle}
              />
            </div>
          </div>

          {/* image */}
          <div style={{ width: "45%" }}>
            <label style={labelStyle}>Image</label>
            <label style={uploadBoxStyle} >
              <CloudUploadIcon sx={{ fontSize: 42 }} />
              <span style={{ marginTop: "10px" }}>
                {Info.image ? Info.image.name : "Upload image"}
              </span>
              <input
                type="file"
                hidden
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) =>
                  setInfo({ ...Info, image: e.target.files[0] })
                }
              />
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ marginTop: "36px", display: "flex", gap: "14px" }}>
          <Button
            onClick={Edit}
            disabled={loading}
            sx={{
              textTransform: "none",
              backgroundColor: "#f59e0b",
              color: "#000",
              px: 3,
              "&:hover": { backgroundColor: "#e08e0b" },
            }}
          >
            {loading ? "Update..." : "Update"}
          </Button>

          <Button
            onClick={resetForm}
            sx={{
              textTransform: "none",
              color: "black",
              border: "1px solid #333",
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ===== styles ===== */

const labelStyle = {
  fontSize: "14px",
  color: "black",
};

const inputStyle = {
  width: "100%",
  marginTop: "8px",
  padding: "12px",
  borderRadius: "8px",
  border:"none",
  backgroundColor: "white",
  color: "black",
  outline: "none",
};

const textareaStyle = {
  ...inputStyle,
  resize: "none",
};

const uploadBoxStyle = {
  marginTop: "8px",
  height: "180px",
  border: "1px dashed #333",
  backgroundColor:"black",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  color: "#eee",
};
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "./SnackbarContext";
import { useTheme } from "@mui/material/styles";

const APPBAR_HEIGHT = 60;

export default function CreatePost() {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [Info, setInfo] = useState({
    name: "",
    dec: "",
    image: null,
  });

  
  const [imagePreview, setImagePreview] = useState(null);

  const { showSnackbar } = useSnackbar();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  //create post
  async function Create() {
    if (!Info.name || !Info.dec || !Info.image) {
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
        "https://backendlaravel.cupital.xyz/api/post",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showSnackbar("Post created successfully");
      navigate("/dashboard/MyPost");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  //no scrol inside component
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  //to change image and dont put empty information
  function resetForm() {
    setInfo({ name: "", dec: "", image: null });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    navigate("/dashboard/MyPost");
  }

  //=======UI======
  return (
    <div
      style={{
        height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        padding: "20px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: theme.palette.mode === "dark" ? "#111" : "#f7f5f5ff",
          padding: "32px",
          boxSizing: "border-box",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2 style={{ marginBottom: "28px", fontWeight: 600 }}>
          Create Post
        </h2>

        <div style={{ display: "flex", gap: "40px" }}>
          {/* inputs */}
          <div style={{ width: "50%" }}>
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Title*</label>
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
              <label style={labelStyle}>Dec*</label>
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

            <label style={uploadBoxStyle}>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                  }}
                />
              ) : (
                <>
                  <CloudUploadIcon sx={{ fontSize: 42 }} />
                  <span style={{ marginTop: "10px" }}>
                    Upload image
                  </span>
                </>
              )}

              <input
                type="file"
                hidden
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  setInfo({ ...Info, image: file });
                  setImagePreview(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>
        </div>

        <div style={{ marginTop: "36px", display: "flex", gap: "14px" }}>
          <Button
            onClick={Create}
            disabled={loading}
            sx={{
              textTransform: "none",
              backgroundColor: "#f59e0b",
              px: 3,
              "&:hover": { backgroundColor: "#e08e0b" },
              color: theme.palette.text.primary,
            }}
          >
            {loading ? "Creating..." : "Create"}
          </Button>

          <Button
            onClick={resetForm}
            sx={{
              textTransform: "none",
              border: "1px solid #333",
              color: theme.palette.text.primary,
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
};

const inputStyle = {
  width: "100%",
  marginTop: "8px",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
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
  backgroundColor: "black",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  color: "#eee",
};
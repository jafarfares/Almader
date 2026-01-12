//Edit page

//MUI
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTheme } from "@mui/material/styles";
//Context
import { useSnackbar } from "./SnackbarContext";
//react rauter
import { useNavigate, useParams } from "react-router-dom";
//react
import { useState, useEffect, useRef } from "react";
//axios
import axios from "axios";

const APPBAR_HEIGHT = 60;

export default function EditPost() {

  //theme dark or light
  const theme = useTheme();
  //loading
  const [loading, setLoading] = useState(false);

  const [Info, setInfo] = useState({
    name: "",
    dec: "",
    image: null,
  });
  
  //for show image
  const [imagePreview, setImagePreview] = useState(null);
  //Context
  const { showSnackbar } = useSnackbar();
  //post id
  const { id } = useParams();
  //useRef
  const fileInputRef = useRef(null);
  //navigate to another path
  const navigate = useNavigate();
  //fatch token
  const token = localStorage.getItem("token");

  /* ===== GET POST ===== */
  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await axios.get(
          `https://backendlaravel.cupital.xyz/api/post/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const post = res.data.payload;

        setInfo({
          name: post.name,
          dec: post.dec,
          image: null,
        });

        setImagePreview(post.image_url);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPost();
  }, [id]);

  /* ===== EDIT ===== */
  async function Edit() {
    setLoading(true);
    try {
      const formData = new FormData();

      if (Info.name.trim()) formData.append("name", Info.name);
      if (Info.dec.trim()) formData.append("dec", Info.dec);
      if (Info.image) formData.append("image", Info.image);

      await axios.post(
        `https://backendlaravel.cupital.xyz/api/post/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
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

  //======UI=======
  return (
    <div
      style={{
        height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "32px",
          borderRadius: "16px",
          display: "flex",
          backgroundColor: theme.palette.mode === "dark" ? "#111" : "#f7f5f5ff",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Head */}
        <h2 style={{ marginBottom: "28px", fontWeight: 600 }}>
          Edit Post
        </h2>

        <div style={{ display: "flex", gap: "40px" }}>
          {/* inputs */}
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
                  <span>Upload image</span>
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

          {/* Edit Button */}
          <Button
            onClick={Edit}
            disabled={loading}
            sx={{
              textTransform: "none",
              px: 3,
              backgroundColor: "#f59e0b",
              color:"white"
            }}
          >
            {loading ? "Update..." : "Update"}
          </Button>
          
          {/* Cancel Button */}
          <Button
            onClick={() => navigate("/dashboard/MyPost")}
            sx={{
              textTransform: "none",
              color: theme.palette.text.primary,
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
};

const inputStyle = {
  width: "100%",
  marginTop: "8px",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
};

const textareaStyle = {
  ...inputStyle,
  resize: "none",
};

const uploadBoxStyle = {
  marginTop: "8px",
  height: "180px",
  border: "1px dashed",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

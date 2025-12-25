import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyPost() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getInfo() {
      try {
        const res = await axios.get(
          "https://backendlaravel.cupital.xyz/api/post/myposts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        
        console.log(res.data);

        setPosts(res.data.payload.data);
      } catch (error) {
        console.log("error", error);
      }
    }

    getInfo();
  }, []);

  return (
    <>
      <Button
        onClick={() => navigate("/dashboard/CreatePost")}
        sx={{
          mb: 2,
          textTransform: "none",
          color: "black",
          backgroundColor: "#e9e5e5ff",
        }}
      >
        Create Post
      </Button>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: "10px",
          width: "100%",
          padding: "15px",
        }}
      >
        {posts.map((post) => (
          <Box
            key={post.id}
            sx={{
              backgroundColor: "#fff",
              border: "1px solid #e6e6e6",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* image */}
            <Box
              component="img"
              src={post.image_url}
              sx={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                backgroundColor: "#ddd",
              }}
            />

            {/* content */}
            <Box sx={{ padding: "18px" }}>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 600,
                  marginBottom: "10px",
                }}
              >
                {post.name}
              </Typography>

              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#555",
                }}
              >
                {post.dec}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}

import { Box, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ResponsiveDialog from "./ResponsiveDialog";
import { useTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;

export default function MyPost() {
  const theme = useTheme();
  const [posts, setPosts] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [dialogOpenId, setDialogOpenId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getInfo() {
      try {
        const res = await axios.get(
          "https://backendlaravel.cupital.xyz/api/post/myposts",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPosts(res.data.payload.data);
      } catch (error) {
        console.log("error", error);
      }
    }
    getInfo();
  }, []);

  // menu
  const handleMenuOpen = (event, postId) => {
    event.currentTarget.dataset.id = postId;
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  // dialog
  const handleDialogOpen = (postId) => {
    setDialogOpenId(postId);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setDialogOpenId(null);
  };

  // remove post from UI
  const handlePostDeleted = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  return (
    <div style={{ width: "98%", padding: "15px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div />
        <Button
          component={NavLink}
          to="/dashboard/CreatePost"
          sx={{
            mb: 2,
            textTransform: "none",
            color: "black",
            backgroundColor: "#e9e5e5ff",
            marginRight: "21px",
          }}
        >
          Create Post
        </Button>
      </div>

      {posts.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            padding: "15px",
            backgroundColor: theme.palette.mode === "dark" ? "#282828" : "rgba(245, 239, 239, 0.55)",
            borderRadius: "10px",
          }}
        >
          {posts.map((post) => {
            const openMenu =
              Boolean(menuAnchor) &&
              menuAnchor.dataset.id == post.id;

            return (
              <Box
                key={post.id}
                sx={{
                  flex: "1 1 300px",
                  maxWidth: "33%",
                  backgroundColor: theme.palette.mode === "dark" ? "#000" : "white",
                  padding: "5px",
                  borderRadius: "5px",
                  position: "relative",
                }}
              >
                <IconButton
                  onClick={(e) => handleMenuOpen(e, post.id)}
                >
                  <MoreVertIcon />
                </IconButton>

                <Menu
                  anchorEl={menuAnchor}
                  open={openMenu}
                  onClose={handleMenuClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  }}
                >
                  <MenuItem
                    component={NavLink}
                    to={`/dashboard/EditPost/${post.id}`}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleDialogOpen(post.id)}
                  >
                    Delete
                  </MenuItem>
                </Menu>

                <ResponsiveDialog
                  open={dialogOpenId === post.id}
                  onClose={handleDialogClose}
                  postId={post.id}
                  onDeleted={handlePostDeleted}
                />

                <Box
                  component="img"
                  src={post.image_url}
                  sx={{
                    width: "100%",
                    height: "300px",
                    borderRadius: "5px",
                    backgroundColor: "#ddd",
                  }}
                />

                <Box sx={{ padding: "18px" }}>
                  <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                    {post.name}
                  </Typography>
                  <Typography sx={{ fontSize: "14px", color: "#555" }}>
                    {post.dec}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </div>
  );
}

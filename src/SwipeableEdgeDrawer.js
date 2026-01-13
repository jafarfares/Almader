import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import OutlinedInput from "@mui/material/OutlinedInput";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";

const drawerBleeding = 56;

/* ================= Styles ================= */
const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: theme.palette.mode === "dark" ? "#121212" : grey[100],
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff",
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "dark" ? "#444" : grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

/* ================= Component ================= */
export default function SwipeableEdgeDrawer({ open, onOpen, onClose, postId }) {
  const theme = useTheme();
  const [commentss, setCommentess] = useState({ context: "" });
  const [getComments, setGetComments] = useState([]);

  /* Menu state */
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const token = localStorage.getItem("token");

  const handleMenuOpen = (event, commentId) => {
    setAnchorEl(event.currentTarget);
    setSelectedCommentId(commentId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!open || !postId) return;

    const getCommentsFunc = async () => {
      try {
        const res = await axios.get(
          `https://backendlaravel.cupital.xyz/api/post/${postId}/get-comment`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setGetComments(res.data.payload.data);
      } catch (err) {
        console.log("Error fetching comments:", err);
      }
    };

    getCommentsFunc();
  }, [open, postId]);

  const addComment = async (postId) => {
    if (!commentss.context.trim()) return;

    try {
      await axios.post(
        `https://backendlaravel.cupital.xyz/api/post/${postId}/comment`,
        { context: commentss.context },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setCommentess({ context: "" });

      const res = await axios.get(
        `https://backendlaravel.cupital.xyz/api/post/${postId}/get-comment`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setGetComments(res.data.payload.data);
    } catch (err) {
      console.log("Error adding comment:", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!commentId) return;
    if (!token) {
      alert("You must be logged in to delete comments");
      return;
    }

    try {
      await axios.delete(
        `https://backendlaravel.cupital.xyz/api/post/${commentId}/delete-comment`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setGetComments((prev) => prev.filter((c) => c.id !== commentId));
      //if the comment delete you must remove id 
      setSelectedCommentId(null);
      handleMenuClose();
    } catch (err) {
      console.log("Error deleting comment:", err);
    }
  };

  async function UpdatedComments(commentId){
    if (!commentss.context.trim()) return;
    try{
      const res =await axios.put(`https://backendlaravel.cupital.xyz/api/post/${commentId}/update-comment`,{
        context:commentss.context
      },{
        headers:{Authorization:`Bearer ${token}`}
      });
      //edit the comment
      setGetComments((e=>e.map(c=>c.id===selectedCommentId ? {...c,context:commentss.context}:c)));
      setCommentess({context:""});
      setSelectedCommentId(null);
      console.log("res",res);
    }catch(err){
      console.log("error",err);
    }
  }

  const handleClose = () => {
    setGetComments([]);
    onClose();
  };

  //to fatch the comment that we want edit
  const handleEditClick = (comment) => {
  setCommentess({ context: comment.context });
  setSelectedCommentId(comment.id);          
  handleMenuClose();                  
  };



  const handleSend = () => {
  if (!commentss.context.trim()) return;

  //Edit
  if (selectedCommentId) {
    UpdatedComments(selectedCommentId);
  }
  //Add
  else {
    addComment(postId);
  }
};

  return (
    <Root>
      <CssBaseline />

      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(80% - ${drawerBleeding}px)`,
            overflow: "visible",
            width: "84%",
            marginLeft: "204px",
            backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff",
          },
        }}
      />

      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={handleClose}
        onOpen={onOpen}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        keepMounted
      >
        {/* Header */}
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: theme.palette.text.secondary }}>
            Comments
          </Typography>
        </StyledBox>

        {/* Content */}
        <StyledBox
          sx={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          {/* Comments List */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {getComments.map((comment) => (
              <Box
                key={comment.id}
                sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}
              >
                <Avatar
                  src={comment.profile_image?.url}
                  sx={{ width: 36, height: 36 }}
                />

                {/* Comment Bubble */}
                <Box
                  sx={{
                    position: "relative",
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#2f2e2e" : "#fff",
                    borderRadius: "10px",
                    padding: "6px 32px 6px 10px",
                    maxWidth: "70%",
                    "&:hover .comment-actions": {
                      opacity: 1,
                    },
                  }}
                >
                  {/* More button */}
                  <IconButton
                    size="small"
                    className="comment-actions"
                    onClick={(e) => handleMenuOpen(e, comment.id)}
                    sx={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      opacity: 0,
                      transition: "0.2s",
                      color: theme.palette.mode === "dark" ? "#aaa" : "#666",
                    }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>

                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "14px",
                      mb: 0.5,
                      color: theme.palette.mode === "dark" ? "#eee" : "inherit",
                    }}
                  >
                    {comment.profile_name}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: theme.palette.mode === "dark" ? "#eee" : "inherit",
                    }}
                  >
                    {comment.context}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Input Area */}
          <Box
            sx={{
              p: 1.5,
              borderTop: "1px solid",
              borderColor: theme.palette.mode === "dark" ? "#333" : "#eee",
              backgroundColor:
                theme.palette.mode === "dark" ? "#1a1a1a" : "#fff",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <OutlinedInput
              fullWidth
              placeholder=" write comment..."
              sx={{
                borderRadius: "20px",
                backgroundColor:
                  theme.palette.mode === "dark" ? "#2a2a2a" : "#fafafa",
                color: theme.palette.mode === "dark" ? "#eee" : "inherit",
              }}
              value={commentss.context}
              onChange={(e) =>
                setCommentess({ ...commentss, context: e.target.value })
              }
            />

            <IconButton
              onClick={handleSend}
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                width: 44,
                height: 44,
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </StyledBox>
      </SwipeableDrawer>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            minWidth: 140,
          },
        }}
      >
        <MenuItem onClick={() => handleEditClick(getComments.find(c => c.id === selectedCommentId))}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => handleDeleteComment(selectedCommentId)}
          sx={{ color: "error.main" }}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Root>
  );
}

SwipeableEdgeDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};

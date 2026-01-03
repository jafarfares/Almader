import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "./SnackbarContext";
import axios from "axios";

export default function ResponsiveDialog({ open, onClose, postId, onDeleted }) {
  const theme = useTheme();
  const { showSnackbar } = useSnackbar();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const token = localStorage.getItem("token");

  async function DeletePost() {
    try {
      await axios.delete(
        `https://backendlaravel.cupital.xyz/api/post/${postId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      showSnackbar("Post deleted successfully");
      onDeleted(postId); 
      onClose(); 
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Delete Post?
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove this post?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button sx={{color:"black",textTransform:"none"}} onClick={onClose}>Cancel</Button>
        <Button sx={{color:"red",textTransform:"none"}} onClick={DeletePost} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

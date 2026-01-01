import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function CustomizedSnackbars({ open, setOpen, message }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{mt:12}}
    >
        
      <Alert sx={{
        width: "250px",        
        minHeight: "40px",     
        fontSize: "15px",
        display: "flex",
        alignItems: "center",
        backgroundColor:"white",
        color:"black",
        boxShadow:"0px 0px 10px rgba(31, 153, 39, 0.1)",
        "& .MuiAlert-icon": {
         color: "green",             
        },
       }} 
        severity="success" variant="filled" onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
    
  );
}

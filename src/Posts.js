import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useState,useEffect } from "react";
import axios from "axios";

export default function Posts() {
  const [allPosts,setAllPosts]=useState([]);
  useEffect(()=>{
    async function fetchPosts(){
        try{
          const res=await axios.get("https://backendlaravel.cupital.xyz/api/post")
          setAllPosts(res.data.payload.data);
        }catch(err){
          console.error("Error fetching posts:",err);
        }
    }
    fetchPosts();
  },[])
  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f5f6fa",
        minHeight: "100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        gap:"20px"
      }}
    >
      {/* POST CARD */}
      {allPosts.map((post) => (
      <div
        key={post.id}
        style={{
          width: "620px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          padding: "20px",
          //marginLeft:"150px"
        }}
      >
        {/* ===== HEADER (USER INFO) ===== */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          {/* USER IMAGE */}
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="user"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              marginRight: "12px",
            }}
          />

          {/* USER NAME + ROLE */}
          <div>
            <div style={{ fontWeight: "600" }}>
              X_AE_A_13 {/* ← post.user.name */}
            </div>
            <div style={{ fontSize: "13px", color: "#777" }}>
              {post.name} {/* ← post.user.role */}
            </div>
          </div>
        </div>

        {/* ===== DESCRIPTION ===== */}
        <div
          style={{
            fontSize: "14px",
            color: "#444",
            marginBottom: "14px",
            lineHeight: "1.6",
          }}
        >
          {post.dec}
        </div>

        {/* ===== POST IMAGE ===== */}
        <img
          src={post.image_url}
          alt=""
          style={{
            width: "100%",
            height: "300px",
            //objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "14px",
          }}
        />

        {/* ===== ACTIONS ===== */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
            color: "#555",
          }}
        >
          {/* LEFT ACTIONS */}
          <div style={{ display: "flex", gap: "18px" }}>
            <span style={{ display: "flex", gap: "6px", cursor: "pointer" }}>
              <FavoriteBorderIcon fontSize="small" />
              12 {/* post.likes */}
            </span>

            <span style={{ display: "flex", gap: "6px", cursor: "pointer" }}>
              <ChatBubbleOutlineIcon fontSize="small" />
              25 {/* post.comments.length */}
            </span>

            <ShareOutlinedIcon fontSize="small" style={{ cursor: "pointer" }} />
          </div>

          {/* RIGHT ACTION */}
          <BookmarkBorderIcon fontSize="small" style={{ cursor: "pointer" }} />
        </div>

        {/* ===== COMMENT INPUT ===== */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderTop: "1px solid #eee",
            paddingTop: "12px",
            gap: "10px",
          }}
        >
          {/* COMMENT USER IMAGE */}
          <img
            src="https://i.pravatar.cc/150?img=8"
            alt="me"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
            }}
          />

          {/* COMMENT INPUT */}
          <input
            placeholder="اكتب تعليقك..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "14px",
            }}
          />
        </div>
      </div>))}
    </div>
  );
}

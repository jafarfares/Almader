import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import SwipeableEdgeDrawer from "./SwipeableEdgeDrawer";
import { useTheme } from "@mui/material/styles";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Posts() {
   const theme = useTheme();
  const [allPosts, setAllPosts] = useState([]);

  //send postId
  const [selectedPostId, setSelectedPostId] = useState(null);

  const token = localStorage.getItem("token");

  //comment
  const [openComments, setOpenComments] = useState(false);

  // GET POSTS + TOTAL LIKES
  useEffect(() => {
    async function fetchPosts() {
      try {
        // fatch posts
        const res = await axios.get(
          "https://backendlaravel.cupital.xyz/api/post",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const posts = res.data.payload.data;

        // fatch total likes for each post
        const postsWithLikes = await Promise.all(
          posts.map(async (post) => {
            try {
              const likeRes = await axios.get(
                `https://backendlaravel.cupital.xyz/api/like/total/${post.id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              //Take a copy of each post and add the number of likes to it.
              return {
                ...post,
                total_likes: likeRes.data.total_likes,
              };
            } catch {
              return {
                ...post,
                total_likes: 0,
              };
            }
          })
        );

        setAllPosts(postsWithLikes);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    }

    fetchPosts();
  }, [token]);

  //like
  // async function Like(postId) {
  //   try {
  //     const res = await axios.post(
  //       `https://backendlaravel.cupital.xyz/api/like/${postId}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     setAllPosts((prev) =>
  //       prev.map((post) =>
  //         post.id === postId
  //           ? {
  //               ...post,
  //               total_likes: res.data.total_likes,
  //               is_liked: true,
  //             }
  //           : post
  //       )
  //     );
  //   } catch (error) {
  //     console.log("Error Like:", error);
  //   }
  // }




  async function Like(postId) {
  try {
    await axios.post(
      `https://backendlaravel.cupital.xyz/api/like/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAllPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              total_likes: (post.total_likes ?? 0) + 1,
              is_liked: true,
            }
          : post
      )
    );
  } catch (error) {
    console.log("Error Like:", error);
  }
}


  //unlike
  // async function unLike(postId) {
  //   try {
  //     const res = await axios.post(
  //       `https://backendlaravel.cupital.xyz/api/unlike/${postId}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     setAllPosts((prev) =>
  //       prev.map((post) =>
  //         post.id === postId
  //           ? {
  //               ...post,
  //               total_likes: res.data.total_likes,
  //               is_liked: false,
  //             }
  //           : post
  //       )
  //     );
  //   } catch (error) {
  //     console.log("Error Unlike:", error);
  //   }
  // }




async function unLike(postId) {
  try {
    await axios.post(
      `https://backendlaravel.cupital.xyz/api/unlike/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAllPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              total_likes: Math.max((post.total_likes ?? 1) - 1, 0),
              is_liked: false,
            }
          : post
      )
    );
  } catch (error) {
    console.log("Error Unlike:", error);
  }
}







  //UI
  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: theme.palette.mode === "dark" ? "#141414":"#f5f6fa",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {allPosts.map((post) => (
        <div
          key={post.id}
          style={{
            width: "620px",
            backgroundColor: theme.palette.mode === "dark" ? "#000":"#f5f6fa",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            padding: "20px",
            maxWidth:"500px"
          }}
        >
          {/* HEADER */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <img
              src={post.profile_image}
              alt="user"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                marginRight: "12px",
              }}
            />
            <div>
              <div style={{ fontWeight: "600" }}>{post.profile_name}</div>
            </div>
          </div>

          {/* DESCRIPTION */}
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

          {/* IMAGE */}
          <img
            src={post.image_url}
            alt=""
            style={{
              width: "100%",
              height: "300px",
              borderRadius: "10px",
              marginBottom: "14px",
            }}
          />

          {/* ACTIONS */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <div style={{ display: "flex", gap: "18px" }}>
              <span style={{ display: "flex", gap: "6px", cursor: "pointer" }}>
                <FavoriteBorderIcon
                  onClick={() =>
                    post.is_liked ? unLike(post.id) : Like(post.id)
                  }
                  style={{ color: post.is_liked ? "red" : "" }}
                  fontSize="small"
                />
                {/* total likes */}
                {post.total_likes}
              </span>
              
              {/* Comment */}
              <span
                style={{ display: "flex", gap: "6px", cursor: "pointer" }}
                //whan click set post.id and open Drawer
                onClick={() => {
                  setSelectedPostId(post.id);
                  setOpenComments(true);
                }}
              >
                <CommentIcon />
              </span>

            </div>

            
          </div>
        </div>
      ))}

      {/* Drawer */}
      <SwipeableEdgeDrawer
        open={openComments}
        onOpen={() => setOpenComments(true)}
        onClose={() => {setOpenComments(false);setSelectedPostId(null);}}

        //this is post.id send to Drawer to fetch comments and know which post to comment on
        postId={selectedPostId}
      />
    </div>
  );
}

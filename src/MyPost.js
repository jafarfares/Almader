
// import { Box, Typography } from "@mui/material";
// import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import {useEffect,useState} from "react";
// import axios from "axios";
// const data = [
//   {
//     title: "Proprietary vs. Open-Source: How to Choose the Right CMS",
//     author: "By Eric Karkovack",
//     description:
//       "We explain the differences between the two types of systems. The goal is to give you the information you need to make the right choice.",
//   },
//   {
//     title: "When Chaos Invades: Keeping Your Freelance Business Going During a Crisis",
//     author: "By Eric Karkovack",
//     description:
//       "I share thoughts on balancing life and business during chaotic times. I'm learning as I go, but here's the good, bad, and ugly of it all.",
//   },
//   {
//     title: "The 50 Best Free Icon Fonts for UI Design",
//     author: "By Paul Andrew",
//     description:
//       "We have a collection of the best icon fonts that you can freely download and use in your next mobile app or web design projects.",
//   },
//   {
//     title: "The 50 Best Free Icon Fonts for UI Design",
//     author: "By Paul Andrew",
//     description:
//       "We have a collection of the best icon fonts that you can freely download and use in your next mobile app or web design projects.",
//   },
// ];

// export default function MyPost() {

//     const navigate=useNavigate();

//     const [getPost,setGetPost]=useState({image:"",name:"",dec:""})

//     //token
//     const token=localStorage.getItem("token")

//     useEffect(()=>{
//       async function getInfo(){
//         try{
//           const res=await axios.get("https://backendlaravel.cupital.xyz/api/post/myposts",{
//             headers:{
//               Authorization:`Bearer ${token}`
//             }
//           });
//           setGetPost({
//             image:res.payload.data.image_url,
//             name:res.payload.data.name,
//             dec:res.payload.data.dec
//           })

//         }catch(error){
//           console.log("error",error)
//         }
//       }
//       getInfo();
//     },[])

//   return (
//     <>
//     <Button onClick={()=>navigate("/dashboard/CreatePost")} style={{marginBottom:"10px",textTransform:"none",color:"black",backgroundColor:"#e9e5e5ff"}}>Create Post</Button>
//     <Box
//       sx={{
//         display: "grid",
//         gridTemplateColumns: {
//           xs: "1fr",
//           md: "repeat(2, 1fr)",
//           lg: "repeat(3, 1fr)",
//         },
//         gap: "5px",
//         width: "100%",
//         backgroundColor:"#000",
//         padding:"15px"
//       }}
//     >
//       {/* {data.map((item, index) => ( */}
//         <Box
//           // key={index}
//           sx={{
//             backgroundColor: "#fff",
//             border: "1px solid #e6e6e6",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           {/* image */}
//           <Box
//           component="img"
//           // src="/photo_2025-10-26_20-57-16.jpg"
//           // alt={item.title}
//           src={getPost.image}
//             sx={{
//               width: "100%",
//               height: "200px",
//               objectFit: "cover",
//               backgroundColor: "#ddd",
//             }}
//           />

//           {/* content */}
//           <Box sx={{ padding: "18px" }}>
//             <Typography
//               sx={{
//                 fontSize: "18px",
//                 fontWeight: 600,
//                 lineHeight: 1.35,
//                 color: "#2c3e50",
//                 marginBottom: "10px",
//               }}
//             >
//               {getPost.name}
//             </Typography>

//             <Typography
//               sx={{
//                 fontSize: "13px",
//                 color: "#7f8c8d",
//                 marginBottom: "12px",
//               }}
//             >
//               {/* {item.author} */}
//             </Typography>

//             <Typography
//               sx={{
//                 fontSize: "14px",
//                 color: "#555",
//                 lineHeight: 1.7,
//               }}
//             >
//               {/* {item.description} */}
//               {getPost.dec}
//             </Typography>
//           </Box>
//         </Box>
//       {/* ))} */}
//     </Box>
//     </>
//   );
// }





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

        // تأكد من شكل البيانات
        console.log(res.data);

        setPosts(res.data.payload.data); // غالبًا data داخل data

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

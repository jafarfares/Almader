// import TextField from '@mui/material/TextField';
// import { Button } from '@mui/material';
// import { useState } from 'react';
// import axios from "axios";
// export default function CreatePost(){

//     const [loading,setLoading]=useState(false)
//     const [Info,setInfo]=useState({name:"",dac:"",image:""})
//     //You must place the token in a variable
//     const token=localStorage.getItem("token");
//     async function Create(){
//         setLoading(true)
//         try{
//            const res=await axios.post("https://backendlaravel.cupital.xyz/api/post",{
//             name:Info.name,
//             dec:Info.dec,
//             image:Info.image_url,
//            },{
//             headers:{Authorization:`Bearer ${token}`}
//            })
//           console.log(Info.name)
//           console.log(Info.dec)
//           console.log(Info.image)
//         }catch(error){
//         console.log("error",error)
//         }finally{
//           setLoading(false)
//         }
//     }

//     return(
//         <div style={{width:"100%",height:"85vh"}}>
//         <div style={{width:"100%",height:"100%",backgroundColor:"#eae2e2ff",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"10px"}}>
//             <TextField value={Info.name}  onChange={(e)=>setInfo({...Info,name:e.target.value})} id="outlined-basic" label="Name" variant="outlined" />
//             <TextField value={Info.dec}   onChange={(e)=>setInfo({...Info,dac:e.target.value})} id="outlined-basic" label="Dec" variant="outlined" />
//             <TextField value={Info.image} onChange={(e)=>setInfo({...Info,image:e.target.value})} id="outlined-basic" label="image" variant="outlined" />
//             <Button onClick={Create} style={{textTransform:"none",marginTop:"10px",backgroundColor:"#bdb5b5ff",color:'#000'}}>Create</Button>
//         </div>
//         </div>
//     )
// }




import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import axios from "axios";

export default function CreatePost() {
  const [loading, setLoading] = useState(false);
  const [Info, setInfo] = useState({ name: "", dec: "", image: null });

  const token = localStorage.getItem("token");

  async function Create() {
    setLoading(true);
    try {
      // إذا تريد إرسال الصورة كملف، يجب استخدام FormData
      const formData = new FormData();
      formData.append("name", Info.name);
      formData.append("dec", Info.dec);
      formData.append("image", Info.image);

      const res = await axios.post(
        "https://backendlaravel.cupital.xyz/api/post",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", 
          },
        }
      );

      console.log("Post created:", res.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ width: "100%", height: "85vh" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#eae2e2ff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <TextField
          value={Info.name}
          onChange={(e) => setInfo({ ...Info, name: e.target.value })}
          label="Name"
          variant="outlined"
        />
        <TextField
          value={Info.dec}
          onChange={(e) => setInfo({ ...Info, dec: e.target.value })}
          label="Dec"
          variant="outlined"
        />

        {/* زر اختيار الملف */}
        <Button
          variant="contained"
          component="label"
          style={{ textTransform: "none" }}
        >
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setInfo({ ...Info, image: e.target.files[0] })}
          />
        </Button>

        {/* معاينة اسم الملف */}
        {Info.image && <p>Selected file: {Info.image.name}</p>}

        <Button
          onClick={Create}
          disabled={loading}
          style={{
            textTransform: "none",
            marginTop: "10px",
            backgroundColor: "#bdb5b5ff",
            color: "#000",
          }}
        >
          {loading ? "Creating..." : "Create"}
        </Button>
      </div>
    </div>
  );
}

import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export function DeleteVideo(){

    const [video,setVideo] = useState([{title:null,id:null,url:null}])

    const params = useParams()
    const navigate = useNavigate()

    function LoadVideo(){
        axios.get(`http://localhost:3366/videos/${params.id}`)
        .then((res)=>{
            setVideo(res.data)
        })
    }

    function handleOkClick(){
        axios.delete(`http://localhost:3366/videos/${params.id}`)
        .then(()=>{
            console.log(Deleted)
        })
        alert("video deleted")
        navigate("/admin-dashboard")
    }

    function handleNoClick(){
        navigate("/admin-dashboard")
    }

    useEffect(()=>{
        LoadVideo()
    },[])

    return(
        <div className="container-fluid w-50 bg-white text-dark p-2 m-1 rounded">
            <div className="alert alert-dismissible alert-danger p-2 d-flex justify-content-between align-items-center">
               <div><h3>{video.title}</h3></div>
               <div>
                <iframe src={video.url} height="100" width="150"></iframe>
               </div>
                <div>
                    <button onClick={handleOkClick} className="btn btn-danger">Ok</button>
                    <button onClick={handleNoClick} className="btn btn-warning mx-2">No</button>
                </div>
            </div>
        </div>
    )
}
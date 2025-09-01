import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";




export function UserDashboard(){
 
    const [videoDetails, setVideoDetails] = useState([{id:null,title:null,description:null,url:null,likes:null,dislikes:null,views:null,comments:null}])
    const [searchText,setSearchText] = useState(null)

    function handleNameChange(e){
        setSearchText(e.target.value)
    }

    useEffect(()=>{
        axios.get("http://localhost:3366/videos")
        .then(res=>{
            setVideoDetails(res.data)
        })
    },[])

    var filterProducts = videoDetails.filter(video=>
        video.title?.toLowerCase().match(searchText || "")
    )

    return(
        <div className="container-fluid">
            <div className="d-flex justify-content-between p-3 bg-white m-2 text-dark">
                <div className="fs-4 fw-bold">User Dashboard -  <Link to="/user-login">Back</Link></div>
                <div>
                    <div  className="input-group">
                        <input type="text" className="form-control" name="search" onChange={handleNameChange} />
                        <button className="bi bi-search btn btn-warning"></button>
                    </div>
                </div>
                <div>
                   <button className="bi bi-tag-fill btn btn-warning"></button>
                </div>
            </div>
            <div style={{height:"500px"}} className="d-flex flex-wrap">
                {
                    filterProducts.map(video=>
                        <div className="card m-1" style={{width:"300px"}}>
                    <iframe src={video.url} className="card-img-top" height="200"></iframe>
                    <div className="card-header"><h4>{video.title}</h4></div>
                    <div className="card-body">
                        <dl>
                            <dt>Description</dt>
                            <dd>{video.description}</dd>
                            <dt>Comments</dt>
                            <dd>{video.comments}</dd>
                        </dl>
                    </div>
                    <div className="card-footer text-center">
                        <span className="bi bi-heart">{video.likes}</span>
                        <span className="bi bi-hand-thumbs-down mx-3">{video.dislikes}</span>
                        <span className="bi bi-eye">{video.views}</span>
                        <div>
                            <button className="btn btn-secondary w-100 bi bi-tag">Save</button>
                        </div>
                    </div>
                </div>
                    )
                }
            </div>
        </div>
    )
}
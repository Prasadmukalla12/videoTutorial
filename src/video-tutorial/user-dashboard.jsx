import { Box, Button, ButtonGroup, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FavoriteBorderOutlined, RemoveRedEyeOutlined, SaveAltOutlined, ThumbDownAltOutlined } from "@mui/icons-material";
import { useDispatch , useSelector } from "react-redux";
import { addToWatchLater, removeFromWatchLater } from "../slicers/slicer"; 




export function UserDashboard(){
 
    const [videoDetails, setVideoDetails] = useState([{id:null,title:null,description:null,url:null,likes:null,dislikes:null,views:null,comments:null}])
    const [searchText,setSearchText] = useState("")
    const [sortItem,setSortItem] = useState("")
    const [categoryFilter,setCategoryFilter] = useState("")

    const videosCount = useSelector(state => state.videosCount);
    const AllVideos = useSelector(state=>state.videos)


    const dispatch = useDispatch();

    function handleSaveClick(video){
        dispatch(addToWatchLater(video));
    }

    function handleDeleteClick(id){
        dispatch(removeFromWatchLater(id))
    }


    function handleNameChange(e){
        setSearchText(e.target.value)
    }

    function handleSortChange(e){
        setSortItem(e.target.value)
    }

    function handleCategoryChange(e){
        setCategoryFilter(e.target.value)
    }

    useEffect(()=>{
        axios.get("http://localhost:3366/videos")
        .then(res=>{
            setVideoDetails(res.data)
        })
    },[])

    function filterProducts(){

       let data = [...videoDetails]

       if(sortItem==="likes"){
          data.sort((first,sec)=>sec.likes - first.likes)
       }

       if(sortItem==="views"){
        data.sort((fir,sec)=>sec.views - fir.views)
       }

       if(categoryFilter!==""){
        data = data.filter(item=>item.category_id===parseInt(categoryFilter))
       }

       if(searchText!==""){
          data = data.filter(item => 
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.description.toLowerCase().includes(searchText.toLowerCase())
          )

       }

       return data;

    }

    const filterVideos = filterProducts()

    return(
        <div className="container-fluid">
            <div className="d-flex justify-content-between p-3 bg-white m-2 text-dark">
                <div className="fs-4 fw-bold">User Dashboard -  <Link to="/user-login">Back</Link></div>
                <div className="d-flex justify-content-evenly">
                    <div >
                        <input type="text" className="form-control" placeholder="Search by name" name="search" onChange={handleNameChange} />
                    </div>
                <div className="mx-2">
                    <select className="form-select" value={sortItem} onChange={handleSortChange}>
                        <option value="">Sort by</option>
                        <option value="views">By Views</option>
                        <option value="likes">By Likes</option>
                    </select>
                </div>
                <div>
                    <select className="form-select" value={categoryFilter} onChange={handleCategoryChange}>
                        <option value="">All Categories</option>
                        <option value="1">React</option>
                        <option value="2">Java</option>
                        <option value="3">Python</option>
                    </select>
                </div>
                </div>
                <div>
                   <button data-bs-toggle="offcanvas" data-bs-target="#slide" className="bi bi-tag-fill btn btn-warning position-relative"><span className="badge position-absolute bg-danger rounded rounded-4">{videosCount}</span></button>
                   <div className="offcanvas offcanvas-end" id="slide">
                    <div className="offcanvas-header d-flex justify-content-between">
                    
                            <span className="fs-4 fw-bold">Saved Videos</span>
                            <span className="float-end"><button className="btn btn-close" data-bs-dismiss="offcanvas"></button></span>

                    </div>
                    <div className="offcanvas-body">
                        {
                            AllVideos.length>0 ? (
                                    <table className="table table-hover table-bordered table-success text-center align-middle">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Preview</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                               AllVideos.map(video=>
                                                <tr key={video.id}>
                                                    <td>{video.title}</td>
                                                    <td><iframe src={video.url} height="80" width="120"></iframe></td>
                                                    <td ><button onClick={()=>{handleDeleteClick(video.id)}} className="bi bi-trash btn btn-danger"></button></td>
                                                </tr>
                                               )
                                            }
                                        </tbody>
                                    </table>
                            ) : (<p className="fs-4 fw-bold">No videos Found</p>)
                        }
                    </div>
                   </div>
                </div>
            </div>
            <div style={{height:"500px"}} className="d-flex flex-wrap">
                {
                    filterVideos.length>0 ? (
                        filterVideos.map(video=>
                        <Card className="p-2 m-1 bg-dark text-white" key={video.id} sx={{width:"400px"}} >
                            <CardMedia component="iframe" src={video.url} height="200" />
                            <CardHeader title={video.title} />
                            <CardActionArea>
                                <CardContent sx={{height:"80px"}}>
                                    <Typography><span className="fw-bold">Description</span> - {video.description}</Typography>
                                    <Typography><span className="fw-bold">Comments</span> -{video.comments}</Typography>
                                </CardContent>
                            </CardActionArea>
                               <CardActions>
                                <ButtonGroup sx={{ "& .MuiButton-root": { fontWeight: "bold" } }} color="inherit"  fullWidth variant="outlined">
                                  <Button><FavoriteBorderOutlined/>{video.likes}</Button>
                                  <Button><ThumbDownAltOutlined/>{video.dislikes}</Button>
                                  <Button><RemoveRedEyeOutlined/>{video.views}</Button>
                               </ButtonGroup>
                               </CardActions>
                            <CardActions>
                                <Button onClick={()=>{handleSaveClick(video)}} color="error" variant="contained" fullWidth >{<SaveAltOutlined/>}Watch-Later</Button>
                            </CardActions>
                        </Card>
                    )
                    ) : 
                    (
                       <div className="p-4 text-center w-100 text-warning" style={{height:"100px"}}>
                        <Typography sx={{fontWeight:"bold", fontSize:"25px"}}>No Videos Found!</Typography>
                       </div>
                    )
                }
            </div>
        </div>
    )
}
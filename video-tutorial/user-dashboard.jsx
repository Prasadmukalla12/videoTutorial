import { Button, ButtonGroup, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FavoriteBorderOutlined, RemoveRedEyeOutlined, SaveAltOutlined, ThumbDownAltOutlined } from "@mui/icons-material";




export function UserDashboard(){
 
    const [videoDetails, setVideoDetails] = useState([{id:null,title:null,description:null,url:null,likes:null,dislikes:null,views:null,comments:null}])
    const [searchText,setSearchText] = useState("")
    const [sortItem,setSortItem] = useState("")
    const [categoryFilter,setCategoryFilter] = useState("")

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
                   <button className="bi bi-tag-fill btn btn-warning"></button>
                </div>
            </div>
            <div style={{height:"500px"}} className="d-flex flex-wrap">
                {
                    filterProducts().map(video=>
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
                                <ButtonGroup sx={{ "& .MuiButton-root": { fontWeight: "bold" } }} color="success"  fullWidth variant="outlined">
                                  <Button><FavoriteBorderOutlined/>{video.likes}</Button>
                                  <Button><ThumbDownAltOutlined/>{video.dislikes}</Button>
                                  <Button><RemoveRedEyeOutlined/>{video.views}</Button>
                               </ButtonGroup>
                               </CardActions>
                            <CardActions>
                                <Button color="error" variant="contained" fullWidth >{<SaveAltOutlined/>}Watch-Later</Button>
                            </CardActions>
                        </Card>
                    )
                }
            </div>
        </div>
    )
}
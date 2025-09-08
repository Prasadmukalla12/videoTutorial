import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import * as yup from "yup"



export function EditVideo(){

    const [categories,setCategory] = useState([])

    const navigate = useNavigate()

    const params = useParams()

    const [video,setVideo] = useState([{id:null,title:null,description:null,url:null,likes:null,dislikes:null,comments:null,views:null,category_id:null}])

    const formik = useFormik({
        initialValues : {
            title:video.title,
            description:video.description,
            url:video.url,
            likes:video.likes,
            dislikes:video.dislikes,
            comments:video.comments,
            views:video.views,
            category_id:video.category_id
        },
        onSubmit:(data)=>{
            var values = {
                title:data.title,
                url:data.url,
                description:data.description,
                likes:parseInt(data.likes),
                dislikes:parseInt(data.dislikes),
                views:parseInt(data.views),
                comments:data.comments,
                category_id:parseInt(data.category_id)
            }
            axios.put(`http://localhost:3366/videos/${params.id}`,values)
            .then(()=>{
                console.log("video updated")
            })
            alert("video uploaded successfully")
            navigate("/admin-dashboard")
        },
        enableReinitialize : true,
        validationSchema : yup.object({
                    title : yup.string().required("Title required"),
                    description : yup.string().required("Description required"),
                    url: yup.string().required("URL required"),
                    likes : yup.string().required("Likes required"),
                    dislikes:yup.string().required("Dislikes required"),
                    comments:yup.string().required("Comments required"),
                    views:yup.string().required("Views required"),
                    category_id : yup.string().required("category required")
                })
    })

    function LoadCategories(){

        axios.get("http://localhost:3366/categories")
        .then(response=>{
            setCategory(response.data)
        })
    }

    function LoadVideo(){
        axios.get(`http://localhost:3366/videos/${params.id}`)
        .then(response=>{
            setVideo(response.data)
        })
    }

    useEffect(()=>{
        LoadCategories()
        LoadVideo()
    },[])


    return(
        <div className="container-fluid bg-white text-dark p-3">
            <h3>Edit video</h3>
            <form onSubmit={formik.handleSubmit} className="w-50">
                <dl className="row">
                    <dt className="col-3">Title</dt>
                    <dd className="col-3"><span><input type="text" value={formik.values.title} onChange={formik.handleChange} name="title" className="form-control" /></span><span className="text-danger fw-bold">{formik.errors.title}</span></dd>
                    <dt className="col-3">Description</dt>
                    <dd className="col-3"><span><input type="text" value={formik.values.description} onChange={formik.handleChange} name="description" className="form-control" /></span><span className="text-danger fw-bold">{formik.errors.description}</span></dd>
                    <dt className="col-3">URL</dt>
                    <dd className="col-3"><span><input type="text" value={formik.values.url} onChange={formik.handleChange} name="url" className="form-control" /></span><span className="text-danger fw-bold">{formik.errors.url}</span></dd>
                    <dt className="col-3">Likes</dt>
                    <dd className="col-3"><span><input  type="number" value={formik.values.likes} onChange={formik.handleChange} name="likes" className="form-control" /></span><span className="text-danger fw-bold">{formik.errors.likes}</span></dd>
                    <dt className="col-3">Dislikes</dt>
                    <dd className="col-3"><span><input  type="number" value={formik.values.dislikes} onChange={formik.handleChange} name="dislikes" className="form-control" /></span><span className="text-danger fw-bold">{formik.errors.dislikes}</span></dd>
                    <dt className="col-3">Comments</dt>
                    <dd className="col-3"><span><input  type="text" value={formik.values.comments} onChange={formik.handleChange} name="comments" className="form-control" /></span><span className="text-danger fw-bold">{formik.errors.comments}</span></dd>
                    <dt className="col-3">Views</dt>
                    <dd className="col-3"><span><input type="number" value={formik.values.views} onChange={formik.handleChange} name="views" className="form-control" /></span><span className="text-danger fw-bold">{formik.errors.views}</span></dd>
                    <dt className="col-3">Category</dt>
                    <dd className="col-3">
                        <span>
                            <select name="category_id" value={formik.values.category_id} onChange={formik.handleChange} className="form-select" >
                            <option value="">Select Category</option>
                            {
                               categories.map(item=>
                                <option key={item.category_id} value={item.category_id}>{item.category_name}</option>
                               )
                            }
                        </select>
                        </span>
                        <span className="text-danger fw-bold">{formik.errors.category_id}</span>
                        
                    </dd>
                </dl>
                <button type="submit" className="btn btn-success">save</button>
                <Link to="/admin-dashboard" className="btn btn-warning mx-2">Cancel</Link>
            </form>
        </div>
    )
}
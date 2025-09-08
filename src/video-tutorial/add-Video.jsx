import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import * as yup from "yup"



 export function AddVideo(){

    const[category,setCategory] = useState([])
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues : {
            title :"",
            description :"",
            url:"",
            likes:"",
            dislikes:"",
            comments:"",
            views:"",
            category_id:""
        },
        onSubmit : (values)=>{
            var AllValues ={
                 title :values.title,
                 description :values.description,
                 url:values.url,
                 likes:parseInt(values.likes),
                 dislikes:parseInt(values.dislikes),
                 comments:values.comments,
                 views:parseInt(values.views),
                 category_id:parseInt(values.category_id)
            }
            axios.post("http://127.0.0.1:3366/videos",AllValues)
            .then(()=>{
                alert("video added")
                navigate("/admin-dashboard")
            })
        },
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

    useEffect(()=>{
        axios.get("http://127.0.0.1:3366/categories")
        .then(response=>{
            setCategory(response.data)
        })
    },[])

    function handleCancelClick(){
        navigate("/admin-dashboard")
    }

    

    return(
        <div className="container-fluid text-black bg-white p-3">
            <form onSubmit={formik.handleSubmit}>
                <dl className="row">
                    <dt className="col-3">Title</dt>
                    <dd className="col-3"><span><input onChange={formik.handleChange} type="text" name="title" className="form-control" /></span><span className="text-danger fw-bold">{formik.errors.title}</span></dd>
                    <dt className="col-3">Description</dt>
                    <dd className="col-3"><span><input onChange={formik.handleChange} type="text" name="description" className="form-control" /></span><span className="text-danger fw-bold">{formik.errors.description}</span></dd>
                    <dt className="col-3">URL</dt>
                    <dd className="col-3"><span><input onChange={formik.handleChange} type="text" name="url" className="form-control" /></span><span className="text-danger fw-bold">{formik.errors.url}</span></dd>
                    <dt className="col-3">Likes</dt>
                    <dd className="col-3"><span><input onChange={formik.handleChange} type="number" name="likes" className="form-control" /></span><span className="text-danger fw-bold">{formik.errors.likes}</span></dd>
                    <dt className="col-3">Dislikes</dt>
                    <dd className="col-3"><span><input onChange={formik.handleChange} type="number" name="dislikes" className="form-control" /></span><span className="text-danger fw-bold">{formik.errors.dislikes}</span></dd>
                    <dt className="col-3">Comments</dt>
                    <dd className="col-3"><span><input onChange={formik.handleChange} type="text" name="comments" className="form-control" /></span><span className="text-danger fw-bold">{formik.errors.comments}</span></dd>
                    <dt className="col-3">Views</dt>
                    <dd className="col-3"><span><input onChange={formik.handleChange} type="number" name="views" className="form-control" /></span><span className="text-danger fw-bold">{formik.errors.views}</span></dd>
                    <dt className="col-3">Category</dt>
                    <dd className="col-3">
                        <span><select name="category_id" className="form-select" onChange={formik.handleChange}>
                            <option value="">Select Category</option>
                            {
                               category.map(item=>
                                <option key={item.category_id} value={item.category_id}>{item.category_name}</option>
                               )
                            }
                        </select></span>
                        <span className="text-danger fw-bold">{formik.errors.category_id}</span>
                    </dd>
                </dl>
                <button type="submit" className="btn btn-success">Add</button>
            </form>
            <button onClick={handleCancelClick} className="btn btn-warning my-2">Cancel</button>
        </div>
    )
 }
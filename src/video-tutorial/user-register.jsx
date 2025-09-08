import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup"




export function UserRegister(){

    const navigate = useNavigate()
    const [msg,setMsg] = useState(null)
    const[format,setFormat] = useState(null)

    const formik = useFormik({
        initialValues:{
            user_id:"",
            user_name:"",
            password:"",
            email:""
        },
        onSubmit:(details)=>{
            axios.post("http://localhost:3366/users",details)
            .then(()=>{
                console.log("registered")
            })
            alert("user Registered")
            navigate("/user-login")
        },
        validationSchema : yup.object({
            user_id : yup.string().required("UserId required"),
            user_name : yup.string().required("userName required"),
            password : yup.string().required("Password required"),
            email : yup.string().required("Email required")
        })
    })

    function handleVerifyUser(e){
        axios.get("http://localhost:3366/users")
        .then(res=>{
            for(var user of res.data){
                if(user.user_id===e.target.value){
                    setMsg("User Taken - Try Another")
                    setFormat("text-danger")
                    break;
                }else{
                    setMsg("User Available")
                    setFormat("text-success")
                }
            }
        })
    }


    return(
        <div className="container-fluid">
            <h3>UserLogin</h3>
            <form onSubmit={formik.handleSubmit} className="w-25 p-2">
                <dl>
                    <dt>UserId</dt>
                    <dd><input onKeyUp={handleVerifyUser} onChange={formik.handleChange} type="text" name="user_id" className="form-control" /></dd>
                    <dd className={format} style={{fontWeight:"bold"}}>{msg}</dd>
                    <dt>UserName</dt>
                    <dd><input onChange={formik.handleChange} type="text" name="user_name" className="form-control" /></dd>
                    <dd className="text-danger fw-bold">{formik.errors.user_name}</dd>
                    <dt>Password</dt>
                    <dd><input onChange={formik.handleChange} type="password" name="password" className="form-control" /></dd>
                    <dd className="text-danger fw-bold">{formik.errors.password}</dd>
                    <dt>Email</dt>
                    <dd><input onChange={formik.handleChange} type="email" name="email" className="form-control" /></dd>
                    <dd className="text-danger fw-bold">{formik.errors.email}</dd>
                </dl>
                <div>
                    <button type="submit" className="btn btn-success my-2">Register</button>
                </div>
                <div>
                    <Link to="/user-login">Exist User</Link>
                </div>
            </form>
        </div>
    )
}
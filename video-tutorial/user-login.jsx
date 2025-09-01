import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup"



export function UserLogin(){

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues:{
            user_id : "",
            password:""
        },
        onSubmit : (author)=>{
           axios.get("http://localhost:3366/users")
           .then(response=>{
            var result = response.data.find(item=> item.user_id===author.user_id)
             if(result){
                 if(result.password===author.password){
                    navigate("/user-dashboard")
                 }else{
                    alert("Invalid password")
                 }
              }else{
                alert("Invalid userId")
              }
           })
            
        },
        validationSchema : yup.object({
            user_id : yup.string().required("userId required"),
            password : yup.string().required("password required")
        })
    })


    return(
        <div className="container-fluid">
            <h3>UserLogin</h3>
            <form onSubmit={formik.handleSubmit} className="w-25 p-2">
                <dl>
                    <dt>UserId</dt>
                    <dd><input onChange={formik.handleChange} type="text" name="user_id" className="form-control" /></dd>
                    <dd className="text-danger fw-bold">{formik.errors.user_id}</dd>
                    <dt>Password</dt>
                    <dd><input onChange={formik.handleChange} type="password" name="password" className="form-control" /></dd>
                    <dd className="text-danger fw-bold">{formik.errors.password}</dd>
                </dl>
                <button type="submit" className="btn btn-success my-2">Login</button>
                <div>
                    <Link to="/user-register">Register</Link>
                </div>
            </form>
        </div>
    )
}
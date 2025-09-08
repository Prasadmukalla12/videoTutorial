import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup"



export function AdminLogin(){

  const navigate = useNavigate()

  const [cookies,setCookie,removeCookie] = useCookies(['admin_id'])

  const formik = useFormik({
    initialValues : {
        admin_id : "",
        password:""
    },
    onSubmit : (admin)=>{
          axios.get("http://127.0.0.1:3366/admin")
          .then(response=>{
            var adminUser = response.data.find(item=>item.admin_id===admin.adminName)
            if(adminUser){
                setCookie("admin_id",adminUser.admin_id, {expires:new Date('2025-10-29')})
                if(admin.password===adminUser.password){
                    navigate("/admin-dashboard")
                }else{
                    alert("Password is not match")
                }
            }else{
                alert("Invalid admin user")
            }
          })
    },
    validationSchema : yup.object({
        adminName : yup.string().required("Admin required"),
        password : yup.string().required("Password Required")
    })
  })


    return(
        <div className="container-fluid w-25 mt-4">
            <div><h3>Admin Login</h3></div>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>UserName</dt>
                    <dd><input onChange={formik.handleChange} type="text" name="adminName" className="form-control" /></dd>
                    <dd className="fw-bold text-danger">{formik.errors.adminName}</dd>
                    <dt>Password</dt>
                    <dd><input onChange={formik.handleChange} type="text" name="password" className="form-control" /></dd>
                    <dd className="fw-bold text-danger">{formik.errors.password}</dd>
                </dl>
                <div>
                    <button type="submit" className="btn btn-secondary">Login</button>
                    <Link to="/" className="btn btn-warning mx-3">Cancel</Link>
                </div>
            </form>
        </div>
    )
}
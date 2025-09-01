import { Link } from "react-router-dom";


  export function VideoTutorialHome(){


    return(

        <div className="container-fluid">
            <div className="d-flex justify-content-center align-items-center" style={{height:"500px"}}>
                <div>
                    <Link to="/admin" className="btn btn-success">Admin</Link>
                    <Link to="/user-login" className="btn btn-primary mx-3">User</Link>
                </div>
            </div>
        </div>
    )
  }
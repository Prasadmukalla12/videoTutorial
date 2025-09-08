
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import "./VideoTutorialIndex.css"
import { VideoTutorialHome } from "./videotutorilahome"
import { AdminLogin } from "./adminLogin"
import { AdminDashboard } from "./admin-dashboard"
import { AddVideo } from "./add-Video"
import { EditVideo } from "./editVideo"
import { DeleteVideo } from "./deleteVideo"
import { UserLogin } from "./user-login"
import { UserRegister } from "./user-register"
import { UserDashboard } from "./user-dashboard"

    export function VideoTutorialIndex(){


        return(
            <div className="container-fluid bg text-white">
                <BrowserRouter>
                  <header className=" p-2">
                    <div className="text-center">
                        <div><span className="fs-3">Video Tutorial</span><Link to="/" className="bi bi-house fs-3"></Link></div>
                        <div>[React | Java | Python]</div>
                    </div>
                  </header>
                  <section>
                    <Routes>
                        <Route path="/" element={<VideoTutorialHome />} />
                        <Route path="admin" element={<AdminLogin />} />
                        <Route path="admin-dashboard" element={<AdminDashboard />}>
                        <Route path="add-video" element={<AddVideo />} />
                        <Route path="edit-video/:id" element={<EditVideo />} />
                        <Route path="delete-video/:id" element={<DeleteVideo />} />
                        </Route>
                        <Route path="user-login" element={<UserLogin />} />
                        <Route path="user-register" element={<UserRegister />} />
                        <Route path="user-dashboard" element={<UserDashboard />} />
                    </Routes>
                  </section>
                </BrowserRouter>
            </div>
        )
    }
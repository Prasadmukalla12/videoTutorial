import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Link, Outlet, useNavigate } from "react-router-dom"

export function AdminDashboard() {

    const [details, setDetails] = useState([])
    const [cookies, setCookie , removeCookie] = useCookies(["admin_id"])
    const [sortOption, setSortOption] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [searchQuery,setSearchQuery] = useState("")

    const navigate = useNavigate()

    function signoutClick() {
        removeCookie('admin_id')
        navigate("/admin")
    }

    function loadVideos() {
        axios.get("http://127.0.0.1:3366/videos")
            .then(response => {
                setDetails(response.data)
            })
    }

    useEffect(() => {
        if (cookies['admin_id'] === undefined) {
            navigate("/admin")
        } else {
            loadVideos()
        }
    }, [])

    function handleSortChange(e){
        setSortOption(e.target.value)
    }

    function handleSearchQuery(e){
        setSearchQuery(e.target.value)
    }

    function handleCategoryChange(e){
          setCategoryFilter(e.target.value)
    }

    function filterAndSort() {
        let data = [...details]

        if (sortOption === "likes") {
            data.sort((one, two) => two.likes - one.likes)
        }
        if (sortOption === "views") {
            data.sort((one, two) => two.views - one.views)
        }

        if(searchQuery!==""){
           data= data.filter(item=>item.title.toLowerCase().match(searchQuery.toLowerCase()))
        }

        if(categoryFilter!==""){
           data= data.filter(item=>item.category_id===parseInt(categoryFilter))
        }

        return data
    }

    return (
        <div className="container-fluid">
            <h3>Admin Dashboard</h3>

            <div>
                <Link to="add-video" className="btn btn-success">Add Video</Link>
                <button onClick={signoutClick} className="btn btn-link">Signout</button>
            </div>

            <div className="d-flex justify-content-between my-2 w-50">
                <select value={sortOption} onChange={handleSortChange} className="form-select">
                    <option value="">Sort By</option>
                    <option value="likes">Likes</option>
                    <option value="views">Views</option>
                </select>

                <select className="form-select mx-2" value={categoryFilter} onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    <option value="1">React</option>
                    <option value="2">Java</option>
                    <option value="3">Python</option>
                </select>

                <div className="input-group"><input type="text" className="form-control" value={searchQuery} placeholder="Search by name" onChange={handleSearchQuery} /></div>
            </div>

            <Outlet />

            <table className="table table-bordered table-dark">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Likes</th>
                        <th>Views</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filterAndSort().map(item =>
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td><iframe height="150" width="250" src={item.url}></iframe></td>
                                <td>{item.likes}</td>
                                <td>{item.views}</td>
                                <td>
                                    <Link to={`edit-video/${item.id}`} className="btn btn-warning">Edit</Link>
                                    <Link to={`delete-video/${item.id}`} className="btn btn-danger mx-2">Delete</Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

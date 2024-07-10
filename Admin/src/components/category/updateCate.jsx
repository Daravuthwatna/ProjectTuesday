import { Link, useParams } from "react-router-dom";
import Dashboard from "./dashboradCate";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../utils/navbar";
import Sidebar from "../utils/sidebar.jsx";
const UpdateCate = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    category_name: "",
    reg_dtime: "",
  });
  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/categories/getCategory/${id}`
      );
      const currentDate = new Date().toISOString().split("T")[0];
      setData({ ...response.data.result[0], reg_dtime: currentDate });
    } catch (error) {
      console.log("Get Error...", error);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/categories/updateCategory/${id}`,
        data
      );
      console.log("Update Successfully", response);
      toast.success("Updated Successfully!");
      setTimeout(() => window.location.replace("/category"), 1500);
    } catch (error) {
      console.log("Update Error", error);
    }
  };
  return (
    <div className="container-fluid vh-100 vw-100">
      <div className="row">
        <div className="container-fluid p-3">
          <div className="row">
            <Navbar />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-2">
              <Sidebar />
            </div>
            <div className="col-lg-10">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    <Dashboard />
                  </div>
                  <div className="col-lg-4 pt-4">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="category_name"
                          placeholder="Category Name"
                          value={data.category_name}
                          onChange={(e) =>
                            setData({ ...data, category_name: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="date"
                          className="form-control"
                          name="reg_dtime"
                          value={data.reg_dtime}
                          readOnly
                        />
                      </div>
                      <div className="form-group mt-3">
                        <button type="submit" className="btn btn-success m-3">
                          Update Category
                        </button>
                        <Link to="/category">
                          <button
                            type="button"
                            className="btn btn-secondary m-3"
                          >
                            Cancel
                          </button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <ToastContainer
                  position="bottom-right"
                  autoClose={1500}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateCate;

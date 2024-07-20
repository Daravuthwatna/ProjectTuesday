import { Link, useParams } from "react-router-dom";
import Navbar from "../utils/navbar.jsx";
import Sidebar from "../utils/sidebar.jsx";
import Dashboard from "./dashboardRequest.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateRequest = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    request_date: "",
    department: "",
    requester: "",
    remark: "",
    request_form: "",
    user: ""
  });
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchRequest = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/requests/getRequest/${id}`);
      const currentDate = new Date().toISOString().split("T")[0];
      setData({ ...response.data.result[0], request_date: currentDate });
    } catch (error) {
      console.log("Get Error...", error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/requests/user");
      setUsers(response.data.result);
    } catch (error) {
      console.log("Get Error User...", error);
    }
  };
  
  const fetchDepartment = async () => {
    try {
      const response = await axios.get("http://localhost:5000/requests/department");
      setDepartments(response.data.result);
    } catch (error) {
      console.log("Get Error department...", error);
    }
  };

  useEffect(() => {
    fetchRequest();
    fetchDepartment();
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/requests/updateRequest/${id}`, data);
      console.log("Update Successfully", response);
      toast.success("Updated Successfully!");
      setTimeout(() => window.location.replace("/request"), 1500);
    } catch (error) {
      console.log("Update Error...", error);
      toast.error("Update Failed!");
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
                  <div className="col-lg-9">
                    <Dashboard />
                  </div>
                  <div className="col-lg-3 pt-4">
                    <form onSubmit={handleSubmit}>
                      <input
                        type="date"
                        className="form-control"
                        name="request_date"
                        value={data.request_date}
                        readOnly
                      />
                      <div className="form-group mt-3">
                        <select
                          name="department"
                          className="form-control"
                          value={data.department}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Department</option>
                          {departments.map((dept) => (
                            <option key={dept.department_id} value={dept.department_id}>
                              {dept.department_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group mt-3">
                        <select
                          name="user"
                          className="form-control"
                          value={data.user}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select User</option>
                          {users.map((usr) => (
                            <option key={usr.user_id} value={usr.user_id}>
                              {usr.login_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Requester"
                          name="requester"
                          value={data.requester}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Remark"
                          name="remark"
                          value={data.remark}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group mt-3">
                        <textarea
                          name="request_form"
                          className="form-control"
                          placeholder="Request Form"
                          rows="4"
                          cols="50"
                          style={{ resize: "none" }}
                          value={data.request_form}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <div className="form-group mt-3">
                        <button type="submit" className="btn btn-success m-3">
                          Update Request
                        </button>
                        <Link to="/request">
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

export default UpdateRequest;

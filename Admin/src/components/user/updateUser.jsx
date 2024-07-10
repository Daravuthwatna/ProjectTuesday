import { Link, useParams } from "react-router-dom";
import Dashboard from "./dashboradUser.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../utils/navbar.jsx";
import Sidebar from "../utils/sidebar.jsx";

const UpdateUser = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    user_name: "",
    login_name: "",
    password: "",
    level: "",
    user_status: "",
    reg_dtime: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [positions, setPositions] = useState([]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/getUser/${id}`
      );
      const currentDate = new Date().toISOString().split("T")[0];
      setData({ ...response.data.result[0], reg_dtime: currentDate });
    } catch (error) {
      console.log("Get Error...", error);
    }
  };

  const fetchStatuses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users/statuses");
      setStatuses(response.data.result);
    } catch (error) {
      console.log("Error fetching statuses", error);
    }
  };

  const fetchPositions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users/positions");
      setPositions(response.data.result);
    } catch (error) {
      console.log("Error fetching positions", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/users/updateUser/${id}`,
        data
      );
      console.log("Update Successfully", response);
      toast.success("Updated Successfully!");
      setTimeout(() => window.location.replace("/user"), 1500);
    } catch (error) {
      console.log("Error updating user", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchPositions();
    fetchStatuses();
  }, [id]);

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
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="user_name"
                          placeholder="User Name"
                          value={data.user_name}
                          onChange={(e) =>
                            setData({ ...data, user_name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="login_name"
                          placeholder="Login Name"
                          value={data.login_name}
                          onChange={(e) =>
                            setData({ ...data, login_name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="form-group mt-3 position-relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          name="password"
                          placeholder="Password"
                          value={data.password}
                          onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                          }
                          readOnly
                        />
                        <span
                          className="position-absolute top-50 end-0 translate-middle-y me-3"
                          onClick={togglePasswordVisibility}
                          style={{ cursor: "pointer" }}
                        >
                          {showPassword ? (
                            <i className="fa-solid fa-eye-slash"></i>
                          ) : (
                            <i className="fa-solid fa-eye"></i>
                          )}
                        </span>
                      </div>
                      <div className="form-group mt-3">
                        <select
                          className="form-control"
                          name="level"
                          value={data.level}
                          onChange={(e) =>
                            setData({ ...data, level: e.target.value })
                          }
                          required
                        >
                          <option value="">Select Level</option>
                          {positions.map((position) => (
                            <option
                              key={position.position_id}
                              value={position.position_id}
                            >
                              {position.position_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group mt-3">
                        <select
                          className="form-control"
                          name="user_status"
                          value={data.user_status}
                          onChange={(e) =>
                            setData({ ...data, user_status: e.target.value })
                          }
                          required
                        >
                          <option value="">Select Status</option>
                          {statuses.map((status) => (
                            <option
                              key={status.status_id}
                              value={status.status_id}
                            >
                              {status.status}
                            </option>
                          ))}
                        </select>
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
                          Update User
                        </button>
                        <Link to="/user">
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

export default UpdateUser;

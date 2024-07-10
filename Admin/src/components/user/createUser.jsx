import { useEffect, useState } from "react";
import Dashboard from "./dashboradUser.jsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../utils/navbar.jsx";
import Sidebar from "../utils/sidebar.jsx";

const CreateUser = () => {
  const [value, setValue] = useState({
    user_name: "",
    login_name: "",
    password: "",
    confirm_password: "",
    level: "",
    user_status: "",
    reg_dtime: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [statuses, setStatuses] = useState([]);
  const [positions, setPositions] = useState([]);
  const [reg_dtime, setRegDtime] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
    if (name === "password" || name === "confirm_password") {
      setPasswordMatch(
        name === "password"
          ? value === value.confirm_password
          : value === value.password
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.password !== value.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/users/addUser",
        value
      );
      console.log("Added successfully...", response);
      toast.success("Added Successfully!");
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.log("Add Error...", error);
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

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setRegDtime(currentDate);
    setValue((prevValue) => ({ ...prevValue, reg_dtime: currentDate }));
    fetchPositions();
    fetchStatuses();
  }, []);

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
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="login_name"
                          placeholder="Login Name"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group mt-3 position-relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          name="password"
                          placeholder="Password"
                          onChange={handleInputChange}
                          required
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
                      <div className="form-group mt-3 position-relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          name="confirm_password"
                          placeholder="Confirm Password"
                          onChange={handleInputChange}
                          required
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
                      {!passwordMatch && (
                        <div className="text-danger mt-2"></div>
                      )}
                      <div className="form-group mt-3">
                        <select
                          className="form-control"
                          name="level"
                          onChange={handleInputChange}
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
                          value={value.user_status}
                          onChange={handleInputChange}
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
                          type="hidden"
                          className="form-control"
                          name="reg_dtime"
                          value={reg_dtime}
                          onChange={(e) => setRegDtime(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <button type="submit" className="btn btn-primary">
                          Create User
                        </button>
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

export default CreateUser;

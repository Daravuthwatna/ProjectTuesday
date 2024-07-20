import { useEffect, useState } from "react";
import Navbar from "../utils/navbar.jsx";
import Sidebar from "../utils/sidebar.jsx";
import Dashboard from "./dashboardRequest.jsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateRequest = () => {
  const [request, setRequest] = useState({
    request_date: "",
    department_id: "",
    requester: "",
    remark: "",
    request_form: "",
    user_id: "",
  });

  const [requestDetail, setRequestDetail] = useState({
    item_id: "",
    quantity: "",
    request_id: "",
  });

  const [department, setDepartment] = useState([]);
  const [user, setUser] = useState([]);
  const [item, setItem] = useState([]);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setRequest((prevValue) => ({ ...prevValue, request_date: currentDate }));
    fetchDepartment();
    fetchUser();
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const response = await axios.get("http://localhost:5000/requests/item");
      setItem(response.data.result);
    } catch (error) {
      console.log("Error fetching Item", error);
      toast.error("Failed to fetch items.");
    }
  };

  const fetchDepartment = async () => {
    try {
      const response = await axios.get("http://localhost:5000/requests/department");
      setDepartment(response.data.result);
    } catch (error) {
      console.log("Error fetching departments", error);
      toast.error("Failed to fetch departments.");
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/requests/user");
      setUser(response.data.result);
    } catch (error) {
      console.log("Error fetching user data", error);
      toast.error("Failed to fetch users.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setRequestDetail((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseRequest = await axios.post(
        "http://localhost:5000/requests/addRequest",
        request
      );
      console.log("Request added successfully...", responseRequest);

      const requestID = responseRequest.data.request_id; // Assuming the request ID is returned in the response

      const responseDetail = await axios.post(
        "http://localhost:5000/requests/addRequestDetail",
        { ...requestDetail, request_id: requestID }
      );
      console.log("Request detail added successfully...", responseDetail);

      toast.success("Request and Detail Added Successfully!");
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.log("Add Error...", error);
      toast.error("Failed to add request and details.");
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
                        type="hidden"
                        name="request_date"
                        value={request.request_date}
                      />
                      <div className="form-group mt-3">
                        <select
                          name="department_id"
                          className="form-control"
                          value={request.department_id}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Department</option>
                          {department.map((dept) => (
                            <option key={dept.department_id} value={dept.department_id}>
                              {dept.department_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group mt-3">
                        <select
                          name="user_id"
                          onChange={handleChange}
                          className="form-control"
                          value={request.user_id}
                          required
                        >
                          <option value="">Select User</option>
                          {user.map((usr) => (
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
                          value={request.requester}
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
                          value={request.remark}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group mt-3">
                        <textarea
                          name="request_form"
                          className="form-control"
                          placeholder="Request Form"
                          value={request.request_form}
                          onChange={handleChange}
                          rows="4"
                          cols="50"
                          style={{ resize: "none" }}
                        ></textarea>
                      </div>
                      <hr />
                      <input
                        type="number"
                        className="form-control mt-3"
                        placeholder="Quantity"
                        name="quantity"
                        value={requestDetail.quantity}
                        onChange={handleDetailChange}
                        required
                      />
                      <div className="form-group mt-3">
                        <select
                          name="item_id"
                          className="form-control"
                          value={requestDetail.item_id}
                          onChange={handleDetailChange}
                          required
                        >
                          <option value="">Select Item</option>
                          {item.map((itm) => (
                            <option key={itm.item_id} value={itm.item_id}>
                              {itm.item_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group mt-3">
                        <button type="submit" className="btn btn-primary mb-2">
                          Add Request and Details
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

export default CreateRequest;

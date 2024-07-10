import { useEffect, useState } from "react";
import Navbar from "../utils/navbar.jsx";
import Sidebar from "../utils/sidebar.jsx";
import Dashboard from "./dashboradItem.jsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateItem = () => {
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState([]);
  const [regDtime, setRegDtime] = useState("");
  const [value, setValue] = useState({
    item_name: "",
    unit: "",
    quantity: "",
    price: "",
    description: "",
    status_id: "",
    category_id: "",
    reg_dtime: "",
  });

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/items/categories"
      );
      setCategory(response.data.result);
    } catch (error) {
      console.log("Error Fetching Category", error);
    }
  };

  const fetchStatus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/items/statuses");
      setStatus(response.data.result);
    } catch (error) {
      console.log("Error Fetching Status", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/items/addItem",
        value
      );
      console.log("Added successfully...", response);
      toast.success("Added Successfully!");
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.log("Add Error...", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setRegDtime(currentDate);
    setValue((prevValue) => ({ ...prevValue, reg_dtime: currentDate }));
    fetchCategory();
    fetchStatus();
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
                          name="item_name"
                          placeholder="Item Name"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="number"
                          className="form-control"
                          name="quantity"
                          onChange={handleChange}
                          placeholder="Quantity"
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="number"
                          className="form-control"
                          name="price"
                          placeholder="Price Per One"
                          step="0.01"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <select
                          className="form-control"
                          name="unit"
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Unit</option>
                          <option value="1">Cans</option>
                          <option value="2">Bottle</option>
                          <option value="3">Liter</option>
                          <option value="4">Kilogram</option>
                        </select>
                      </div>
                      <div className="form-group mt-3">
                        <select
                          className="form-control"
                          name="status_id"
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Status</option>
                          {status.map((status) => (
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
                        <select
                          className="form-control"
                          name="category_id"
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Category</option>
                          {category.map((category) => (
                            <option
                              key={category.category_id}
                              value={category.category_id}
                            >
                              {category.category_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group mt-3">
                        <textarea
                          name="description"
                          className="form-control"
                          placeholder="Description"
                          rows="4"
                          cols="50"
                          style={{ resize: "none" }}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="hidden"
                          className="form-control"
                          name="reg_dtime"
                          value={regDtime}
                          readOnly
                        />
                      </div>
                      <div className="form-group mt-3">
                        <button type="submit" className="btn btn-primary">
                          Create Item
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
  );
};

export default CreateItem;

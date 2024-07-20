import { useEffect, useState } from "react";
import Navbar from "../utils/navbar";
import Sidebar from "../utils/sidebar";
import Dashboard from "./dashboradItem.jsx";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateItem = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    item_name: "",
    unit: "",
    quantity: "",
    price: "",
    description: "",
    status: "",
    category: "",
    reg_dtime: "",
  });
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState([]);

  const fetchItem = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/items/getItem/${id}`
      );
      const currentDate = new Date().toISOString().split("T")[0];
      setData({ ...response.data.result[0], reg_dtime: currentDate });
    } catch (error) {
      console.log("Get Error...", error);
    }
  };

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

  useEffect(() => {
    fetchItem();
    fetchCategory();
    fetchStatus();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/items/updateItem/${id}`,
        data
      );
      console.log("Update Successfully", response);
      toast.success("Updated Successfully!");
      setTimeout(() => window.location.replace("/item"), 1500);
    } catch (error) {
      console.log("Update Error...", error);
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
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="item_name"
                          placeholder="Item Name"
                          value={data.item_name}
                          onChange={(e) =>
                            setData({ ...data, item_name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="number"
                          className="form-control"
                          name="quantity"
                          value={data.quantity}
                          onChange={(e) =>
                            setData({ ...data, quantity: e.target.value })
                          }
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
                          value={data.price}
                          onChange={(e) =>
                            setData({ ...data, price: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <select
                          className="form-control"
                          name="unit"
                          value={data.unit}
                          onChange={(e) =>
                            setData({ ...data, unit: e.target.value })
                          }
                          required
                        >
                          <option value="">Select Unit</option>
                          <option value="1">Can</option>
                          <option value="2">Bottle</option>
                          <option value="3">Liter</option>
                          <option value="4">Kilogram</option>
                          <option value="5">Pice</option>
                        </select>
                      </div>
                      <div className="form-group mt-3">
                        <select
                          className="form-control"
                          name="status"
                          value={data.status}
                          onChange={(e) =>
                            setData({ ...data, status: e.target.value })
                          }
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
                          name="category"
                          value={data.category}
                          onChange={(e) =>
                            setData({ ...data, category: e.target.value })
                          }
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
                          value={data.description}
                          onChange={(e) =>
                            setData({ ...data, description: e.target.value })
                          }
                          style={{ resize: "none" }}
                          required
                        ></textarea>
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
                          Update Item
                        </button>
                        <Link to="/item">
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

export default UpdateItem;

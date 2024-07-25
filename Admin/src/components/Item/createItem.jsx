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
  const [item, setItem] = useState({
    item_name: "",
    unit: "",
    quantity: "",
    price: "",
    description: "",
    status_id: "",
    category_id: "",
    reg_dtime: "",
  });

  const [stock, setStock] = useState({
    stock_date: "",
    item_id: "",
    old_qty: "",
    new_qty: "",
    reg_dtime: "",
  });

  const fetchCategory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/items/categories");
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
      const response = await axios.post("http://localhost:5000/stock/addItem", item);
      console.log("Item added successfully...", response);
      const itemID = response.data.item_id;
      const stockResponse = await axios.post("http://localhost:5000/stock/addStock", { ...stock, item_id: itemID });
      console.log("Stock added successfully...", stockResponse);
      toast.success("Item and Stock added Successfully!");
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.log("Add Error...", error);
      toast.error("Error adding item or stock!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleStockChange = (e) => {
    const { name, value } = e.target;
    if (name === "new_qty") {
      setItem((prevValue) => ({
        ...prevValue,
        quantity: value,
      }));
    }
    setStock((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setRegDtime(currentDate);
    setStock((prevValue) => ({ ...prevValue, stock_date: currentDate, reg_dtime: currentDate }));
    setItem((prevValue) => ({ ...prevValue, reg_dtime: currentDate }));
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
                          type="hidden"
                          className="form-control"
                          name="quantity"
                          value={item.quantity}
                          placeholder="Quantity"
                          readOnly
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="number"
                          className="form-control"
                          name="new_qty"
                          onChange={handleStockChange}
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
                          <option value="1">Can</option>
                          <option value="2">Bottle</option>
                          <option value="3">Liter</option>
                          <option value="4">Kilogram</option>
                          <option value="5">Piece</option>
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
                            <option key={status.status_id} value={status.status_id}>
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
                            <option key={category.category_id} value={category.category_id}>
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
                        ></textarea>
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="hidden"
                          className="form-control"
                          name="reg_dtime"
                          value={regDtime}
                        />
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="hidden"
                          className="form-control"
                          name="stock_date"
                          value={stock.stock_date}
                        />
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="hidden"
                          className="form-control"
                          name="reg_dtime"
                          value={stock.reg_dtime}
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

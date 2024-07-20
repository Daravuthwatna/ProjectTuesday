/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DashboardItem = () => {
  const [allItems, setAllItems] = useState([]);
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState([]);
  const [del_dtime, setDelDtime] = useState("");

  const fetchItem = async () => {
    try {
      const response = await axios.get("http://localhost:5000/items/allItem");
      setAllItems(response.data.result);
    } catch (error) {
      console.error("Error fetching Item:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/items/categories"
      );
      const statusMap = response.data.result.reduce((acc, category) => {
        acc[category.category_id] = category.category_name;
        return acc;
      }, {});
      setCategory(statusMap);
    } catch (error) {
      console.log("Error Fetching Category", error);
    }
  };

  const fetchStatus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/items/statuses");
      const statusMap = response.data.result.reduce((acc, status) => {
        acc[status.status_id] = status.status;
        return acc;
      }, {});
      setStatus(statusMap);
    } catch (error) {
      console.log("Error Fetching Status", error);
    }
  };

  const deleteItem = async (item_id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.put(`http://localhost:5000/items/deleteItem/${item_id}`, {
          del_dtime,
        });
        setAllItems((prevState) =>
          prevState.filter((item) => item.item_id !== item_id)
        );
      } catch (error) {
        console.log("Delete Error...", error);
      }
    }
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setDelDtime(currentDate);
    fetchCategory();
    fetchStatus();
    fetchItem();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <table className="table table-striped text-center">
          <thead className="thead-dark">
            <tr>
              <th>No</th>
              <th>Item Name</th>
              <th>Status</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price/One</th>
              <th>Total</th>
              {/* <th>Date</th> */}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allItems.length > 0 &&
              allItems.map((item, index) => (
                <tr key={item.item_id}>
                  <td>{index + 1}</td>
                  <td>{item.item_name}</td>
                  <td>{status[item.status] || "Unknown"}</td>
                  <td>{category[item.category] || "Unknown"}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price} $</td>
                  <td>{item.price * item.quantity} $</td>
                  {/* <td>{item.reg_dtime}</td> */}
                  <td>
                    <Link to={`/item/update/${item.item_id}`}>
                      <button className="btn btn-primary">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteItem(item.item_id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardItem;

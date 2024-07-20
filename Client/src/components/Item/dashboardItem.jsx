/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../utils/navbar.jsx";
import Sidebar from "../utils/sidebar.jsx";
import axios from "axios";

const dashboardItem = () => {
  const [allItems, setAllItems] = useState([]);
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState([]);

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

  useEffect(() => {
    fetchCategory();
    fetchStatus();
    fetchItem();
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
                  <div className="col-lg-8">
                    <div className="container-fluid">
                      <div className="row">
                        <table className="table table-striped text-center">
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Item Name</th>
                              <th>Status</th>
                              <th>Category</th>
                              <th colSpan={2}>Quantity</th>
                              <th colSpan={2}>Price/One</th>
                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allItems.length > 0 &&
                              allItems.map((item, index) => (
                                <tr key={item.item_id}>
                                  <td>{index + 1}</td>
                                  <td>{item.item_name}</td>
                                  <td>{status[item.status] || "Unknown"}</td>
                                  <td>
                                    {category[item.category] || "Unknown"}
                                  </td>
                                  <td colSpan={2}>{item.quantity}</td>
                                  <td colSpan={2}>{item.price} <span>$</span></td>
                                  <td>{item.reg_dtime}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 pt-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboardItem;

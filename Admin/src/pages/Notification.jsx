/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../components/utils/navbar";
import Sidebar from "../components/utils/sidebar";
import axios from "axios";

const Notification = () => {
  const [listRequest, setListRequest] = useState([]);
  const [users, setUsers] = useState([]);
  const [item, setItem] = useState([]);
  const fetchListRequest = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/requests/totalRequest"
      );
      setListRequest(response.data.result);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchItem = async () => {
    try {
      const response = await axios.get("http://localhost:5000/requests/item");
      const itemMap = response.data.result.reduce((acc, item) => {
        acc[item.item_id] = item.item_name;
        return acc;
      }, {});
      setItem(itemMap);
    } catch (error) {
      console.log("Error fetching Items", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/requests/user");
      const userMap = response.data.result.reduce((acc, user) => {
        acc[user.user_id] = user.user_name;
        return acc;
      }, {});
      setUsers(userMap);
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  };

  useEffect(() => {
    fetchListRequest();
    fetchUsers();
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
                  <div className="col-lg-12">
                    <div className="container-fluid">
                      <div className="row">
                        <table className="table table-striped text-center">
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>User</th>
                              <th>Requester</th>
                              <th>Item</th>
                              <th>QTY</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listRequest.map((request, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{request.requester}</td>
                                <td>{users[request.user]}</td>
                                <td>{item[request.item_id]}</td>
                                <td>{request.quantity}</td>
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

export default Notification;

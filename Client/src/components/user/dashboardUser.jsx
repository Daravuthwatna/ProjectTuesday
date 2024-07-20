/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../utils/navbar.jsx";
import Sidebar from "../utils/sidebar.jsx";

const dashboardUser = () => {
  const [allUser, setAllUser] = useState([]);
  const [statuses, setStatuses] = useState({});
  const [positions, setPositions] = useState({});

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/users/clientUser"
      );
      setAllUser(response.data.result);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchStatuses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users/statuses");
      const statusMap = response.data.result.reduce((acc, status) => {
        acc[status.status_id] = status.status;
        return acc;
      }, {});
      setStatuses(statusMap);
    } catch (error) {
      console.log("Error fetching statuses", error);
    }
  };

  const fetchPositions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users/positions");
      const positionMap = response.data.result.reduce((acc, position) => {
        acc[position.position_id] = position.position_name;
        return acc;
      }, {});
      setPositions(positionMap);
    } catch (error) {
      console.log("Error fetching positions", error);
    }
  };

  useEffect(() => {
    fetchPositions();
    fetchUsers();
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
                  <div className="col-lg-8">
                    <div className="container-fluid">
                      <div className="row">
                        <table className="table table-striped text-center">
                          <thead>
                            <tr>
                              <th>No</th>
                              <th colSpan={2}>User Name</th>
                              <th colSpan={2}>Login Name</th>
                              <th>Level</th>
                              <th colSpan={2}>Status</th>
                              <th>Registration Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allUser.length > 0 &&
                              allUser.map((user, index) => (
                                <tr key={user.user_id}>
                                  <td>{index + 1}</td>
                                  <td colSpan={2}>{user.user_name}</td>
                                  <td colSpan={2}>{user.login_name}</td>
                                  <td>{positions[user.level] || "Unknown"}</td>
                                  <td colSpan={2}>
                                    {statuses[user.user_status] || "Unknown"}
                                  </td>
                                  <td>{user.reg_dtime}</td>
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

export default dashboardUser;

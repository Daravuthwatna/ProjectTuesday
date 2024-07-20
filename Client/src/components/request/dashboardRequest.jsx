/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashboardRequest = () => {
  const [allRequest, setAllRequest] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [item, setItem] = useState([]);

  const fetchRequest = async () => {
    try {
      const response = await axios.get("http://localhost:5000/requests/allUserRequest");
      setAllRequest(response.data.result);
    } catch (error) {
      console.error("Error fetching Request:", error);
    }
  };

  const fetchItem = async () => {
    try {
      const response = await axios.get("http://localhost:5000/requests/item");
      const itemMap = response.data.result.reduce((acc, item) => {
        acc[item.item_id] = item.item_name;
        return acc;
      }, {})
      setItem(itemMap)
    } catch (error) {
      console.log("Error fetching Items", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/requests/department");
      const departmentMap = response.data.result.reduce((acc, departments) => {
        acc[departments.department_id] = departments.department_name;
        return acc;
      }, {});
      setDepartments(departmentMap)
    } catch (error) {
      console.log("Error fetching departments", error);
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
    fetchRequest();
    fetchDepartments();
    fetchUsers();
    fetchItem();
  }, []);



  return (
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
              <th>Department</th>
              <th>Request Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allRequest.length > 0 &&
              allRequest.map((request, index) => (
                <tr key={request.request_id}>
                  <td>{index + 1}</td>
                  <td>{users[request.user]}</td>
                  <td>{request.requester}</td>
                  <td>{item[request.item_id]}</td>
                  <td>{request.quantity}</td>
                  <td>{departments[request.department]}</td>
                  <td>{request.request_date}</td>
                  <td>
                    <Link to={`/request/update/${request.request_id}`}>
                      <button className="btn btn-primary">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      // onClick={() => deleteItem(request.request_id)}
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

export default DashboardRequest;

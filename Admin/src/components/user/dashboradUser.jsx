import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashboardUser = () => {
  const [allUser, setAllUser] = useState([]);
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [statuses, setStatuses] = useState({
    4: "Inactive",
    5: "Active",
  });
  const [positions, setPositions] = useState({});
  const [del_dtime, setDelDtime] = useState("");

  const togglePasswordVisibility = (userId) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users/allUser");
      setAllUser(response.data.result);
    } catch (error) {
      console.error("Error fetching users:", error);
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

  const deleteUser = async (user_id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.put(`http://localhost:5000/users/deleteUser/${user_id}`, {
          del_dtime,
        });
        setAllUser((prevState) =>
          prevState.filter((user) => user.user_id !== user_id)
        );
      } catch (error) {
        console.log("Delete Error...", error);
      }
    }
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setDelDtime(currentDate);
    fetchPositions();
    fetchUsers();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <table className="table table-striped text-center">
          <thead className="thead-dark">
            <tr>
              <th>No</th>
              <th>Login Name</th>
              <th>Password</th>
              <th>Level</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allUser.length > 0 &&
              allUser.map((user, index) => (
                <tr key={user.user_id}>
                  <td>{index + 1}</td>
                  <td>{user.login_name}</td>
                  <td>
                    {passwordVisibility[user.user_id]
                      ? user.password
                      : "•••••"}
                    <span
                      onClick={() => togglePasswordVisibility(user.user_id)}
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                    >
                      {passwordVisibility[user.user_id] ? (
                        <i className="fa-solid fa-eye"></i>
                      ) : (
                        <i className="fa-solid fa-eye-slash"></i>
                      )}
                    </span>
                  </td>
                  <td>{positions[user.level] || "Unknown"}</td>
                  <td>{statuses[user.user_status] || "Unknown"}</td>
                  <td>
                    <Link to={`/user/update/${user.user_id}`}>
                      <button className="btn btn-primary">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUser(user.user_id)}
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

export default DashboardUser;

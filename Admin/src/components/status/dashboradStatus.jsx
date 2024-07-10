import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashboardStatus = () => {
  const [allStatus, setAllStatus] = useState([]);
  const [del_dtime, setDelDtime] = useState("");

  const fetchStatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/status/allStatus"
      );
      setAllStatus(response.data.result);
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  };

  const deleteStatus = async (status_id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.put(
          `http://localhost:5000/status/deleteStatus/${status_id}`,
          { del_dtime }
        );
        setAllStatus(
          allStatus.filter((status) => status.status_id !== status_id)
        );
      } catch (error) {
        console.log("Delete Error...", error);
      }
    }
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setDelDtime(currentDate);
    fetchStatus();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <table className="table table-striped text-center">
          <thead className="thead-dark">
            <tr>
              <th>No</th>
              <th>Status</th>
              <th>Registration Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allStatus.length > 0 &&
              allStatus.map((status, index) => (
                <tr key={status.status_id}>
                  <td>{index + 1}</td>
                  <td>{status.status}</td>
                  <td>{status.reg_dtime}</td>
                  <td>
                    <Link to={`/status/update/${status.status_id}`}>
                      <button className="btn btn-primary">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteStatus(status.status_id)}
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

export default DashboardStatus;

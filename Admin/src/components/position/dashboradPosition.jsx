import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashboardPosition = () => {
  const [allPosition, setAllPosition] = useState([]);
  const [del_dtime, setDelDtime] = useState("");

  const fetchPosition = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/positions/allPosition"
      );
      setAllPosition(res.data.result);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  const deleteDepartment = async (position_id) => {
    if (window.confirm("Are you sure you want to delete this Position?")) {
      try {
        await axios.delete(
          `http://localhost:5000/positions/deletePosition/${position_id}`,
          {
            data: { del_dtime },
          }
        );
        setAllPosition(
          allPosition.filter((position) => position.position_id !== position_id)
        );
      } catch (error) {
        console.error("Error deleting position:", error);
      }
    }
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setDelDtime(currentDate);
    fetchPosition();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <table className="table table-striped text-center">
          <thead className="thead-dark">
            <tr>
              <th>No</th>
              <th>Position</th>
              <th>Registration Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allPosition.length > 0 &&
              allPosition.map((position, index) => (
                <tr key={position.position_id}>
                  <td>{index + 1}</td>
                  <td>{position.position_name}</td>
                  <td>{position.reg_dtime}</td>
                  <td>
                    <Link to={`/position/update/${position.position_id}`}>
                      <button className="btn btn-primary">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteDepartment(position.position_id)}
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

export default DashboardPosition;

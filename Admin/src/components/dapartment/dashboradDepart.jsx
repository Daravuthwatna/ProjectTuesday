import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [allDepartment, setAllDepartment] = useState([]);
  const [del_dtime, setDelDtime] = useState("");

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/departments/allDepartment"
      );
      setAllDepartment(res.data.result);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const deleteDepartment = async (department_id) => {
    if (window.confirm("Are you sure you want to delete this Department?")) {
      try {
        await axios.post(
          `http://localhost:5000/departments/deleteDepartment/${department_id}`,
          { del_dtime }
        );
        setAllDepartment(
          allDepartment.filter(
            (department) => department.department_id !== department_id
          )
        );
      } catch (error) {
        console.error("Error deleting department:", error);
      }
    }
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setDelDtime(currentDate);
    fetchDepartments();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <table className="table table-striped text-center">
          <thead className="thead-dark">
            <tr>
              <th>No</th>
              <th>Department</th>
              <th>Room Number</th>
              <th>Registration Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allDepartment.length > 0 &&
              allDepartment.map((department, index) => (
                <tr key={department.department_id}>
                  <td>{index + 1}</td>
                  <td>{department.department_name}</td>
                  <td>{department.room_no}</td>
                  <td>{department.reg_dtime}</td>
                  <td>
                    <Link to={`/department/update/${department.department_id}`}>
                      <button className="btn btn-primary">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <input
                      type="hidden"
                      className="form-control"
                      name="del_dtime"
                      value={del_dtime}
                      onChange={(e) => setDelDtime(e.target.value)}
                    />
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteDepartment(department.department_id)}
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

export default Dashboard;

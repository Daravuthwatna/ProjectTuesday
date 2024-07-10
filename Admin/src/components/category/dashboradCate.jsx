import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DashboardCate = () => {
  const [allCategory, setAllCategory] = useState([]);
  const [del_dtime, setDelDtime] = useState("");

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/categories/allCategory"
      );
      setAllCategory(response.data.result);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const deleteCategory = async (category_id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.post(
          `http://localhost:5000/categories/deleteCategory/${category_id}`,
          { del_dtime }
        );
        setAllCategory(
          allCategory.filter((category) => category.category_id != category_id)
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
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <table className="table table-striped text-center">
          <thead className="thead-dark">
            <tr>
              <th>No</th>
              <th>Category</th>
              <th>Registration Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allCategory.length > 0 &&
              allCategory.map((category, index) => (
                <tr key={category.category_id}>
                  <td>{index + 1}</td>
                  <td>{category.category_name}</td>
                  <td>{category.reg_dtime}</td>
                  <td>
                    <Link to={`/category/update/${category.category_id}`}>
                      <button className="btn btn-primary">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteCategory(category.category_id)}
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

export default DashboardCate;

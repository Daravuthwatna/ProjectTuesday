import { useEffect, useState } from "react";
import Dashboard from "./dashboradStatus.jsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../utils/navbar.jsx";
import Sidebar from "../utils/sidebar.jsx";
const CreateStatus = () => {
  const [value, setValue] = useState({
    status: "",
    reg_dtime: "",
  });
  const [reg_dtime, setRegDtime] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/status/addStatus",
        value
      );
      console.log("Added successfully...", response);
      toast.success("Added Successfully!");
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.log("Add Error...", error);
    }
  };
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setRegDtime(currentDate);
    setValue((prevValue) => ({ ...prevValue, reg_dtime: currentDate }));
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
                    <Dashboard />
                  </div>
                  <div className="col-lg-4 pt-4">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="status"
                          placeholder="Status Name"
                          onChange={(e) =>
                            setValue({ ...value, status: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="hidden"
                          className="form-control"
                          name="reg_dtime"
                          value={reg_dtime}
                          onChange={(e) => setRegDtime(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <button type="submit" className="btn btn-primary mb-2">
                          Add Status
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <ToastContainer
                  position="bottom-right"
                  autoClose={1500}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStatus;

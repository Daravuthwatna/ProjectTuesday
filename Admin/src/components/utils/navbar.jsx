import { useState, useEffect } from "react";
import Logo from "../../assets/photo.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [countRequest, setCountRequest] = useState(0);

  const fetchCountRequest = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/requests/countRequest"
      );
      setCountRequest(response.data.result[0].total_requests);
    } catch (error) {
      console.log("Fetch Count Error...", error);
    }
  };

  useEffect(() => {
    fetchCountRequest();
    const intervalId = setInterval(fetchCountRequest, 1000);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-1 text-center">
          <img width={110} src={Logo} alt="Logo" />
        </div>
        <div className="col-lg-10">
          <h1>Admin Panel</h1>
          {user && <h6>Welcome, {user.login_name}</h6>}
        </div>
        <div className="col-lg-1 text-center position-relative">
          <button type="button" className="btn position-relative">
            <Link className="text-dark text-decoration-none" to='/notification'>
              <i className="fa-solid fa-message fa-2x"></i>
            </Link>
            <span className="position-absolute top-0 start-60 translate-middle badge rounded-pill bg-danger">
              {countRequest}
            </span>
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;

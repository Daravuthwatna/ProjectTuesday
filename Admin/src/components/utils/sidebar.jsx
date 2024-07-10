import { useEffect } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const handleLogout = () => {
    window.location.replace("/");
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      handleLogout();
    }, 1 * 60  * 60 * 1000);
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <ul className="text-center">
          <li className="list-unstyled p-2">
            <Link className="text-dark text-decoration-none" to="/home">
              <i className="fa-solid fa-house fa-xl"></i>
              <p>Home</p>
            </Link>
          </li>
          <li className="list-unstyled p-2">
            <Link className="text-dark text-decoration-none" to="/department">
              <i className="fa-solid fa-people-arrows fa-xl"></i>
              <p>Department</p>
            </Link>
          </li>
          <li className="list-unstyled p-2">
            <Link className="text-dark text-decoration-none" to="/category">
              <i className="fa-solid fa-layer-group fa-xl"></i>
              <p>Category</p>
            </Link>
          </li>
          <li className="list-unstyled p-2">
            <Link className="text-dark text-decoration-none" to="/position">
              <i className="fa-solid fa-location-dot fa-xl"></i>
              <p>Position</p>
            </Link>
          </li>
          <li className="list-unstyled p-2">
            <Link className="text-dark text-decoration-none" to="/status">
              <i className="fa-solid fa-chart-simple fa-xl"></i>
              <p>Status</p>
            </Link>
          </li>
          <li className="list-unstyled p-2">
            <Link className="text-dark text-decoration-none" to="/user">
              <i className="fa-solid fa-user-tie fa-xl"></i>
              <p>User</p>
            </Link>
          </li>
          <li className="list-unstyled p-2">
            <Link className="text-dark text-decoration-none" to="/item">
              <i className="fa-solid fa-file fa-xl"></i>
              <p>Item</p>
            </Link>
          </li>
        </ul>
        <div className="text-center mt-4">
          <Link
            onClick={handleLogout}
            className="text-dark text-decoration-none"
          >
            <p>
              <span className="p-1">
                <i className="fa-solid fa-right-from-bracket fa-xl"></i>
              </span>
              Log Out
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

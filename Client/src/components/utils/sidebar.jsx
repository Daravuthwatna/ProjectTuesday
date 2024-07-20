import { useEffect } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const handleLogout = () => {
    window.location.replace("/");
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      handleLogout();
    }, 1 * 60 * 60 * 1000);
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <ul className="text-center">
          <li className="list-unstyled p-2">
            <Link className="text-dark text-decoration-none" to="/home">
              <i className="fa-solid fa-house fa-xl" aria-hidden="true"></i>
              <p>Home</p>
            </Link>
          </li>
          <li className="list-unstyled p-2">
            <Link className="text-dark text-decoration-none" to="/request">
              <i className="fa-solid fa-code-pull-request fa-xl" aria-hidden="true"></i>
              <p>Request</p>
            </Link>
          </li>
          <li className="list-unstyled p-2">
            <Link className="text-dark text-decoration-none" to="/item">
              <i className="fa-solid fa-file fa-xl"></i>
              <p>Item</p>
            </Link>
          </li>
          <li className="list-unstyled p-2">
            <Link className="text-dark text-decoration-none" to="/user">
              <i className="fa-solid fa-user-tie fa-xl"></i>
              <p>User</p>
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
                <i className="fa-solid fa-right-from-bracket fa-xl" aria-hidden="true"></i>
              </span>
              Log Out
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

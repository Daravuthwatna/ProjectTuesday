import { useEffect, useState } from 'react';
import Logo from "../../assets/photo.png";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-1 text-center">
          <img width={110} src={Logo} alt="Logo" />
        </div>
        <div className="col-lg-9">
          <h1>User Panel</h1>
          {user && <h6>Welcome, {user.login_name}</h6>}
        </div>
        <div className="col-lg-1 text-center">
          
        </div>
        <div className="col-lg-1 text-center">
          <i className="fa-solid fa-message fa-2x"></i>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;

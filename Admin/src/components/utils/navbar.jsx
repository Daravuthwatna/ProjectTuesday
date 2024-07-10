import Logo from "../../assets/photo.png";

const Navbar = () => {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-1 text-center">
          <img width={110} src={Logo} alt="Logo" />
        </div>
        <div className="col-lg-10">
          <h1>Admin Panel</h1>
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

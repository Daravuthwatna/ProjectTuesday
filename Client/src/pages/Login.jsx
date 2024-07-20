import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useUser } from "../context/userContext";

const Login = () => {
  const [data, setData] = useState({ login_name: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login/user', data);
      console.log('Login Successfully', response.data);
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data in local storage
      navigate('/home');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid Username or Password');
      } else {
        setError('An error occurred. Please try again.');
      }
      console.log('Login Error', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">User Login</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="login_name"
                    name="login_name"
                    placeholder="Enter your username"
                    onChange={(e) =>
                      setData({ ...data, login_name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group mb-4 position-relative">
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      name="password"
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={togglePassword}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? (
                        <i className="fas fa-eye-slash"></i>
                      ) : (
                        <i className="fas fa-eye"></i>
                      )}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

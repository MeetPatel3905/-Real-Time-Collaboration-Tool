import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../../helpers/auth/auth.helper.js';
import { useSupplier } from '../../context/supplierContext';

const Register = () => {
  const navigate = useNavigate();
  const { loading, setLoading, darkMode } = useSupplier();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast('Passwords do not match', { type: 'error' });
      return;
    }

    setLoading(true);
    const result = await register({
      username: formData.username,
      email: formData.email,
      password: formData.password
    }).finally(() => setLoading(false));

    const { message, status } = result;

    if (status === 201) {
      toast(message, { type: 'success' });
      navigate('/');
      return;
    }

    toast(message, { type: 'error' });
  };

  return (
    <div className={`container my-5 d-flex justify-content-center align-items-center ${darkMode ? 'text-light bg-dark' : 'text-dark bg-light'}`} style={{ minHeight: '80vh' }}>
      <div className="col-md-8 col-lg-6 col-xl-5 p-5 shadow rounded">
        <h1 className={`display-4 mb-4 text-center ${darkMode ? 'text-light' : 'text-dark'}`}>Register</h1>
        <form onSubmit={handleSubmit} className="w-100">
          <div className="form-group mb-4">
            <label htmlFor="username" className={darkMode ? 'text-light' : 'text-dark'}>Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="email" className={darkMode ? 'text-light' : 'text-dark'}>Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className={darkMode ? 'text-light' : 'text-dark'}>Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="confirmPassword" className={darkMode ? 'text-light' : 'text-dark'}>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button disabled={loading} type="submit" className={`btn btn-${darkMode ? 'light' : 'primary'}`}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
        <hr className={`my-4 ${darkMode ? 'border-light' : 'border-dark'}`} />
        <p className={`text-center mb-0 ${darkMode ? 'text-light' : 'text-dark'}`}>
          Already have an account?{' '}
          <Link to="/" className={darkMode ? 'text-light' : 'text-primary'}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

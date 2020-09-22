import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {login} from '../../actions/auth';

const Login = (props) => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const { identifier, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    props.login({ identifier, password });
  };

  if (props.isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <div className={props.showLogin?'login-container login':'login-container'}>
      <div className='login-card'>
        <h2 className='login-title'>Login to Kin's Memo</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='login-form'>
            <label>Identifier</label>
            <input
              type="text"
              className="login-input"
              name="identifier"
              onChange={(e) => onChange(e)}
              value={identifier}
            />
          </div>
          <div className="login-form">
            <label>Password</label>
            <input
              type='password'
              className='login-input'
              name='password'
              onChange={(e) => onChange(e)}
              value={password}
            />
          </div>
          <div className='login-form'>
            <button type='submit' className='login-btn'>
              Login
            </button>
          </div>
          {/* <p>
                Make an new account? <Link to="/register">Register</Link>
              </p> */}
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

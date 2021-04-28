import React, {useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import signInImage from '../images/img1.jpg';
import {
  handleLogin,
  selectAuthError,
  selectIsLoadingSubmit,
} from '../slices/auth';
import './style2.css';
import './stylelogin.css';

function Login({history}) {
  const [creds, setCreds] = useState({email: '', password: '', error: ''});
  const dispatch = useDispatch();
  const handleChange = e =>
    setCreds({...creds, [e.target.name]: e.target.value});
  const {email, password} = creds;
  const isLoading = useSelector(selectIsLoadingSubmit);
  const error = useSelector(selectAuthError);
  const handleSubmit = async e => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      await dispatch(handleLogin({email, password}));
      window.location.href = '/';
    } catch (err) {
      console.log({err});
    }
  };
  return (
    <div className="row">
      {/*<ToastContainer
        hideProgressBar={true}
        newestOnTop={true}
        autoClose={5000}
      />*/}
      <div className="col-md-6" style={{padding: 0, margin: 0}}>
        <img src={signInImage} width="100%" height="100%" />
      </div>
      <div className="hacky2">  
          <h1 className="hacky">Log in to Hacky News</h1 >
          </div>
  
      <div className="col-md-6" style={{padding: 0, margin: 0}}>
        <div className="col-md-6 col-sm-12">
          <div className="login-form">
            
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="username">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="username">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                />
                
              <p className="forgot-password"><a>Forgot Password</a></p>
              </div>
              <button
                type="submit"
                className="btn btn-black"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'SIGN IN'}
              </button>
              <div class="google-btn">
  <div class="google-icon-wrapper">
    <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
  </div>
  <p class="btn-text"><b>Sign in with Google</b></p>
</div>
            </form>
            {/*<div class="google-btn" style={{margin: 20}}>
              <div class="google-icon-wrapper">
                <img
                  class="google-icon"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                />
              </div>
              <p class="btn-text">
                <b>Sign in with google</b>
              </p>
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);

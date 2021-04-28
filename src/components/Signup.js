import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import signUpImage from '../images/img3.jpg';
import {
  handleSignup,
  selectAuthError,
  selectIsLoadingSubmit,
} from '../slices/auth';
import './styles.css';

const Signup = ({history}) => {
  const isLoading = useSelector(selectIsLoadingSubmit);
  const [creds, setCreds] = useState({
    email: '',
    password: '',
    name: '',
    error: '',
  });
  const dispatch = useDispatch();
  const handleChange = e =>
    setCreds({...creds, [e.target.name]: e.target.value});
  const {email, password, name} = creds;
  const error = useSelector(selectAuthError);
  const handleSubmit = async e => {
    e.preventDefault();
    if (!email || !password || !name) return;
    try {
      await dispatch(handleSignup({email, password, name}));
      history.push('/login');
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
        <img src={signUpImage} width="100%" height="100%" />
      </div>
      <div className="col-md-6" style={{padding: 0, margin: 0}}>
        <div class="col-md-6 col-sm-12">
          <div class="login-form">
            {error && (
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div class="form-group">
                <label className="username">Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div class="form-group">
                <label className="username">Email</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div class="form-group">
                <label className="username">Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                />
              </div>
              {/*<div>
                <small>
                  cick here to <Link to="/sign-up">register</Link>
                </small>
              </div>{' '}*/}
              <Link to="/sign-up">
                {/* <button type="submit" class="btn btn-black">
                  Login
                </button> */}
              </Link>
              <button
                type="submit"
                class="btn btn-black"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'SIGN UP'}
              </button>
              <div class="google-btn">
              <div class="google-icon-wrapper">
                <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
              </div>
              <p class="btn-text"><b>Sign up with Google</b></p>
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
                <b>Sign up with google</b>
              </p>
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Signup);

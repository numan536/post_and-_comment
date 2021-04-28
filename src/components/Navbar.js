import React from 'react';
import './styles.css';
import {Link, withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsLoggedIn, set_isLoggedIn} from '../slices/auth';

const Navbar = ({history}) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div>
      {/*<div class="container-fluid">*/}
      <nav class="navbar home__nav col-md-12">
        <div class="container">
          <div class="navbar-header">
            <button
              type="button"
              class="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand home__link" href="/">
              Hacky News
            </a>
          </div>
          <div
            class="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul class="nav navbar-nav navbar-right">
              {/* <li>
                <Link to="/">Home</Link>
              </li> */}
              {isLoggedIn && (
                <li className="box login-box">
                  <Link to="/create-post">New Post</Link>
                </li>
              )}
              {!isLoggedIn && (
                <>
                  <li className="box login-box login-btn">
                    <Link to="/login">Login</Link>
                  </li>
                  <li className="box regiter-btn">
                    <Link to="/sign-up">Sign Up</Link>
                  </li>
                </>
              )}

              {isLoggedIn && (
                <li style={{cursor: 'pointer'}} className="box login-btn">
                  <a
                    onClick={() => {
                      localStorage.removeItem('token');
                      dispatch(set_isLoggedIn(false));
                      history.push('/login');
                    }}
                  >
                    Logout
                  </a>
                </li>
              )}

              <li class="home__li"></li>
            </ul>
          </div>
        </div>
      </nav>  
    </div>
  );
};

export default withRouter(Navbar);

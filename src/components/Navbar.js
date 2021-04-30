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
      {/*<div className="container-fluid">*/}
      <nav class="navbar navbar-default home__nav">
        <div class="container-fluid">
          <div class="navbar-header">
            <a className="navbar-brand home__link" href="/">
              Hacky News
            </a>
          </div>
          <ul class="nav navbar-nav navbar-right">
            {/* <li>
                <Link to="/">Home</Link>
              </li> */}
            {isLoggedIn && (
              <li
                style={{marginRight: 35, color: 'white !important'}}
                className="box login-box"
              >
                <Link style={{color: 'white'}} to="/create-post">
                  New Post
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <>
                <li
                  style={{marginRight: 35, color: 'white'}}
                  className=" login-box login-btn"
                >
                  <Link to="/login">LOGIN</Link>
                </li>
                <li
                  style={{marginRight: 35, color: 'white'}}
                  className="box regiter-btn"
                >
                  <Link style={{color: 'white'}} to="/sign-up">
                    SIGN UP
                  </Link>
                </li>
              </>
            )}

            {isLoggedIn && (
              <li
                style={{cursor: 'pointer', color: 'white', marginRight: 35}}
                className="box login-btn"
              >
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
            <li className="home__li"></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Navbar);

import React from 'react';
import './styles.css';
import Posts from './Posts';
import {Link, withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsLoggedIn, set_isLoggedIn} from '../slices/auth';

const Home = ({history}) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Posts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Home);

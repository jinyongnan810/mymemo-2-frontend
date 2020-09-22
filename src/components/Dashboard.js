import PropTypes from 'prop-types';
import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {logout} from '../actions/auth'
import {loadMemos} from '../actions/memo';

import Login from './auth/Login';
import Content from './layout/Content';
import List from './layout/List';

const Dashboard = ({auth, memo, loadMemos, logout}) => {
  const {isAuthenticated} = auth
  const [showLogin,toggleShowLogin]=useState(false)
  useEffect(()=>{
    loadMemos()
  },[])

  const scrollToTop = ()=>{
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  const login = ()=>{
    if(isAuthenticated){
      logout()
    }else{
      toggleShowLogin(!showLogin)
    }
  }

  return (
  <Fragment>
    <h1 className='k-site-title unselectable' onClick={e=>scrollToTop()} onDoubleClick={e=>login()}>Kin's Page</h1>
    <List isAuthenticated={isAuthenticated} memo={memo}/>
    <Content isAuthenticated={isAuthenticated} memo={memo}/>
    {
      isAuthenticated?<Fragment/>:<Login showLogin={showLogin}/>
    }
    
  </Fragment>
  );
};
Dashboard.propTypes = {
  auth:PropTypes.object.isRequired,
  memo:PropTypes.object.isRequired,
  loadMemos:PropTypes.func.isRequired,
  logout:PropTypes.func.isRequired,
};

const mapStateToProps=(state)=>({
  auth: state.auth,
  memo: state.memo,
})

export default connect(mapStateToProps,{loadMemos,logout})(Dashboard);

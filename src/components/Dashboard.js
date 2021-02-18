import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import { logout } from "../actions/auth";
import { loadMemos } from "../actions/memo";

import Login from "./auth/Login";
import Content from "./layout/Content";
import List from "./layout/List";
import SearchBox from "./layout/SearchBox";

const Dashboard = ({ auth, memo, loadMemos, logout }) => {
  const { isAuthenticated } = auth;
  const [showLogin, toggleShowLogin] = useState(false);
  const [showSearchBox, toggleShowSearchBox] = useState(false);
  let sidebar;
  useEffect(() => {
    // load memos
    loadMemos();
    // bind document event
    document.addEventListener("keydown", onKeyDown, false);
    sidebar = document.getElementById("k-sidebar");
    sidebar.addEventListener("scroll", onScroll, false);

    // eslint-disable-next-line
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  let sidebarContainerEl;
  const onScroll = (e) => {
    let fadeoutBottom = true;
    let fadeoutTop = true;
    if (e.target.scrollHeight <= e.target.scrollTop + window.innerHeight + 50) {
      fadeoutBottom = false;
    } else {
      fadeoutBottom = true;
    }

    if (e.target.scrollTop <= 50) {
      fadeoutTop = false;
    } else {
      fadeoutTop = true;
    }
    const cls =
      fadeoutTop && fadeoutBottom
        ? "fadeout-both"
        : fadeoutTop
        ? "fadeout-top"
        : fadeoutBottom
        ? "fadeout-bottom"
        : "";
    if (!sidebarContainerEl) {
      sidebarContainerEl = document.getElementById("k-sidebar-container");
    }
    if (cls) {
      // sidebarContainerEl.className = `k-sidebar-container ${cls}`;
    }
    console.log(
      `e.target.scrollHeight:${e.target.scrollHeight},sidebar.scrollTop:${sidebar.scrollTop},window.innerHeight:${window.innerHeight}`
    );
  };

  const login = () => {
    if (isAuthenticated) {
      logout();
      toggleShowLogin(false);
    } else {
      toggleShowLogin(!showLogin);
    }
  };
  // key events
  const onKeyDown = (e) => {
    var keyCode = e.keyCode || e.which;
    // f3
    if (e.keyCode === 114) {
      e.preventDefault();
      toggleShowSearchBox(true);
    }
    // ctrl+f
    if (e.ctrlKey || e.metaKey) {
      if (keyCode === 70) {
        e.preventDefault();
        toggleShowSearchBox(true);
      }
    }
  };

  return (
    <Fragment>
      <h1
        className="k-site-title unselectable"
        onClick={(e) => scrollToTop()}
        onDoubleClick={(e) => login()}
      >
        Kin's Page
      </h1>
      <List isAuthenticated={isAuthenticated} memo={memo} />
      <Content isAuthenticated={isAuthenticated} memo={memo} />
      {showSearchBox && (
        <SearchBox toggle={toggleShowSearchBox} scrollToTop={scrollToTop} />
      )}

      {isAuthenticated ? <Fragment /> : <Login showLogin={showLogin} />}
    </Fragment>
  );
};
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  memo: PropTypes.object.isRequired,
  loadMemos: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  memo: state.memo,
});

export default connect(mapStateToProps, { loadMemos, logout })(Dashboard);

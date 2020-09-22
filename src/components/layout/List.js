import PropTypes from "prop-types";
import React, { Fragment } from "react";
import AddMemo from "./AddMemo";
import ListItem from "./ListItem";

const List = ({ memo, isAuthenticated }) => {
  const { memos, currentMemo, loading } = memo;
  return (
    <div className="k-sidebar-container">
      <div className="k-arrow">
        <img
          src="imgs/right.svg"
          alt="Toggle List..."
          className="k-toggle-list"
        />
      </div>
      <div id="k-sidebar" className="k-sidebar hide-scrollbar">
        {loading ? (
          <Fragment>
            <img
              src="imgs/loading-white.svg"
              alt="Loading..."
              className="k-loading"
            />
          </Fragment>
        ) : (
          <Fragment>
            {isAuthenticated ? <AddMemo /> : ""}
            {memos.map((memo) => (
              <ListItem
                memo={memo}
                isCurrent={memo.id === currentMemo.id}
                isAuthenticated={isAuthenticated}
                key={memo.id}
              />
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};

List.propTypes = {
  memo: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default List;

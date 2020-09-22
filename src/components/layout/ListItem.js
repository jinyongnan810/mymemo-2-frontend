import React, { useState } from "react";
import PropTypes from "prop-types";
import { setCurrentMemo, deleteMemo, updateMemo } from "../../actions/memo";
import { connect } from "react-redux";

const ListItem = ({
  memo,
  isCurrent,
  setCurrentMemo,
  isAuthenticated,
  deleteMemo,
  updateMemo,
}) => {
  const [title, setTitle] = useState(memo.title);
  const setCurrent = (id) => {
    setCurrentMemo(id);
  };
  const remove = (id) => {
    if (window.confirm("Are you sure to delete this memo?")) {
      deleteMemo(id);
    }
  };
  const onKeyDown = (e) => {
    var keyCode = e.keyCode || e.which;
    // save
    if (keyCode === 13) {
      e.preventDefault();
      updateTitle();
    }
  };
  const updateTitle = () => {
    updateMemo({ title: title }, memo.id);
  };

  return (
    <div
      className={isCurrent ? "k-title current" : "k-title"}
      key={memo.id}
      onClick={(e) => setCurrent(memo.id)}
    >
      {isAuthenticated ? (
        <input
          value={title}
          className="k-title-edit"
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => onKeyDown(e)}
          onBlur={(e) => updateTitle()}
        />
      ) : (
        `${memo.title}`
      )}
      {isAuthenticated ? (
        <img
          src="imgs/delete.svg"
          alt="Toggle List..."
          className="k-title-delete"
          onClick={(e) => remove(memo.id)}
        />
      ) : (
        ""
      )}
    </div>
  );
};

ListItem.propTypes = {
  memo: PropTypes.object.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  setCurrentMemo: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  deleteMemo: PropTypes.func.isRequired,
  updateMemo: PropTypes.func.isRequired,
};

export default connect(null, { setCurrentMemo, deleteMemo, updateMemo })(
  ListItem
);

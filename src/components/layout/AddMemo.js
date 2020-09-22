import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createMemo } from "../../actions/memo";

const AddMemo = ({ createMemo }) => {
  const addMemo = () => {
    createMemo({ title: "Temp Title", content: "### Temp Content" });
  };
  return (
    <div className="k-title" onClick={() => addMemo()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="feather feather-plus-circle"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="18"
        height="18"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    </div>
  );
};

AddMemo.propTypes = {
  createMemo: PropTypes.func.isRequired,
};

export default connect(null, { createMemo })(AddMemo);

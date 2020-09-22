import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown/with-html";
import { updateMemo } from "../../actions/memo";
import CodeBlock from "./CodeBlock";
import Moment from "react-moment";
import moment from "moment";

const Content = ({ memo, updateMemo, isAuthenticated }) => {
  const { currentMemo, loading } = memo;
  const [edting, toggleEditing] = useState(false);
  const [content, editContent] = useState("");

  useEffect(() => {
    if (currentMemo) {
      if (edting) {
        toggleEditing(false);
      }
      editContent(currentMemo.content);
    }
  }, [loading, currentMemo]);

  // events
  const onKeyDown = (e) => {
    var keyCode = e.keyCode || e.which;
    // allow tab
    if (keyCode === 9) {
      e.preventDefault();
      insertToCursor("\t");
    }
    // save
    if (e.ctrlKey || e.metaKey) {
      if (keyCode === 83) {
        e.preventDefault();
        toggleEdit();
      }
    }
    // color
    if (e.ctrlKey) {
      if (keyCode === 89) {
        e.preventDefault();
        insertColor();
      }
    }
    // link
    if (e.ctrlKey) {
      if (keyCode === 76) {
        e.preventDefault();
        insertLink();
      }
    }
  };
  const toggleEdit = () => {
    if (!isAuthenticated) {
      return;
    }
    if (edting) {
      updateMemo({ content }, currentMemo.id);
    }
    toggleEditing(!edting);
  };
  // key event functions
  const insertColor = () => {
    const text1 = "<span style='color:skyblue'>";
    const text2 = "</span>";
    const cursorStart = 19;
    const cursorEnd = 26;
    insertToCursorSide(text1, text2, cursorStart, cursorEnd);
  };
  const insertLink = () => {
    const text1 = "[";
    const text2 = "]()";
    const cursorStart = null;
    const cursorEnd = null;
    insertToCursorSide(text1, text2, cursorStart, cursorEnd);
  };
  const insertToCursor = (text) => {
    const textarea = document.getElementById("k-editor");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const contentAfter =
      content.substring(0, start) + text + content.substring(end);
    editContent(contentAfter);
    setTimeout(() => {
      textarea.selectionStart = start + 1;
      textarea.selectionEnd = start + 1;
    }, 100);
  };
  const insertToCursorSide = (text1, text2, cursorStart, cursorEnd) => {
    const textarea = document.getElementById("k-editor");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const length = end - start;

    const contentAfter =
      content.substring(0, start) +
      text1 +
      content.substring(start, end) +
      text2 +
      content.substring(end);
    editContent(contentAfter);
    setTimeout(() => {
      if (cursorStart) {
        textarea.selectionStart = start + cursorStart;
        textarea.selectionEnd = start + cursorEnd;
      } else {
        textarea.selectionStart = start + 1 + length + 2;
        textarea.selectionEnd = textarea.selectionStart;
      }
    }, 100);
  };

  if (loading) {
    return (
      <Fragment>
        <img
          src="imgs/loading-white.svg"
          alt="Loading..."
          className="k-loading"
        />
      </Fragment>
    );
  } else if (currentMemo) {
    return (
      <div className="k-editor-container" onDoubleClick={(e) => toggleEdit()}>
        <div className={edting ? "k-content" : "k-content hide"}>
          <textarea
            className="k-editor"
            id="k-editor"
            onChange={(e) => editContent(e.target.value)}
            onKeyDown={(e) => onKeyDown(e)}
            value={content}
          ></textarea>
        </div>
        <div className={edting ? "k-content hide" : "k-content"}>
          <div className="k-updated-time">
            Last updated at:&nbsp;
            <Moment format="GG.M.D kk:mm">
              {moment.utc(currentMemo.updatedAt).local()}
            </Moment>
          </div>
          <ReactMarkdown
            source={currentMemo.content}
            escapeHtml={false}
            linkTarget="_blank"
            renderers={{ code: CodeBlock }}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="k-content">
        <h1>No memos found...</h1>
      </div>
    );
  }
};

Content.propTypes = {
  memo: PropTypes.object.isRequired,
  updateMemo: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(null, { updateMemo })(Content);

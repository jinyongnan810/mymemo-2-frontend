import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alert extends Component {
  static propTypes = {
    theAlert: PropTypes.object.isRequired,
  };
  componentDidUpdate(previousProps) {
    const { alert, theAlert } = this.props;
    if (theAlert && theAlert.id !== previousProps.id) {
      if (theAlert.type === "success") {
        alert.success(theAlert.msg);
      } else {
        alert.error(`${theAlert.msg}`);
        console.error(`${theAlert.msg}`);
      }
    } else {
      return <Fragment />;
    }
  }
  render() {
    return <Fragment />;
  }
}
const mapStateToProps = (state) => ({
  theAlert: state.alert,
});

export default connect(mapStateToProps)(withAlert()(Alert));

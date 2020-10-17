import React from 'react';
import {connect} from "react-redux";
import {logOut} from "../../redux/actions/auth-actions";
import {Redirect} from "react-router-dom";

class LogOut extends React.Component {
  componentDidMount() {
    this.props.logOut();
  }

  render() {
    return( <Redirect to={'/auth'}/>)
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token
  }
}

function mapDispatchToProp(dispatch) {
  return {
    logOut: () => dispatch(logOut()),
  }
}

export default connect(mapStateToProps, mapDispatchToProp)(LogOut);
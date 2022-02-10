import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../redux/redux-store';

const mapStateToPropsForRedirect = (state:AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
  };
};
type withAuthRedirectType=ReturnType<typeof mapStateToPropsForRedirect>

export default function withAuthRedirect (Component: React.ComponentType) {
  function  AuthRedirectComponent (props: withAuthRedirectType)  {
    let {isAuth, ...restProps}=props
    if (!props.isAuth) return <Redirect to="/login/" />;
    return <Component {...restProps} />;
  };

  let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent);
  return ConnectedAuthRedirectComponent;
};



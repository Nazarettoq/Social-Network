import React from 'react';
import { login, logout } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AppStateType } from '../../redux/redux-store';
import Header, { DispatchPropsType, MapPropsType } from './Header';
class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {
  render() {
    return <Header {...this.props} />;
  }
}
let mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
    loginName: state.auth.login,
    smallPhoto: state.auth.smallPhoto,
  } 
};
export default connect<MapPropsType,DispatchPropsType,{},AppStateType>(mapStateToProps, { logout })(HeaderContainer);

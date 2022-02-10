import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {
  getProfile,
  updateStatus,
  getStatus,
  savePhoto,
  saveProfile,
} from '../../redux/profile-reducer';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import withAuthRedirect from '../hoc/AuthRedirect';
import { compose } from 'redux';
import { ProflieType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  getProfile: (userId: number) => void;
  updateStatus: (sttatys: string) => void;
  getStatus: (userId: number) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProflieType) => Promise<any>;
};

type PathParamsType = {
  userId: string;
};
type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;
class ProfileContainer extends React.Component<PropsType> {
  refreshData() {
    let userId: number | null = +this.props.match.params.userId;
    if (!userId) {
      userId = this.props.CurrentUserId;
      if (!userId) {
        this.props.history.push('/login');
      }
    }

    if (!userId) {
      console.error("ID should exist in URL params or in state ('CurrentUserId') ");
    }
    this.props.getProfile(userId as number);
    this.props.getStatus(userId as number);
  }
  componentDidMount() {
    this.refreshData();
  }

  componentDidUpdate(prevProps: PropsType) {
    if (this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshData();
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        updateStatus={this.props.updateStatus}
        status={this.props.status}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
      />
    );
  }
}
const mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    // authUserId: state.auth.authUserId,
    CurrentUserId: state.auth.userId,
  };
};

/* let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
let ProfileRouter=withRouter(AuthRedirectComponent)
export default connect(mapStateToProps, { getProfile })(ProfileRouter); */
export default compose<React.ComponentType>(
  connect(mapStateToProps, { getProfile, updateStatus, getStatus, savePhoto, saveProfile }),
  withRouter,
  //withAuthRedirect,
)(ProfileContainer);

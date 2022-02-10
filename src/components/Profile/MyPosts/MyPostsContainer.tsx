import { actions } from '../../../redux/profile-reducer';
import MyPosts, { MapDispatchToProps, MapStatePropsType } from './MyPosts';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  };
};

const MyPostsContainer = connect<MapStatePropsType, MapDispatchToProps, {}, AppStateType>(
  mapStateToProps,
  { addPost: actions.addPostActionCreator },
)(MyPosts);

export default MyPostsContainer;

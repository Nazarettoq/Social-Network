import { Dispatch } from 'redux';
import { ResultCodeEnum } from '../API/api';
import { followAPI } from '../API/follow-api';
import { userAPI } from '../API/user-api';
import { PhotosType, UsersType } from '../types/types';
import { AppStateType, BaseThunkType, InferActionsTypes } from './redux-store';

let initialState = {
  users: [] as Array<UsersType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingProgress: [] as Array<number>, //array of users id
  filter: {
    term: '',
    friend: null as null | boolean,
  },
};
const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'FOLLOW_USER':
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      }; //users:[...state.users]== users:state.users.map(u=>u)
    case 'UNFOLLOW_USER':
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    case 'SET_USERS':
      return { ...state, users: action.users };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.currentPage };
    case 'SET_TOTAL_PAGES':
      return { ...state, totalUsersCount: action.totalUsersCount };
    case 'IS_FEATCHING':
      return { ...state, isFetching: action.isFetching };
    case 'FOLLOWING_PROGRESS': {
      return {
        ...state,
        followingProgress: action.isFetching
          ? [...state.followingProgress, action.userId]
          : state.followingProgress.filter((id) => id !== action.userId),
      };
    }
    case 'SET_FILTER': {
      return {
        ...state,
        filter: action.payload,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  follow: (userId: number) =>
    ({
      type: 'FOLLOW_USER',
      userId,
    } as const),
  unfollow: (userId: number) =>
    ({
      type: 'UNFOLLOW_USER',
      userId,
    } as const),
  setUsers: (users: Array<UsersType>) =>
    ({
      type: 'SET_USERS',
      users,
    } as const),
  setFilter: (filter: FilterType) =>
    ({
      type: 'SET_FILTER',
      payload: filter,
    } as const),
  setCurrentPage: (currentPage: number) =>
    ({
      type: 'SET_CURRENT_PAGE',
      currentPage,
    } as const),
  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: 'SET_TOTAL_PAGES',
      totalUsersCount,
    } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: 'IS_FEATCHING',
      isFetching,
    } as const),
  toggleIsFollowProgress: (isFetching: boolean, userId: number) =>
    ({
      type: 'FOLLOWING_PROGRESS',
      isFetching,
      userId,
    } as const),
};

export const getUsersThunkCreator = (
  currentPage: number,
  pageSize: number,
  filter: FilterType,
): TunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setFilter(filter));
    let data = await userAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
    dispatch(actions.setCurrentPage(currentPage));
  };
};
export const setUserUnfollowThunkCreator = (userID: number): TunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFollowProgress(true, userID));
    let response = await followAPI.setUnfollow(userID);
    if (response.resultCode === 0) {
      dispatch(actions.unfollow(userID));
      dispatch(actions.toggleIsFollowProgress(false, userID));
    }
  };
};
export const setUserFollowThunkCreator = (userID: number): TunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFollowProgress(true, userID));
    let response = await followAPI.setFollow(userID);
    if (response.resultCode == 0) {
      dispatch(actions.follow(userID));
      dispatch(actions.toggleIsFollowProgress(false, userID));
    }
  };
};
export default usersReducer;
export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;
type ActionsTypes = InferActionsTypes<typeof actions>;
type TunkType = BaseThunkType<ActionsTypes>;

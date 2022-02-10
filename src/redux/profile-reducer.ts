import { FormAction, stopSubmit } from 'redux-form';
import { profileAPI } from '../API/profile-api';
import { PhotosType, ProflieType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-store';

let initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 },
    { id: 3, message: 'Blabla', likesCount: 11 },
    { id: 4, message: 'Dada', likesCount: 11 },
  ],

  profile: null as ProflieType | null,
  status: '',
};
export const actions = {
  addPostActionCreator: (newPostText: string) =>
    ({
      type: 'ADD_POST',
      newPostText,
    } as const),
  deletePost: (id: number) => ({ type: 'DELETE_POST', id } as const),
  setPhotoSuccess: (photos: PhotosType) =>
    ({
      type: 'SET_PHOTO_SUCCESS',
      photos,
    } as const),
  setProfile: (profile: ProflieType) =>
    ({
      type: 'SET_PROFILE',
      profile,
    } as const),
  setStatus: (status: string) =>
    ({
      type: 'SET_STATUS',
      status,
    } as const),
};

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'ADD_POST': {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };
      //copyState
      return { ...state, posts: [...state.posts, newPost] }; //copyState.posts.push(newPost);
    }

    case 'SET_PROFILE': {
      return { ...state, profile: action.profile };
    }
    case 'SET_STATUS': {
      return { ...state, status: action.status };
    }
    case 'DELETE_POST': {
      return { ...state, posts: state.posts.filter((p) => p.id !== action.id) };
    }
    case 'SET_PHOTO_SUCCESS': {
      return { ...state, profile: { ...state.profile, photos: action.photos } as ProflieType };
    }
    default:
      return state;
  }
};

export const getProfile =
  (userId: number): TunkType =>
  async (dispatch) => {
    const data = await profileAPI.setUserId(userId);
    dispatch(actions.setProfile(data));
  };
export const getStatus =
  (userId: number): TunkType =>
  async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
  };
export const updateStatus =
  (status: string): TunkType =>
  async (dispatch) => {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
      dispatch(actions.setStatus(status));
    }
  };
export const savePhoto =
  (file: File): TunkType =>
  async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
      dispatch(actions.setPhotoSuccess(data.data.photos));
    }
  };
export const saveProfile =
  (profile: ProflieType): TunkType =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
      if (userId != null) {
        dispatch(getProfile(userId));
      } else {
        throw new Error('UserId can`t be null');
      }
    } else {
      dispatch(stopSubmit('edit-profile', { _error: data.messages[0] }));
      return Promise.reject(data.messages[0]);
    }
  };

export default profileReducer;

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type TunkType = BaseThunkType<ActionsTypes | FormAction>;

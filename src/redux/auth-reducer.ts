import { FormAction, stopSubmit } from 'redux-form';
import { ResultCodeEnum } from '../API/api';
import { authAPI } from '../API/auth-api';
import { profileAPI } from '../API/profile-api';
import { securityAPI } from '../API/security-api';
import { BaseThunkType, InferActionsTypes } from './redux-store';

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  smallPhoto: null as string | null,
  captchaURL: null as string | null,
};
const actions = {
  setUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
  ) =>
    ({
      type: 'SET-USER-DATA',
      data: {
        userId,
        email,
        login,
      },
      isAuth,
    } as const),
  setPhoto: (smallPhoto: string | null) =>
    ({
      type: 'SET-SMALL-PHOTO',
      smallPhoto,
    } as const),
  setCaptcha: (captchaURL: string) =>
    ({
      type: 'SET_CAPTCHA',
      captchaURL,
    } as const),
};
const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SET-USER-DATA': {
      return {
        ...state,
        ...action.data,
        isAuth: action.isAuth,
      };
    }
    case 'SET-SMALL-PHOTO': {
      return { ...state, smallPhoto: action.smallPhoto };
    }
    case 'SET_CAPTCHA': {
      return { ...state, captchaURL: action.captchaURL };
    }
    default:
      return state;
  }
};

export const getMyData = (): TunkType => async (dispatch) => {
  let response = await authAPI.setMyData();
  // this.props.toggleIsFetching(false);
  if (response.resultCode === 0) {
    const { id, email, login } = response.data;
    const responsePhoto = await profileAPI.setHeaderPhoto(id);
    dispatch(actions.setUserData(id, email, login, true));
    if (responsePhoto.photos.small != null) {
      dispatch(actions.setPhoto(responsePhoto.photos.small));
    }
  }
};

export const login =
  (email: string, password: string, rememberMe: boolean, captcha: string): TunkType =>
  async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === ResultCodeEnum.Success) {
      dispatch(getMyData());
    } else {
      if (response.resultCode === ResultCodeEnum.Captcha) {
        dispatch(getCaptcha());
      } else {
        let message = response.messages.length > 0 ? response.messages[0] : 'Some error';
        dispatch(stopSubmit('login', { _error: message }));
      }
    }
  };
export const getCaptcha = (): TunkType => async (dispatch) => {
  let data = await securityAPI.getCaptcha();
  const captchaURL = data.url;
  dispatch(actions.setCaptcha(captchaURL));
};
export const logout = (): TunkType => async (dispatch) => {
  return authAPI.logout().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(actions.setUserData(null, null, null, false));
    }
  });
};
export default authReducer;

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type TunkType = BaseThunkType<ActionsTypes | FormAction>;

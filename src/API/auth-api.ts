import { instance, GlobalResponseType } from './api';

type MyDataResponseType = {
  id: number;
  email: string;
  login: string;
};
type LoginResponseType = {
  userId: number;
};
export const authAPI = {
  setMyData() {
    return instance.get<GlobalResponseType<MyDataResponseType>>(`auth/me`).then((res) => res.data);
  },

  login(email: string, password: string, rememberMe = false, captcha: null | string) {
    return instance
      .post<GlobalResponseType<LoginResponseType>>('/auth/login', {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data);
  },
  logout() {
    return instance.delete('/auth/login');
  },
};

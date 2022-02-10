import axios from 'axios';
import {  ProflieType, UsersType } from '../types/types';

export const  instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '9e1c6dfa-c140-4fe9-b0be-3c56f2332e89',
    //'API-KEY': '0cbb47ad-c06b-4504-aa1a-db4aea17dec6',
  },
});


export enum ResultCodeEnum{
 Success= 0,
 Error= 1,
 Captcha = 10
 

}
//export enum ResultCodeForCaptchaEnum{ Captcha = 10}
export type GlobalResponseType<D={}, RC=ResultCodeEnum>={
  data:D
  messages: Array<string>
  resultCode: RC
}

export type GetItemsType={
  items: Array<UsersType>
  totalCount: number;
  error: string | null;
}








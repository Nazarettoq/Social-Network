import { PhotosType } from '../types/types';
import { GetItemsType, instance } from './api';

export const userAPI = {
  getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
    return instance
      .get<GetItemsType>(
        `users?page=${currentPage}&count=${pageSize}&term=${term}` +
          (friend === null ? '' : `&friend=${friend}`),
      )
      .then((response) => {
        return response.data;
      });
  },
};

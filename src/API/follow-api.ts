import { GlobalResponseType, instance } from './api';

export const followAPI = {
  setUnfollow(id: number) {
    return instance.delete<GlobalResponseType>(`follow/${id}`).then((res) => res.data);
  },
  setFollow(id: number) {
    return instance.post<GlobalResponseType>(`follow/${id}`).then((res) => res.data);
  },
};

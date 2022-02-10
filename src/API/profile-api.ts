import { PhotosType, ProflieType } from '../types/types';
import { GlobalResponseType, instance } from './api';

type SavePhotoResponseType = {
  photos: PhotosType;
};
export const profileAPI = {
  setHeaderPhoto(id: number) {
    return instance.get<SavePhotoResponseType>(`profile/${id}`).then((res) => res.data);
  },
  setUserId(userId: number) {
    return instance.get<ProflieType>(`profile/${userId}`).then((res) => res.data);
  },
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`).then((res) => res.data);
  },
  updateStatus(status: string) {
    return instance
      .put<GlobalResponseType>('profile/status', { status: status })
      .then((res) => res.data);
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append('image', photoFile);

    return instance
      .put<GlobalResponseType<SavePhotoResponseType>>('profile/photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data);
  },
  saveProfile(profile: ProflieType) {
    return instance.put<GlobalResponseType>(`profile`, profile).then((res) => res.data);
  },
};

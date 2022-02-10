import React, { ChangeEvent, useEffect, useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import userPhoto from '../../../assets/img/profilePhoto.jpg';
import ProfileStatus from './ProfileStatusHOC';
import uploadIcon from '../../../assets/img/Upload_user_photo.png';
import ProfileData from './ProfileData';
import ProfileDataFormReduxForm from './ProfileDataForm';
import { ProflieType } from '../../../types/types';

type PropsType = {
  profile: ProflieType | null;
  isOwner: boolean;

  updateStatus: (status: string) => void;
  status: string;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProflieType) => Promise<any>;
};
const ProfileInfo: React.FC<PropsType> = (props) => {
  let [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />;
  }
  const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (FormData: ProflieType) => {
    // todo: remove then
    props.saveProfile(FormData).then(() => {
      setEditMode(false);
    });
    // setEditMode(false);
  };
  return (
    <div>
      <div className={s.profileHead}>
        <div className={s.block}>
          <img src="https://img2.goodfon.ru/wallpaper/nbig/5/c2/date-a-live-tokisaki-kurumi-333.jpg" />
        </div>
        <div>
          <img
            className={s.profilePic}
            src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto}
          />
        </div>
        <div>
          {props.isOwner && (
            <label className={s.inputFile}>
              <input type={'file'} onChange={onPhotoSelected} />
              <img className={s.uploadIcon} src={uploadIcon} />
            </label>
          )}
        </div>
        <h1>{props.profile.fullName}</h1>
      </div>
      <ProfileStatus
        updateStatus={props.updateStatus}
        status={props.status}
        isOwner={props.isOwner}
      />
      {editMode ? (
        <ProfileDataFormReduxForm
          initialValues={props.profile}
          onSubmit={onSubmit}
          profile={props.profile}
        />
      ) : (
        <ProfileData
          profile={props.profile}
          isOwner={props.isOwner}
          toEditMode={() => {
            setEditMode(true);
          }}
        />
      )}
    </div>
  );
};

export default ProfileInfo;

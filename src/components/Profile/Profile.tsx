import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProflieType } from '../../types/types';

type PropsType = {
  profile: ProflieType | null;
  isOwner: boolean;

  updateStatus: (status: string) => void;
  status: string;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProflieType) => Promise<any>;
};
const Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo
        isOwner={props.isOwner}
        profile={props.profile}
        updateStatus={props.updateStatus}
        status={props.status}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;

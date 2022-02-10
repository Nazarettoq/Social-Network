import react, { useState } from 'react';
import { ContactsType, ProflieType } from '../../../types/types';
import s from './ProfileInfo.module.css';

type ProfileDataPropsType={
  isOwner:boolean
  profile: ProflieType
  toEditMode:()=>void
}
const ProfileData: React.FC<ProfileDataPropsType> = (props) => {
  const [contactActive, setConactActive] = useState(false);

  const showContacs = () => {
    setConactActive(!contactActive);
  };
  return (
    <div className={s.descriptionBlock}>
      {props.isOwner && (
        <div className={s.MyInformation}>
          <button className={s.MyInformation} onClick={props.toEditMode}>
            Edit my information
          </button>
        </div>
      )}
      <div className="jobInfo">
        <div>Looking for a job: {props.profile.lookingForAJob ? 'yes' : 'no'} </div>
        {props.profile.lookingForAJob && (
          <div>My skills: {props.profile.lookingForAJobDescription}</div>
        )}
      </div>
      <div>
        <b onClick={showContacs} className={s.contact}>
          Contact:
        </b>

        <div>
          {contactActive ? (
            <div className={s.userContacts}>
              {Object.keys(props.profile.contacts).map((key) => {
                return <Contact contactTitel={key} contactValue={props.profile.contacts[key as keyof ContactsType]} />;
              })}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

type ContactPropsType={
  contactTitel: string
   contactValue: string
}
const Contact: React.FC<ContactPropsType> = ({ contactTitel, contactValue }) => {
  return (
    <div>
      {contactTitel}: {contactValue}
    </div>
  );
};

export default ProfileData;

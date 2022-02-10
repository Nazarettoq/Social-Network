import React, { useEffect, useState } from 'react';

type PropsType = {
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
};
const ProfileStatus: React.FC<PropsType> = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);
  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEdinMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };
  const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };
  return (
    <div>
      {!editMode && (
        <div>
          <span onDoubleClick={() => props.isOwner && activateEditMode}>
            {props.status || 'About me'}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            autoFocus={true}
            onBlur={deactivateEdinMode}
            onChange={onStatusChange}
            value={status}
          />
        </div>
      )}
    </div>
  );
};
export default ProfileStatus;

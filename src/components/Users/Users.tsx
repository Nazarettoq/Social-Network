import React from 'react';
import s from './Users.module.css';
import { NavLink } from 'react-router-dom';
import userPhoto from './../../assets/img/profilePhoto.jpg';
import UsersSearchForm from './UsersSearchForm';
import {
  FilterType,
  getUsersThunkCreator,
  setUserFollowThunkCreator,
  setUserUnfollowThunkCreator,
} from '../../redux/users-reducer';
import { getFollowingProgress, getPageSize, getUsers } from '../../redux/users-selectors';
import { useDispatch, useSelector } from 'react-redux';

type PropsType = {};

export const Users: React.FC<PropsType> = () => {
  const dispatch = useDispatch();
  //useEffect(()=>{  dispatch (getUsersThunkCreator(currentPage, pageSize,filter))},[])
  const pageSize = useSelector(getPageSize);
  const users = useSelector(getUsers);
  const followingProgress = useSelector(getFollowingProgress);

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsersThunkCreator(1, pageSize, filter));
  };
  const setUserUnfollow = (UserId: number) => {
    dispatch(setUserUnfollowThunkCreator(UserId));
  };
  const setUserFollow = (UserId: number) => {
    dispatch(setUserFollowThunkCreator(UserId));
  };

  return (
    <div>
      <div>
        {' '}
        <UsersSearchForm onFilterChange={onFilterChanged} />
      </div>
      {users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <NavLink to={'/profile/' + u.id}>
                <img className={s.item} src={u.photos.small != null ? u.photos.small : userPhoto} />
              </NavLink>
            </div>
            <div>
              {u.followed ? (
                <button
                  disabled={followingProgress.some((id) => id === u.id)}
                  onClick={() => {
                    setUserUnfollow(u.id);
                  }}>
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={followingProgress.some((id) => id === u.id)}
                  onClick={() => {
                    setUserFollow(u.id);
                  }}>
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>"u.location.country"</div>
              <div>"u.location.city"</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

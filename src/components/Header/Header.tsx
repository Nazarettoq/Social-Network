import React, { Dispatch } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import userPhoto from '../../assets/img/profilePhoto.jpg';

export type MapPropsType = {
  isAuth: boolean;
  loginName: string | null;

  smallPhoto: string | null;
};
export type DispatchPropsType = {
  logout: () => void;
};
const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  return (
    <header className={s.header}>
      <div>
        {props.isAuth ? (
          <div className={s.vs}>
            <NavLink to="/profile">
              <div className={s.headerImg}>
                <img src={props.smallPhoto ? props.smallPhoto : userPhoto} />
              </div>
            </NavLink>
            <div>
              {props.loginName}
              <button className={s.Login} onClick={props.logout}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <NavLink className={s.Login} to="/login">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;

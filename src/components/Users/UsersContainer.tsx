import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { getUsersThunkCreator } from '../../redux/users-reducer';
import Preloader from './../common/Preloader/Preloader';

import {
  getCurrentPage,
  getIsFetching,
  getPageSize,
  getUsersFilter,
} from '../../redux/users-selectors';
import Paginatior from './Paginator';
import { Users } from './Users';
import * as queryString from 'querystring';
import { useHistory } from 'react-router-dom';
type UserPagePropsType = {};
type QueryParamsType = {
  term?: string;
  friend?: string;
  page?: string;
};
export const UserPage: React.FC<UserPagePropsType> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentPage = useSelector(getCurrentPage);
  const filter = useSelector(getUsersFilter);
  const pageSize = useSelector(getPageSize);
  const isFetching = useSelector(getIsFetching);

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType; //substr because frist symbol ?
    let actualPage = currentPage;
    if (parsed.page) actualPage = Number(parsed.page);
    let actualFilter = filter;
    if (parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string };
    if (parsed.friend)
      actualFilter = {
        ...actualFilter,
        friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false,
      };

    dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter));
  }, []);

  useEffect(() => {
    const query: QueryParamsType = {};
    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);
    history.push({
      pathname: '/users',
      search: queryString.stringify(query),
    });
  }, [filter, currentPage]);

  return (
    <>
      <Paginatior />
      {isFetching ? <Preloader /> : <Users />}
    </>
  );
};

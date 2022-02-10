import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersThunkCreator } from '../../redux/users-reducer';
import {
  getCurrentPage,
  getPageSize,
  getTotalUsersCount,
  getUsersFilter,
} from '../../redux/users-selectors';
import s from './Users.module.css';

type PropsType = {};

const Paginatior: React.FC<PropsType> = (props) => {
  const dispatch = useDispatch();

  //  useEffect(()=>{   getUsersThunkCreator(currentPage, pageSize,filter);   },[])

  const totalItemsCount = useSelector(getTotalUsersCount);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);
  const filter = useSelector(getUsersFilter);
  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsersThunkCreator(pageNumber, pageSize, filter));
  };
  const portionSize = 10;
  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;
  return (
    <div>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}>
          Prev
        </button>
      )}
      {pages
        .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map((p) => {
          return (
            <span
              className={(currentPage === p && s.selectPage) || s.Page}
              onClick={() => {
                onPageChanged(p);
              }}>
              {p}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}>
          Next
        </button>
      )}
    </div>
  );
};
export default Paginatior;

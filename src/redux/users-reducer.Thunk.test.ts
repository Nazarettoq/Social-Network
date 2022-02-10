import { GlobalResponseType, ResultCodeEnum } from '../API/api';
import { followAPI } from '../API/follow-api';
import { actions, setUserFollowThunkCreator, setUserUnfollowThunkCreator } from './users-reducer';

jest.mock('../API/follow-api');
const followAPIMock = followAPI as jest.Mocked<typeof followAPI>;

const result: GlobalResponseType = {
  resultCode: ResultCodeEnum.Success,
  messages: [],
  data: {},
};

test('Follow-Thunk', async () => {
  followAPIMock.setFollow.mockReturnValue(Promise.resolve(result));
  const thunk = setUserFollowThunkCreator(1);
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowProgress(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowProgress(false, 1));
});
test('Unfollow-Thunk', async () => {
  followAPIMock.setUnfollow.mockReturnValue(Promise.resolve(result));
  const thunk = setUserUnfollowThunkCreator(2);
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowProgress(true, 2));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollow(2));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowProgress(false, 2));
});

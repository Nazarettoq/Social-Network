import usersReducer, { actions, InitialStateType } from './users-reducer';
let state: InitialStateType;
beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: 'Nazar 1',
        followed: false,
        photos: { small: null, large: null },
        status: 'status 1',
      },
      {
        id: 1,
        name: 'Dima 2',
        followed: false,
        photos: { small: null, large: null },
        status: 'status 2',
      },
      {
        id: 2,
        name: 'Sara 3',
        followed: true,
        photos: { small: null, large: null },
        status: 'status 3',
      },
      {
        id: 3,
        name: 'Iva 4',
        followed: true,
        photos: { small: null, large: null },
        status: 'status 4',
      },
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingProgress: [],
    filter: {
      term: '',
      friend: null as null | boolean,
    },
  };
});
test('follow success', () => {
  let newState = usersReducer(state, actions.follow(1));
  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
});
test('unfollow success', () => {
  let newState = usersReducer(state, actions.unfollow(2));
  expect(newState.users[2].followed).toBeFalsy();
  expect(newState.users[3].followed).toBeTruthy();
});

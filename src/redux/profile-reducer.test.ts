import profileReducer, { actions, InitialStateType } from './profile-reducer';

const state: InitialStateType = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 },
    { id: 3, message: 'Blabla', likesCount: 11 },
    { id: 4, message: 'Dada', likesCount: 11 },
  ],
  profile: null,
  status: '',
};

test('new post should be added', () => {
  //1-test data
  let action = actions.addPostActionCreator('Hello boss');

  //2-action
  let newState = profileReducer(state, action);
  //3-expectation
  expect(newState.posts.length).toBe(5);
});
test('new post should be correct', () => {
  //1-test data
  let action = actions.addPostActionCreator('Hello boss');

  //2-action
  let newState = profileReducer(state, action);
  //3-expectation
  expect(newState.posts[4].message).toBe('Hello boss');
});
test('decrement of posts', () => {
  //1-test data
  let action = actions.deletePost(1);

  //2-action
  let newState = profileReducer(state, action);
  //3-expectation
  expect(newState.posts.length).toBe(3);
});

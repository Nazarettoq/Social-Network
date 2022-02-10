import { getMyData } from './auth-reducer';
import { InferActionsTypes } from './redux-store';

let initialState = { initialized: false };
type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

const actions = {
  initializedSuccess: () =>
    ({
      type: 'SET_INITIALIZED',
    } as const),
};

const AppReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SET_INITIALIZED': {
      return { ...state, initialized: true };
    }
    default:
      return state;
  }
};

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getMyData());

  Promise.all([promise]).then(() => {
    dispatch(actions.initializedSuccess());
  });
};
export default AppReducer;

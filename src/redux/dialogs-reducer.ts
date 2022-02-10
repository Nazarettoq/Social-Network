import { InferActionsTypes } from './redux-store';

type DialogsType = {
  id: number;
  name: string;
};
type MessagesType = {
  id: number;
  message: string;
};
let initialState = {
  dialogs: [
    { id: 1, name: 'Dimych' },
    { id: 2, name: 'Andrew' },
    { id: 3, name: 'Sveta' },
    { id: 4, name: 'Sasha' },
    { id: 5, name: 'Viktor' },
    { id: 6, name: 'Valera' },
  ] as Array<DialogsType>,
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'How is your it-kamasutra?' },
    { id: 3, message: 'Yo' },
    { id: 4, message: 'Yo' },
    { id: 5, message: 'Yo' },
  ] as Array<MessagesType>,
};
export const actions = {
  sendMessage: (NewMessage: string) =>
    ({
      type: 'SEND_MESSAGE',
      NewMessage,
    } as const),
};
const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SEND_MESSAGE': {
      let body = action.NewMessage;
      //copyState
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: body }], //copyState.messages.push({ id: 6, message: body });
      };
    }
    default:
      return state;
  }
};

export default dialogsReducer;
export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

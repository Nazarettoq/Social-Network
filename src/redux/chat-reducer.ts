import { Dispatch } from 'redux';
import { FormAction } from 'redux-form';
import { chatAPI, ChatMessageAPIType, StatusType } from '../API/chat-api';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { v1 } from 'uuid';
export type ChatMessageType = ChatMessageAPIType & { id: string };
let initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType,
};

const actions = {
  messagesReceived: (messages: ChatMessageAPIType[]) =>
    ({
      type: 'SET-MESSAGES',
      payload: { messages },
    } as const),
  statusChanged: (status: StatusType) =>
    ({
      type: 'STATUS-CHANGED',
      payload: { status },
    } as const),
};
const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SET-MESSAGES': {
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.payload.messages.map((m) => ({ ...m, id: v1() })),
        ].filter((m, index, array) => index >= array.length - 100),
      };
    }
    case 'STATUS-CHANGED': {
      return { ...state, status: action.payload.status };
    }
    default:
      return state;
  }
};

let _newMessagesHeandler: ((messages: ChatMessageAPIType[]) => void) | null = null;
const newMessagesHeandlerCreator = (dispatch: Dispatch) => {
  if (_newMessagesHeandler === null) {
    _newMessagesHeandler = (messages) => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessagesHeandler;
};
let _newStatusHeandler: ((status: StatusType) => void) | null = null;
const newStatusHeandlerCreator = (dispatch: Dispatch) => {
  if (_newStatusHeandler === null) {
    _newStatusHeandler = (status) => {
      dispatch(actions.statusChanged(status));
    };
  }
  return _newStatusHeandler;
};

export const startMessagesListening = (): TunkType => async (dispatch) => {
  chatAPI.start();
  chatAPI.subscribe('messages-recived', newMessagesHeandlerCreator(dispatch));
  chatAPI.subscribe('status-changed', newStatusHeandlerCreator(dispatch));
};
export const stopMessagesListening = (): TunkType => async (dispatch) => {
  chatAPI.unsubscribe('messages-recived', newMessagesHeandlerCreator(dispatch));
  chatAPI.unsubscribe('status-changed', newStatusHeandlerCreator(dispatch));
  chatAPI.stop();
};
export const sendMessage =
  (message: string): TunkType =>
  async (dispatch) => {
    chatAPI.sendMessage(message);
  };

export default chatReducer;
type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type TunkType = BaseThunkType<ActionsTypes | FormAction>;

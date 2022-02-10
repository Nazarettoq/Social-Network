let subscribers = {
  'messages-recived': [] as MessagesReceivedSubscribersType[],
  'status-changed': [] as StatusChangedSubscribersType[],
};

type eventsNameType = 'messages-recived' | 'status-changed';
let ws: WebSocket | null = null;
const notifySubsAboutStatus = (status: StatusType) => {
  subscribers['status-changed'].forEach((s) => s(status));
};
const closeHandler = () => {
  console.log('CLOSE WS');
  notifySubsAboutStatus('pending');
  setTimeout(createChannel, 3000);
};

const messagesHeandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);

  subscribers['messages-recived'].forEach((s) => s(newMessages));
};
const openHeandler = () => {
  notifySubsAboutStatus('ready');
};
const errorHeandler = () => {
  notifySubsAboutStatus('error');
  console.error('REFRESH PAGE');
};
const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler);
  ws?.removeEventListener('message', messagesHeandler);
  ws?.removeEventListener('open', openHeandler);
  ws?.removeEventListener('error', errorHeandler);
};
function createChannel() {
  cleanUp();
  ws?.close();

  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  notifySubsAboutStatus('pending');
  ws.addEventListener('close', closeHandler);
  ws.addEventListener('message', messagesHeandler);
  ws.addEventListener('open', openHeandler);
  ws.addEventListener('error', errorHeandler);
}

export const chatAPI = {
  start() {
    createChannel();
  },
  stop() {
    subscribers['messages-recived'] = [];
    subscribers['status-changed'] = [];
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('message', messagesHeandler);
    ws?.close();
  },
  subscribe(
    eventName: eventsNameType,
    callback: MessagesReceivedSubscribersType | StatusChangedSubscribersType,
  ) {
    //@ts-ignore
    subscribers[eventName].push(callback);
    return () => {
      //@ts-ignore
      subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
    };
  },
  unsubscribe(
    eventName: eventsNameType,
    callback: MessagesReceivedSubscribersType | StatusChangedSubscribersType,
  ) {
    //@ts-ignore
    subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
  },
  sendMessage(message: string) {
    ws?.send(message);
  },
};

export type ChatMessageAPIType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
export type StatusType = 'pending' | 'ready' | 'error';
type MessagesReceivedSubscribersType = (messages: ChatMessageAPIType[]) => void;
type StatusChangedSubscribersType = (status: StatusType) => void;

import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatMessageAPIType } from '../../API/chat-api';
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from '../../redux/chat-reducer';
import { AppStateType } from '../../redux/redux-store';

export const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};
const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const status = useSelector((state: AppStateType) => state.chat.status);
  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      <Messages />
      <AddMassageForm />
    </div>
  );
};
const Messages: React.FC = () => {
  console.log('messages_____');
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const [isAutoScroll, setisAutoScroll] = useState(true);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (isAutoScroll) {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'auto',
      });
    }
  };
  const scrollHeandler = (e: React.UIEvent<HTMLElement>) => {
    const element = e.currentTarget;
    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) <= 300) {
      console.log('scrolled');
      !isAutoScroll && setisAutoScroll(true);
    } else {
      console.log('scrolling....');
      isAutoScroll && setisAutoScroll(false);
    }
  };
  useEffect(scrollToBottom, [messages]);
  return (
    <div style={{ height: '400px', overflowY: 'auto' }} onScroll={scrollHeandler}>
      {messages.map((m, index) => (
        <Message key={index} message={m} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({ message }) => {
  console.log('message+++++');
  return (
    <div>
      <img style={{ width: '40px' }} src={message.photo} />
      <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  );
});
const AddMassageForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const status = useSelector((state: AppStateType) => state.chat.status);
  const dispatch = useDispatch();

  const sendMessageHeandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message));
    setMessage('');
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (status == 'ready') {
      if (e.key === 'Enter') {
        e.preventDefault();
        console.log('enter press here! ');
        sendMessageHeandler();
      }
    }
  };
  return (
    <div>
      <div>
        <textarea
          onKeyPress={handleKeyPress}
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}></textarea>
      </div>
      <div>
        <button disabled={status !== 'ready'} onClick={sendMessageHeandler}>
          Send
        </button>
      </div>
    </div>
  );
};

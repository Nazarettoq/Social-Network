import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { InitialStateType } from '../../redux/dialogs-reducer';


type MapStatePropsType={
  dialogsPage: InitialStateType
  sendMessage:(messageText:string)=>void
}

type NewMessageFormType={
  NewMessage:string
}
type MessageFormOwnPorps={

}
let MessageForm: React.FC<InjectedFormProps<NewMessageFormType,MessageFormOwnPorps>&MessageFormOwnPorps> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      
      <div>
        <Field component={'input'} name={'NewMessage'} placeholder="Enter your message" />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};
let ReduxMessageForm = reduxForm<NewMessageFormType>({
  form: 'Message',
})(MessageForm);


const Dialogs: React.FC<MapStatePropsType> = (props) => {
  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map((d) => <DialogItem name={d.name} id={d.id} />);
  let messagesElements = state.messages.map((m) => <Message message={m.message} />);

  let onSendMessage = (value: {NewMessage:string}) => {
    props.sendMessage(value.NewMessage);
    value.NewMessage = '';
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <ReduxMessageForm onSubmit={onSendMessage} />
      </div>
    </div>
  );
};

export default Dialogs;

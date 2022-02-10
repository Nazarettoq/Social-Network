import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import s from './ProfileInfo.module.css';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Input } from '../../common/FormsControl/FormsControl';
import styles from '../../common/FormsControl/FormsControl.module.css';
import { ProflieType } from '../../../types/types';
type PropsType={
  profile:ProflieType
}
const ProfileDataForm: React.FC<InjectedFormProps<ProflieType,PropsType > & PropsType>  = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        Looking for a job:
        <Field component={Input} name={'lookingForAJob'} type={'checkbox'} />
      </div>
      <div>
        What can i do:
        <Field component={Input} name={'lookingForAJobDescription'} />
      </div>
      <div>
        {props.error ? <div className={styles.someError}> {props.error}</div> : ''}
        <b>Contact: </b>
        <div className={s.userContacts}>
          {Object.keys(props.profile.contacts).map((key) => {
            return (
              <div key={key} className={s.contact}>
                {key}: <Field component={Input} name={'contacts.' + key} placeholder={key} />
              </div>
            );
          })}
        </div>
      </div>
      <button>Save</button>
    </form>
  );
};
const ProfileDataFormReduxForm = reduxForm<ProflieType, PropsType>({ form: 'edit-profile' })(ProfileDataForm);
export default ProfileDataFormReduxForm;

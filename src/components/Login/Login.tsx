import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { login } from '../../redux/auth-reducer';
import { Input } from '../common/FormsControl/FormsControl';
import { requiredField } from '../Helpers/Validation/validator';
import styles from '../common/FormsControl/FormsControl.module.css';
import { AppStateType } from '../../redux/redux-store';


type LoginFromValuesType={
  email: string, password: string, rememberMe: boolean, captcha: string
}
type LoginFormOwnPorps={
  captchaURL:string | null
}

const LoginForm: React.FC <InjectedFormProps<LoginFromValuesType,LoginFormOwnPorps > & LoginFormOwnPorps> = (props) => {

  return (
    <form onSubmit={props.handleSubmit}>
      {props.error ? <div className={styles.someError}> {props.error}</div> : ''}
      <div>
        <Field component={Input} validate={requiredField} name={'email'} placeholder={'Email'} />
      </div>
      <div>
        <Field
          component={Input}
          validate={requiredField}
          name={'password'}
          placeholder={'Password'}
          type={'password'}
        />
      </div>
      <div>
        <Field component={Input} name={'rememberMe'} type={'checkbox'} /> remember me
      </div>
      <div>
        {props.captchaURL ? (
          <div>
            <img src={props.captchaURL} />
            <Field component={Input} validate={requiredField} name={'captcha'} />
          </div>
        ) : (
          ''
        )}
      </div>

      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const ReduxLoginForm = reduxForm<LoginFromValuesType, LoginFormOwnPorps>({
  form: 'login',
})(LoginForm);

export const LoginPage: React.FC = (props) => {
  const dispatch=useDispatch()
  const isAuth=useSelector((state:AppStateType)=>state.auth.isAuth)
  const captchaURL= useSelector((state:AppStateType)=>state.auth.captchaURL)

  const onSubmit = (formData:any) => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
  };
  if (isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <div>
      <div className={styles.LoginLogo}>Login</div>
      <ReduxLoginForm onSubmit={onSubmit} captchaURL={captchaURL} />
    </div>
  );
};

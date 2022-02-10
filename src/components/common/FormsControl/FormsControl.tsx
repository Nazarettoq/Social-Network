import React from 'react';
import { AppStateType } from '../../../redux/redux-store';
import styles from './FormsControl.module.css';

type PropsType={
input:any,
meta: any,
child:any
}
const FormControl: React.FC<PropsType> = ({ input, meta, child, ...props }) => {
  const showError = meta.touched && meta.error;

  return (
    <div className={styles.formControl + ' ' + (showError ? styles.error : '')}>
      <div>{props.children}</div>
      {showError && <span>{meta.error}</span>}
    </div>
  );
};
export const Textarea: React.FC<PropsType> = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...props} {...input} {...restProps} />
    </FormControl>
  );
};
export const Input: React.FC<PropsType> = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...props} {...input} {...restProps} />
    </FormControl>
  );
};

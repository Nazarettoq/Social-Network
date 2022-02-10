import { actions } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';

import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import React from 'react';
import withAuthRedirect from '../hoc/AuthRedirect';
const mapStateToProps = (state:AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

export default compose<React.ComponentType>(connect(mapStateToProps, {sendMessage:actions.sendMessage}), withAuthRedirect)(Dialogs);

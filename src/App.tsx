import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import { initializeApp } from './redux/app-reducer';
import { Route, Switch, withRouter } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';

import ProfileContainer from './components/Profile/ProfileContainer';

import { connect } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { AppStateType } from './redux/redux-store';
import { UserPage } from './components/Users/UsersContainer';
import { LoginPage } from './components/Login/Login';
import { QueryParamProvider } from 'use-query-params';
import { ChatPage } from './pages/chats/ChatPage';

type MapPropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchType = {
  initializeApp: () => void;
};
class App extends React.Component<MapPropsType & MapDispatchType> {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Switch>
            <Route path="/dialogs" render={() => <DialogsContainer />} />
            <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
            <Route path="/users" render={() => <UserPage />} />
            <Route path="/login" render={() => <LoginPage />} />
            <Route path="/chat" render={() => <ChatPage />} />
            <Route path="*" render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: AppStateType) => {
  return { initialized: state.app.initialized };
};
const AppContainer = compose(connect(mapStateToProps, { initializeApp }))(App);

const MainApp: React.FC = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryParamProvider>
          {' '}
          <AppContainer />
        </QueryParamProvider>
      </Provider>
    </BrowserRouter>
  );
};
export default MainApp;

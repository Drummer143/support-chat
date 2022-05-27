import React from 'react';
import { Provider } from 'react-redux';

import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import store from './../../redux/store';

import styles from './App.module.css';

function App() {
  return (
    <Provider store={store}>
      <div className={styles.wrapper}>
        <SignUpForm /> 
      </div>
    </Provider>
  );
}

export default App;

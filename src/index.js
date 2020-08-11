import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import global style
import '@/styles/root.scss';

// locale을 설정합니다.
import koKR from 'antd/es/locale/ko_KR';
import moment from 'moment';
import * as serviceWorker from '@/serviceWorker';
import 'moment/locale/ko';

// default Route
import { AuthRoute } from '@/router';
import { Login } from '@/pages';

import App from './App';

moment.locale('ko');

// Provider 정의
// ConfigProvider = https://ant.design/components/config-provider/

const Root = () => {
  return (
    <ConfigProvider locale={koKR}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <AuthRoute path="*">
            <App />
          </AuthRoute>
        </Switch>
      </Router>
    </ConfigProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

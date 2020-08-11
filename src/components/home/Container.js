import React from 'react';
import { Layout } from 'antd';

import { WithFullLayout } from '@/layouts';
import logo from '@/assets/logo.svg';

const { Content } = Layout;

function Container() {
  return (
    <Layout className="home">
      <Content>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="hello">
          <h1>Welcome to Your React App</h1>
          <p>
            For a guide and recipes on how to configure / customize this
            project,
            <br />
            check out the
            <a href="https://create-react-app.dev" target="new" rel="noopener">
              &nbsp;Create React App documentation
            </a>
            .
          </p>
          <h3>Installed CLI Plugins</h3>
          <ul>
            <li>
              <a
                href="https://github.com/facebook/create-react-app"
                target="new"
                rel="noopener"
              >
                babel / webpack
              </a>
            </li>
            <li>
              <a
                href="https://github.com/facebook/create-react-app/tree/master/packages/react-scripts"
                target="new"
                rel="noopener"
              >
                react-scripts
              </a>
            </li>
            <li>
              <a
                href="https://github.com/facebook/create-react-app/tree/master/packages/react-app-polyfill"
                target="new"
                rel="noopener"
              >
                react-app-polyfill
              </a>
            </li>
          </ul>
          <h3>Essential Links</h3>
          <ul>
            <li>
              <a
                href="https://github.com/facebook/create-react-app"
                target="new"
                rel="noopener"
              >
                Core Docs
              </a>
            </li>
            <li>
              <a
                href="https://github.com/arackaf/customize-cra#readme"
                target="new"
                rel="noopener"
              >
                customize-cra
              </a>
            </li>
            <li>
              <a
                href="https://prettier.io/docs/en/cli.html"
                target="new"
                rel="noopener"
              >
                eslint & prettier (yarn lint)
              </a>
            </li>
          </ul>
          <h3>Ecosystem</h3>
          <ul>
            <li>
              <a
                href="https://reacttraining.com/react-router/web/guides/quick-start"
                target="new"
                rel="noopener"
              >
                react-router(web)
              </a>
            </li>
            <li>
              <a
                href="https://ko.reactjs.org/blog/2015/09/02/new-react-developer-tools.html"
                target="new"
                rel="noopener"
              >
                React Developer Tools
              </a>
            </li>
            <li>
              <a
                href="https://github.com/geelen/react-snapshot"
                target="new"
                rel="noopener"
              >
                react-snapshot(static pre-renderer for React apps)
              </a>
            </li>
          </ul>
        </div>
      </Content>
    </Layout>
  );
}

export default WithFullLayout(Container);

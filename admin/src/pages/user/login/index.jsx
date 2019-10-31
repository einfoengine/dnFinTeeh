import { Alert, Checkbox, Icon } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';
import Requests from '../../../utils/request';
const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

@connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component {
  loginForm = undefined;
  state = {
    type: 'account',
    autoLogin: true,
    crenditial: {
      email: '',
      pass: '',
    },
  };
  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };
  handleSubmit = () => {
    Requests.post('http://localhost:5000/api/auth', this.state.crenditial);
  };
  onTabChange = type => {
    this.setState({
      type,
    });
  };
  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }

      this.loginForm.validateFields(['mobile'], {}, async (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;

          try {
            const success = await dispatch({
              type: 'login/getCaptcha',
              payload: values.mobile,
            });
            resolve(!!success);
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { userLogin, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={form => {
            this.loginForm = form;
          }}
        >
          {/* <Tab
            key="account"
            tab={formatMessage({
              id: 'user-login.login.tab-login-credentials',
            })}
          > */}
          {status === 'error' &&
            loginType === 'account' &&
            !submitting &&
            this.renderMessage(
              formatMessage({
                id: 'user-login.login.message-invalid-credentials',
              }),
            )}
          <UserName
            onChange={e => {
              this.state.crenditial.email = e.target.value;
            }}
            name="userName"
            placeholder={`${formatMessage({
              id: 'user-login.login.userName',
            })}: admin or user`}
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'user-login.userName.required',
                }),
              },
            ]}
          />
          <Password
            onChange={e => {
              this.state.crenditial.pass = e.target.value;
            }}
            name="password"
            placeholder={`${formatMessage({
              id: 'user-login.login.password',
            })}: ant.design`}
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'user-login.password.required',
                }),
              },
            ]}
            onPressEnter={e => {
              e.preventDefault();
              if (this.loginForm) {
                this.loginForm.validateFields(this.handleSubmit);
              }
            }}
          />
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="user-login.login.remember-me" />
            </Checkbox>
            <a
              style={{
                float: 'right',
              }}
              href=""
            >
              <FormattedMessage id="user-login.login.forgot-password" />
            </a>
          </div>
          <Submit>
            <FormattedMessage id="user-login.login.login" />
          </Submit>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;

import React, { Component } from 'react';
import { Card, Typography, Alert } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

class Welcome extends Component {
  componentDidMount() {}
  componentWillMount() {}
  render() {
    return (
      <PageHeaderWrapper>
        <Card>
          <h1>Welcome to DN FinBook new test</h1>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Welcome;

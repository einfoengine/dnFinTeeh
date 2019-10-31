// The root of all persicuation

import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import UserReg from '../component/User/reg';
import Requests from '../../utils/request';
import { Button, Card, Divider, Form, Input, Modal, Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: x => <a>{x}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>edit</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    ),
  },
];

class User extends Component {
  state = {
    autoCompleteResult: [],
    confirmDirty: false,
    data: [],
    formdata: {
      name: '',
      email: '',
      pass: '',
    },
    visible: false,
  };

  // Modal handler callback
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = async e => {
    console.log(this.state);
    await Requests.post('http://localhost:5000/api/users/', this.state.formdata);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  getData = data => {
    console.log('form data', data);
  };

  // Life cycle
  async componentWillMount() {
    const res = await Requests.get('http://localhost:5000/api/userlist');
    this.setState({ data: res.data.user });
  }
  componentDidMount() {}
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 14 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 34 },
        sm: { span: 20 },
      },
    };
    console.log('Form data', this.state.formdata);
    return (
      <PageHeaderWrapper>
        <Card>
          <Button type="primary" onClick={this.showModal}>
            Create User
          </Button>
        </Card>
        <Card>
          <Table columns={columns} dataSource={this.state.data} pagination={false} />
        </Card>
        <div>
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="Name">
                <Input
                  onChange={e => {
                    let imput = this.state.formdata;
                    this.setState({ formdata: { ...imput, name: e.target.value } });
                  }}
                />
              </Form.Item>
              <Form.Item label="E-mail">
                <Input
                  onChange={e => {
                    let imput = this.state.formdata;
                    this.setState({ formdata: { ...imput, email: e.target.value } });
                  }}
                />
              </Form.Item>
              <Form.Item label="Password">
                <Input
                  onChange={e => {
                    let imput = this.state.formdata;
                    this.setState({ formdata: { ...imput, pass: e.target.value } });
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default User;

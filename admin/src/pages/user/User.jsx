// The root of all persicuation

import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import UserReg from '../component/User/reg';
import Requests from '../../utils/request';
import { Button, Card, Divider, Form, Input, Modal, Table } from 'antd';

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
    editData:{
      name: '',
      presentEmail: '',
      email: '',
      pass: ''
    },
    record: {},
    visible: false,
    visibleEM: false,
    visibleD: false,
  };

  columns = [
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
          <a onClick={this.showModalEM}>edit</a>
            <Divider type="vertical"/>
          <a onClick={(e)=>{
            this.showModalD();
            console.log(record)
            console.log(this.state.record);
            this.setState({record});
          }}>Delete</a>
        </span>
      ),
    },
  ];
  
  // Modal handler callback
  // Delete modal
  showModalD = () => {
    this.setState({
      visibleD: true,
    });
  };

  handleOkD = async e => {
    console.log(this.state.record.email);
    await Requests.delete('http://localhost:5000/api/users/', { data: {"email": this.state.record.email} } );
    this.setState({
      visibleD: false,
    });
  };
  handleCancelD = e => {
    console.log(e);
    this.setState({
      visibleD: false,
    });
  };
  // Edit modal
  showModalEM = () => {
    this.setState({
      visibleEM: true,
    });
  };
  handleOkEM = async e => {
    console.log(this.state.editData);
    await Requests.put('http://localhost:5000/api/users/', {data: this.state.editData});
    this.setState({
      visibleEM: false,
    });
  };

  handleCancelEM = e => {
    console.log(e);
    this.setState({
      visibleEM: false,
    });
  };
  
  // Create modal
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

  // 
  getData = data => {
    console.log('form data', data);
  };

  // Life cycle
  async componentWillMount() {
    const res = await Requests.get('http://localhost:5000/api/userlist');
    console.log('res', res);
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
    return (
      <PageHeaderWrapper>
        <Card>
          <Button type="primary" onClick={this.showModal}>
            Create User
          </Button>
        </Card>
        <Card>
          <Table columns={this.columns} dataSource={this.state.data} pagination={false} />
        </Card>
        <div>
          {/* Modal: Create user */}
          <Modal
            title="Create User"
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
        {/* Modal Edit User */}
        <div id="edit-user">
          <Modal
            title="Edit User"
            visible={this.state.visibleEM}
            onOk={this.handleOkEM}
            onCancel={this.handleCancelEM}
          >
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="Present Email">
                <Input
                  onChange={e => {
                    let imput = this.state.editData;
                    this.setState({ editData: { ...imput, presentEmail: e.target.value } });
                  }}
                />
              </Form.Item>
              <Form.Item label="Name">
                <Input
                  onChange={e => {
                    let imput = this.state.editData;
                    this.setState({ editData: { ...imput, name: e.target.value } });
                  }}
                />
              </Form.Item>
              <Form.Item label="E-mail">
                <Input
                  onChange={e => {
                    let imput = this.state.editData;
                    this.setState({ editData: { ...imput, email: e.target.value } });
                  }}
                />
              </Form.Item>
              <Form.Item label="Password">
                <Input
                  onChange={e => {
                    let imput = this.state.editData;
                    this.setState({ editData: { ...imput, pass: e.target.value } });
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
        {/* Modal: Delete User */}
        <div id="delete-user">
          <Modal
            title="Delete User"
            visible={this.state.visibleD}
            onOk={this.handleOkD}
            onCancel={this.handleCancelD}
          >
            You are going to delete an user! Are you sure?
          </Modal>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default User;

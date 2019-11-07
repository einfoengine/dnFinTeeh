// The root of all persicuation

import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import UserReg from '../component/User/reg';
import Requests from '../utils/request';
import { Button, Card, Divider, Form, Input, Modal, Table } from 'antd';

class Clients extends Component {
  state = {
    autoCompleteResult: [],
    confirmDirty: false,
    data: [],
    formdata: {
      name: '',
      phone: '',
      email: '',
      address: '',
      company: '',
    },
    editData:{
      id: '',
      name: '',
      phone: '',
      email: '',
      address: '',
      company: '',
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
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          {/* <a onClick={this.showModalEM}>edit</a> */}
          <a onClick={(e)=>{
            let editData = this.state.editData;
            this.setState({ 
              editData: { ...editData, id: record._id, name: record.name, address: record.address, company: record.company, email: record.email, phone: record.phone },
              record: record
            });
            console.log(record);
            this.showModalEM();
          }}>Edit</a>
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
    await Requests.delete('http://localhost:5000/api/clients/', { data: {"name": this.state.record.name} } );
    this.setState({
      visibleD: false,
    });
    this.componentWillMount();
  };
  handleCancelD = e => {
    console.log(e);
    this.setState({
      visibleD: false,
      record: {}
    });
  };
  // Edit modal
  showModalEM = () => {
    this.setState({
      visibleEM: true,
    });
  };
  handleOkEM = async e => {
    await Requests.put('http://localhost:5000/api/clients/', this.state.editData);
    this.setState({
      visibleEM: false,
    });
    this.componentWillMount();
  };

  handleCancelEM = e => {
    console.log(e);
    this.setState({
      visibleEM: false,
      record: {}
    });
  };
  
  // Create modal
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // handleOk = async e => {
  //   console.log(this.state);
  //   await Requests.post('http://localhost:5000/api/users/', this.state.formdata);
  //   let data = this.state.data;
  // };

  handleOk = async e => {
    console.log(this.state);
    await Requests.post('http://localhost:5000/api/clients', this.state.formdata);
    this.setState({
      visible: false,
    });
    this.componentWillMount();
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      record: {}
    });
  };

  // 
  getData = data => {
    console.log('form data', data);
  };

  // Life cycle
  async componentWillMount() {
    const res = await Requests.get('http://localhost:5000/api/clients/');
    console.log('res', res);
    this.setState({data: res.data.clients})
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
            Register Client
          </Button>
        </Card>
        <Card>
          <Table columns={this.columns} dataSource={this.state.data} pagination={false} />
        </Card>
        <div>
          {/* Modal: Create user */}
          <Modal
            title="Register Client"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form {...formItemLayout}>
              <Form.Item label="Client Name">
                <Input
                  onChange={e => {
                    let imput = this.state.formdata;
                    this.setState({ formdata: { ...imput, name: e.target.value } });
                  }}
                />
              </Form.Item>
              <Form.Item label="Company">
                <Input
                  onChange={e => {
                    let imput = this.state.formdata;
                    this.setState({ formdata: { ...imput, company: e.target.value } });
                  }}
                />
              </Form.Item>
              <Form.Item label="Phone">
                <Input
                  onChange={e => {
                    let imput = this.state.formdata;
                    this.setState({ formdata: { ...imput, phone: e.target.value } });
                  }}
                />
              </Form.Item>
              <Form.Item label="Email">
                <Input
                  onChange={e => {
                    let imput = this.state.formdata;
                    this.setState({ formdata: { ...imput, email: e.target.value } });
                  }}
                />
              </Form.Item>
              <Form.Item label="Address">
                <Input
                  onChange={e => {
                    let imput = this.state.formdata;
                    this.setState({ formdata: { ...imput, address: e.target.value } });
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
        {/* Modal Edit User */}
        <div id="edit-client">
          <Modal
            title="Edit Client"
            visible={this.state.visibleEM}
            onOk={this.handleOkEM}
            onCancel={this.handleCancelEM}
          >
            <Form {...formItemLayout}>
              <Form.Item label="Client Name">
                <Input
                  value={this.state.editData.name}
                  onChange={e => {
                    let imput = this.state.editData;
                    this.setState({ editData: { ...imput, name: e.target.value } });
                  }}
                />
              </Form.Item>
              <Form.Item label="Company">
                <Input
                  value={this.state.editData.company}
                  onChange={e => {
                    let imput = this.state.editData;
                    this.setState({ editData: { ...imput, company: e.target.value } });
                  }}
                />
              </Form.Item>
              <Form.Item label="Phone">
                <Input
                  value={this.state.editData.phone}
                  onChange={e => {
                    let imput = this.state.editData;
                    this.setState({ editData: { ...imput, phone: e.target.value } });
                  }}
                />
              </Form.Item>
              <Form.Item label="Email">
                <Input
                  value={this.state.editData.email}
                  onChange={e => {
                    let imput = this.state.editData;
                    this.setState({ editData: { ...imput, email: e.target.value } });
                  }}
                />
              </Form.Item>
              <Form.Item label="Address">
                <Input
                  value={this.state.editData.address}
                  onChange={e => {
                    let imput = this.state.editData;
                    this.setState({ editData: { ...imput, address: e.target.value } });
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

export default Clients;

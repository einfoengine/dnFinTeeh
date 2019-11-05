// The root of all persicuation

import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Requests from '../utils/request';
import { Button, Card, Divider, Form, Input, Modal, Table } from 'antd';

class Project extends Component {
  state = {
    autoCompleteResult: [],
    confirmDirty: false,
    data: [],
    formdata: {
      name: '',
      client: '',
      amount: '',
      paid: '',
    },
    editData: {
      oldName: '',
      name: '',
      client: '',
      amount: 0,
      paid: 0,
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
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          {/* <a onClick={this.showModalEM}>edit</a> */}
          <a onClick={(e)=>{
            this.showModalEM();
            console.log("edit", record);
            console.log('Edit',this.state.record);
            this.setState({record});
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
    console.log('Deleting project', this.state.record.name)
    await Requests.delete('http://localhost:5000/api/projects/', {data: {"name": this.state.record.name}});
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
    this.setState({visibleEM: false});
    await Requests.put('http://localhost:5000/api/projects/', this.state.editData);
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
    await Requests.post('http://localhost:5000/api/projects', this.state.formdata);
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
    const res = await Requests.get('http://localhost:5000/api/projects');
    console.log('res', res);
    this.setState({ data: res.data.project });
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
    console.log('Edit data', this.state.editData);
    return (
      <PageHeaderWrapper>
        <Card>
          <Button type="primary" onClick={this.showModal}>
            Create Project
          </Button>
        </Card>
        <Card>
          <Table columns={this.columns} dataSource={this.state.data} pagination={false} />
        </Card>
        <div>
          <Modal
            title="Create Project"
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
              <Form.Item label="Client">
                <Input
                  onChange={e => {
                    let imput = this.state.formdata;
                    this.setState({ formdata: { ...imput, client: e.target.value } });
                  }}
                />
              </Form.Item>
              <Form.Item label="Amount">
                <Input
                  onChange={e => {
                    let imput = this.state.formdata;
                    this.setState({ formdata: { ...imput, amount: e.target.value } });
                  }}
                />
              </Form.Item>
              <Form.Item label="Paid">
                <Input
                  onChange={e => {
                    let imput = this.state.formdata;
                    this.setState({ formdata: { ...imput, paid: e.target.value } });
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
        {/* Edit modal */}
        <div id="edit-project">
          <Modal
            title="Edit Project"
            visible={this.state.visibleEM}
            onOk={this.handleOkEM}
            onCancel={this.handleCancelEM}
          >
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="Project Name">
                <Input
                  onChange={e => {
                    let imput = this.state.editData;
                    this.setState({ editData: { ...imput, oldName: e.target.value }});
                  }}
                />
              </Form.Item>
              <Form.Item label="New Name">
                <Input
                  onChange={e => {
                    let imput = this.state.editData;
                    this.setState({ editData: { ...imput, name: e.target.value } });
                  }}
                />
              </Form.Item>
              <Form.Item label="Client">
                <Input
                  onChange={e => {
                    let imput = this.state.editData;
                    this.setState({ editData: { ...imput, client: e.target.value } });
                  }}
                />
              </Form.Item>
              <Form.Item label="Amount">
                <Input
                  onChange={e => {
                    let imput = this.state.editData;
                    this.setState({ editData: { ...imput, amount: e.target.value } });
                  }}
                />
              </Form.Item>
              <Form.Item label="Paid">
                <Input
                  onChange={e => {
                    let imput = this.state.editData;
                    this.setState({ editData: { ...imput, paid: e.target.value } });
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
        {/* Delete modal */}
        <div id="delete-project">
          <Modal
            title="Delete Project"
            visible={this.state.visibleD}
            onOk={this.handleOkD}
            onCancel={this.handleCancelD}
          >
            You are about to delete a Project! Are you sure?
          </Modal>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Project;

// The root of all persicuation

import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import UserReg from '../component/User/reg';
import Requests from '../../utils/request';
import { Button, Card, Divider, Form, Input, Icon, Modal, Table } from 'antd';
import Highlighter from 'react-highlight-words';


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
      id: '',
      name: '',
      email: '',
      pass: ''
    },
    record: {},
    searchText: '',
    visible: false,
    visibleEM: false,
    visibleD: false,
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  columns = [
    {
      title: 'Name',
      dataIndex: 'name', 
      key: 'name',
      render: x => <a>{x}</a>,
      ...this.getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...this.getColumnSearchProps('email'),
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
              editData: { ...editData, id: record._id, name: record.name, email: record.email, pass: record.pass },
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
    await Requests.delete('http://localhost:5000/api/users/', { data: {"email": this.state.record.email} } );
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
    await Requests.put('http://localhost:5000/api/users/', this.state.editData);
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
    await Requests.post('http://localhost:5000/api/users', this.state.formdata);
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
    const res = await Requests.get('http://localhost:5000/api/userlist');
    console.log('res', res);
    if(res.data != undefined) this.setState({ data: res.data.user });
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
              
              <Form.Item label="Name">
                <Input
                  value={this.state.editData.name}
                  onChange={e => {
                    let imput = this.state.editData;
                    this.setState({ editData: { ...imput, name: e.target.value } });
                  }}
                />
              </Form.Item>
              <Form.Item label="E-mail">
                <Input
                  value={this.state.editData.email}
                  onChange={e => {
                    let imput = this.state.editData;
                    this.setState({ editData: { ...imput, email: e.target.value } });
                  }}
                />
              </Form.Item>
              <Form.Item label="Password">
                <Input
                  value={this.state.editData.pass}
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

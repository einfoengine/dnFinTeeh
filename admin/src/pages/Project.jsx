// The root of all persicuation

import React, { Component } from 'react';
import { PageHeaderWrapper, Pie } from '@ant-design/pro-layout';
import Requests from '../utils/request';
import { Button, Card, Divider, Form, Input, Icon, InputNumber, Modal, Select, Table, Progress } from 'antd';
import { number } from 'prop-types';
import Highlighter from 'react-highlight-words';
// import { Pie } from 'ant-design-pro/lib/Charts';

const { Option } = Select;
function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}

class Project extends Component {
  state = {
    autoCompleteResult: [],
    confirmDirty: false,
    clients: [],
    data: [],
    formdata: {
      name: '',
      client: '',
      amount: 0,
      paid: 0,
    },
    editData: {
      // id: '',
      // name: '',
      // client: '',
      // amount: 0,
      // paid: 0,
    },
    record: {},
    searchText: '',
    visible: false,
    visibleEM: false,
    visibleD: false,
  };

  // Table search
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
  // End table search

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
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      render: (i, record) => <a>{JSON.stringify(i)}</a>,
      // ...this.getColumnSearchProps('client'),
    },
    {
      title: 'Budget',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      key: 'paid',
      render: ()=> <Progress type="circle" percent={30} width={30} />
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          {/* <a onClick={this.showModalEM}>edit</a> */}
          <a onClick={(e)=>{
            let editData = this.state.editData;
            console.log("record",JSON.stringify(record));
            this.setState({ 
              editData: { ...editData, id: record.id, name: record.name, client: record.client, amount: record.amount, paid: record.paid},
              record: record
            });
            console.log("Record ",record);
            console.log("this.state.editData", this.state.editData);
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
    console.log('Deleting project', this.state.record.name)
    await Requests.delete('http://localhost:5000/api/projects/', {data: {"name": this.state.record.name}});
    this.setState({
      visibleD: false,
    });
    this.componentWillMount();
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
    this.componentWillMount();
  };

  handleCancelEM = e => {
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
    this.componentWillMount();
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
    const clients = await Requests.get('http://localhost:5000/api/clients');
    this.setState({ data: res.data.projects });
    this.setState({ clients: clients.data.clients });
  }
  componentDidMount() {}

  // Table filter
  
  // End table filter


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
        {
          console.log('************ Clients',this.state.clients),
          console.log('************ Data', this.state)
        }
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
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={(value)=>{
                    console.log('Selected value: ',value);
                    let imput = this.state.formdata;
                    this.setState({ formdata: { ...imput, client: value } });
                  }}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {
                    this.state.clients.map((client)=>{
                      // console.log('item->',client.name)
                        return(
                          <Option value={client.id}>{client.name}</Option>
                        );
                    })
                  }
                </Select>
              </Form.Item>

              <Form.Item label="Amount">
                <InputNumber
                  onChange={e => {
                    let imput = this.state.formdata;
                    this.setState({ formdata: { ...imput, amount: e } });
                  }}
                />
              </Form.Item>
              <Form.Item label="Paid">
                <InputNumber
                  onChange={e => {
                    let imput = this.state.formdata;
                    this.setState({ formdata: { ...imput, paid: e } });
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
                  value={this.state.editData.name}
                  onChange={e => {
                    let imput = this.state.editData;
                    this.setState({ editData: { ...imput, name: e.target.value } });
                  }}
                />
              </Form.Item>
              {/* <Form.Item label="Client">
                <Input
                  value={this.state.editData.client}
                  onChange={e => {
                    let imput = this.state.editData;
                    this.setState({ editData: { ...imput, client: e.target.value } });
                  }}
                />
              </Form.Item> */}
              <Form.Item label="Client">
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={(value)=>{
                    console.log(value);
                    let imput = this.state.editData;
                    this.setState({ editData: { ...imput, client: value } });
                  }}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {
                    this.state.clients.map((client)=>{
                      // console.log('item->',client.name)
                        return(
                          <Option value={client._id}>{client.name}</Option>
                        );
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item label="Amount">
                <Input
                  value={this.state.editData.amount}
                  onChange={e => {
                    let imput = this.state.editData;
                    this.setState({ editData: { ...imput, amount: e.target.value } });
                  }}
                />
              </Form.Item>
              <Form.Item label="Paid">
                <Input
                  value={this.state.editData.paid}
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

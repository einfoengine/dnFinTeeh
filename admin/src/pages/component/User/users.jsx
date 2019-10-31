import React, { Component } from 'react';
import { Table, Divider } from 'antd';
import Requests from '../../../utils/request';

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
  // {
  //     title: 'Tags',
  //     key: 'tags',
  //     dataIndex: 'tags',
  //     render: tags => (
  //     <span>
  //         {tags.map(tag => {
  //             let color = tag.length > 5 ? 'geekblue' : 'green';
  //             if (tag === 'loser') {
  //             color = 'volcano';
  //         }
  //             return (
  //                 <Tag color={color} key={tag}>
  //                     {tag.toUpperCase()}
  //                 </Tag>
  //             );
  //         })}
  //         </span>
  //     ),
  // },
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

class Users extends Component {
  state = {
    data: [],
  };
  async componentWillMount() {
    const res = await Requests.get('http://localhost:5000/api/userlist');
    this.setState({ data: res.data.user });
  }
  render() {
    return <Table columns={columns} dataSource={this.state.data} pagination={false} />;
  }
}
export default Users;

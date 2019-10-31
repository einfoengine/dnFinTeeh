import react, { Component } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import { ETIME } from 'constants';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class UserReg extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    newUser: {
      name: '',
      email: '',
      pass: '',
    },
  };

  // Handle
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  // Lifecycle
  componentWillMount() {}
  componentDidMount() {}
  render() {
    const { getFieldDecorator } = this.props.form;

    // const {formdata} = this.props;

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

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 34,
          offset: 14,
        },
        sm: {
          span: 20,
          offset: 4,
        },
      },
    };

    this.props.formdata(this.state.newUser);

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Name">
          <Input
            onChange={e => {
              let imput = this.state.newUser;
              this.setState({ newUser: { ...imput, name: e.target.value } });
            }}
          />
        </Form.Item>
        <Form.Item label="E-mail">
          <Input
            onChange={e => {
              let imput = this.state.newUser;
              this.setState({ newUser: { ...imput, email: e.target.value } });
            }}
          />
        </Form.Item>
        <Form.Item label="Password">
          <Input
            onChange={e => {
              let imput = this.state.newUser;
              this.setState({ newUser: { ...imput, pass: e.target.value } });
            }}
          />
        </Form.Item>
        {/* <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item> */}
      </Form>
    );
  }
}

export default Form.create()(UserReg);

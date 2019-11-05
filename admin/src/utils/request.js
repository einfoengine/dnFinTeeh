// import { async } from 'q';

const axios = require('axios');

class Requests {
  get = async endPoint => {
    try {
      const response = await axios.get(endPoint);
      // console.log(response);
      return response;
    } catch (err) {
      console.log(err.message);
    }
  };
  post = async (endPoint, params) => {
    console.log('Path: ', endPoint, '\n', 'Params: ', params);
    try {
      const response = await axios.post(endPoint, params); // params to be an object
      console.log('Post response: ', response);
    } catch (err) {
      console.log('Post error: ', err);
    }
  };
  delete = async (endPoint, params) => {
    console.log('Path: ', endPoint, '\n', 'Params: ', params);
    try {
      const response = await axios.delete(endPoint, params); // params to be an object
      console.log('Delete response: ', response);
    } catch (err) {
      console.log('Delete error: ', err);
    }
  };
  put = async (endPoint, params) => {
    try {
      const response = await axios.put(endPoint, params); // params to be an object
      console.log('Update response: ', response);
    } catch (err) {
      console.log('Update error: ', err);
    }
  };
}

export default Requests = new Requests();

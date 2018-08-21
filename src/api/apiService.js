import axios from 'axios';
import get from 'lodash.get';

export default {
  async getUsers() {
    const data = await axios.get('https://jsonplaceholder.typicode.com/users');
    return get(data, 'data', []);
  },
};

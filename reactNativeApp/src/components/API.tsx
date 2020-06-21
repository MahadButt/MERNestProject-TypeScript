import axios from 'axios';

export default axios.create({
    baseURL: `http://192.168.10.6:4000`
});
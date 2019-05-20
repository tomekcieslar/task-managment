import axios from 'axios';

export default axios.create({
  baseURL: 'localhost:8080',
  headers: {
    Authorization: 'Client-ID 8bca849a9ec31aac848e7cd08ffa3dee5de72d516330bba8b765f5226ddc3afb'
  }
});

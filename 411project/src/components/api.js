import axios from 'axios';

const production  = ('https://recipe-creator-org.herokuapp.com/');
const development = 'http://localhost:5000/';
const url = (process.env.NODE_ENV === 'production'  ? production : development);
console.log(url);

export default axios.create({
    baseURL: url
});
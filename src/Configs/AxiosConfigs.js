import axios from 'axios';

axios.defaults.timeout = 60000;

export const HERO_API = () =>
  axios.create({
    baseURL: 'https://akabab.github.io/superhero-api/api/',
  });

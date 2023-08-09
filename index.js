const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
dotenv.config({ path: path.resolve(__dirname, '.env') });

const PORT = process.env.PORT || 3000;
const GNEWS_API_KEY = process.env.GNEWS_API_KEY || '';

app.use(bodyParser.json());
app.use(cors());

const axiosInstance = axios.create({
  baseURL: process.env.GNEWS_API_URL,
});

app.get('/top-headlines', async (req, res) => {
  const categories = [
    'general',
    'world',
    'nation',
    'business',
    'technology',
    'entertainment',
    'sports',
    'science',
    'health',
  ];
  let category = req.query.category || 'general';
  let size = req.query.size || 10;

  if (!categories.includes(category)) {
    category = 'general';
  }

  if (size > 100) {
    size = 100;
  }

  const response = await axiosInstance.get(
    `/top-headlines?category=${category}&max=${size}&apikey=${GNEWS_API_KEY}`
  );

  return res.json(response.data);
});

app.get('/search', async (req, res) => {
  const query = req.query.q;
  let page = req.query.page || 1;
  let size = req.query.size || 10;
  let options = req.query.searchOption
    ? typeof req.query.searchOption === 'string'
      ? [req.query.searchOption]
      : []
    : ['title', 'description'];
  let sortBy = req.query.sortBy || 'publishedAt';

  if (size > 100) {
    size = 100;
  }

  const response = await axiosInstance.get(
    `/search?
      q=${query}&
      max=${size}&
      page=${page}&
      in=${options.join(',')}&
      sortBy=${sortBy}&
      apikey=${GNEWS_API_KEY}
    `
  );

  return res.json(response.data);
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is successfully running on port ${PORT}`);
  } else {
    console.log('Error occurred', error);
  }
});

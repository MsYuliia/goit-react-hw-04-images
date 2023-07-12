import axios from 'axios';

const API_KEY = '36587845-1230cc489a729768340ecd21b';
const imagesApi = axios.create({
  baseURL: `https://pixabay.com/api/`,
});

export const getImages = async (query, page) => {
  const response = await imagesApi.get('', {
    params: {
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      q: query,
      page,
    },
  });

  return response.data;
};

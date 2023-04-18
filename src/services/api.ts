import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

async function doGet(url: string) {
  try {
    const response = await api.get(url);

    return response.data;
  } catch (error) {
    return { success: false, data: { msg: 'GET error on server' } };
  }
}

async function doPost(url: string, data: any) {
  try {
    const response = await api.post(url, data);

    return response.data;
  } catch (error) {
    return { success: false, data: { msg: 'POST error on server' } };
  }
}

export { doGet, doPost };

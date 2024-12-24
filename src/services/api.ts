import axios from 'axios';

const API_URL = 'http://localhost:3000';

export interface BackendResponse {}

const postRequest = async (endpoint: string, parameter: object): Promise<BackendResponse> => {
  const response = await axios.post(`${API_URL}/${endpoint}`, parameter);
  return response.data;
};

export const api = {
  getDashBordInfo: (parameter = { hey: 'hey express server' }): Promise<BackendResponse> => {
    return postRequest('dashbord-info?file', parameter);
  },
  getEmployeInfo: (parameter = { hey: 'hey express server' }): Promise<BackendResponse> => {
    return postRequest('employe-info?file', parameter);
  },
};

import axios from 'axios';

const API_URL = 'http://localhost:3000';

export interface backendResponse {

}

export const api = {
  getDashBordInfo: async (parameter = {hey:'hey express server'}): Promise<backendResponse> => {
    const response = await axios.post(`${API_URL}/dashbord-info?file`, parameter);
    return response.data;
  },



};
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export interface BackendResponse {}

const postRequest = async (endpoint: string, parameter: object): Promise<BackendResponse> => {
  const response = await axios.post(`${API_URL}/${endpoint}`, parameter);
  return response.data;
};


export const api = {

  getDashBordInfo: async (parameter = {hey:'hey express server'}): Promise<BackendResponse> => {
    const response = await axios.post(`${API_URL}/dashboard/info?file`, parameter);
    return response.data;
  },

  addEmployee: async (Employee : object): Promise<BackendResponse> => {
    const response = await axios.post(`${API_URL}/employees/add`, Employee);
    return response.data;
  },
  getEmployeInfo: (parameter = { hey: 'hey express server' }): Promise<BackendResponse> => {
    return postRequest('employees/get?file', parameter);
  },

  getDepartements: async (): Promise<BackendResponse> => {
    const response = await axios.get(`${API_URL}/departments?file`);
    return response.data;
  },

  deleteEmploye : async (parameter : object): Promise<BackendResponse> => {
    //console.log("hhh", parameter);
    const response = axios.post(`${API_URL}/employees/delete`, parameter);
    return response;
  },

  updateEmployee : async (parameter : object): Promise<BackendResponse> => {
    //console.log("update", parameter);
    const response = axios.post(`${API_URL}/employees/update`, parameter);
    return response;
  } ,

  getPresences: async (): Promise<BackendResponse> => {
    const response = await axios.get(`${API_URL}/presences/get`);
    return response.data;
  },
  getCongeInfo : async (): Promise<any[]> => {
    const response = await axios.get(`${API_URL}/conge/info`);
    return response.data;
  },

};




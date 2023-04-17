// import axios from "../axios-common";
import axios from 'axios';

const getAll = () => {
  return axios.get("/users");
};

const get = (id) => {
  return axios.get(`/users/${id}`);
};

const create = (data) => {
  return axios.post("/users", data);
};

const update = (id, data) => {
  return axios.put(`/users/${id}`, data);
};

const remove = (id) => {
  return axios.delete(`/users/${id}`);
};

// const removeAll = () => {
//   return axios.delete(`/users`);
// };


const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
//   removeAll,

};

export default TutorialService;
import axios from "axios";
const BASE_URL = "https://v2202405172564268947.bestsrv.de";
// const BASE_URL = "http://localhost:8000";

const axiosinstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getAllItems = async () => {
  return (await axiosinstance.get("/item/all")).data.map((items) => items);
};
export const getRecentitems = async () => {
  return (await axiosinstance.get("/item/recent")).data.map((items) => items);
};

export const getItemById = async (id) => {
  return (await axiosinstance.get(`/item/${id}`)).data;
};

export const createItem = async (FormData) => {
  await axiosinstance.post("/item/create", FormData);
};

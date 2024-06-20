import axios from "axios";

const BASE_URL = "https://v2202405172564268947.bestsrv.de";
// const BASE_URL = "http://localhost:8000";

export const axiosinstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const uploadFile = async (FormData) => {
  await axiosinstance.post("/upload", FormData);
};

export const updateDownloadCount = async (item_id) => {
  return await axiosinstance.post(`/item/download_count/${item_id}`);
};

export const getAllItems = async () => {
  return (await axiosinstance.get("/item/all")).data.map((items) => items);
};

export const getNotableItems = async () => {
  return (await axiosinstance.get("/item/notables")).data.map((items) => items);
};
export const getRecentItems = async () => {
  return (await axiosinstance.get("/item/recent")).data.map((items) => items);
};
export const getMostDownloadedItemsInDay = async () => {
  return (await axiosinstance.get("/item/top_downloaded_day")).data.map(
    (items) => items
  );
};

export const getItemById = async (id) => {
  return (await axiosinstance.get(`/item/${id}`)).data;
};

export const createItem = async (FormData) => {
  await axiosinstance.post("/item/create", FormData);
};

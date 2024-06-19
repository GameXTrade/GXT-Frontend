import axios from "axios";

export default axios.create({
  baseURL: "https://v2202405172564268947.bestsrv.de/",
  // baseURL: "http://localhost:8000",
  withCredentials: true,
});

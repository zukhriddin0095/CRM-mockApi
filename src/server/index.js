import axios from "axios";

const request = axios.create({
  baseURL: "https://650ac486dfd73d1fab08da9d.mockapi.io/",
  timeout: 100000,
});

export default request;
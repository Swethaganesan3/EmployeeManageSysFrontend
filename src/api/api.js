import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7177/api"
});

export default API;
import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.100.47:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

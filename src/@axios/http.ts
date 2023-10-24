import axios from "axios";

const http = axios.create({
  baseURL: `${import.meta.env.REACT_APP_API}/api`,
  headers: {
    "x-apikey": "435e224c-44fb-4773-9faf-380c5e6a2188",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    accessToken: import.meta.env.REACT_APP_TOKEN,
  },
});

http.interceptors.request.use((config) => {
  // const token = localStorage.getItem("access_token");
  // if(token) {
  // } 
  config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYU5ndW9pRHVuZyI6ImY2ZDk5Yzk5LTgzZjEtNDlhYy1hNjg1LTBjOTU5Zjg2ZmVkZCIsImlhdCI6MTY5NzcyNTAzOCwiZXhwIjoxNzI5MjgyNjM4fQ.N8p7SVvwjBXo9FivrDuVF44AyCn0dNP1T2xgb4fTV5U`;
  
  return config;
});

export default http;

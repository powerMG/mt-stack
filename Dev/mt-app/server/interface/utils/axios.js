import axios from "axios";

const Instance = axios.create({
  baseURL: `http://${process.env.HOST || "loaclhost"}:${process.env.PORT ||
    3000}`,
  timeout: 3000,
  headers: {}
});
export default Instance;

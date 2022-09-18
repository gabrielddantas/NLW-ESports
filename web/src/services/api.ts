import axios from "axios";
import { API_KEY } from "../configs/enviroments/enviroment.dev";

export const Api = axios.create({
  baseURL: API_KEY,
});

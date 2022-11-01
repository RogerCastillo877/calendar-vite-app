import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

const calendarAPi = axios.create({
  baseURL: VITE_API_URL
});

export default calendarAPi;
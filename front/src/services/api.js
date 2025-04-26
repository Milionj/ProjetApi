// Configuration de l'instance Axios pour toute l'application, pour faire des requêtes HTTP
import axios from "axios";

// instance Axios préconfigurée
const API = axios.create({
  baseURL: "http://localhost:8080", // url backend Node.js
});

export default API;

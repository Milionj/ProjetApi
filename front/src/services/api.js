// Configuration de l'instance Axios pour toute l'application, pour faire des requêtes HTTP
import axios from "axios";

// instance Axios préconfigurée
const api = axios.create({
  baseURL: "http://localhost:8080", // url backend Node.js
  withCredentials: true
});

//function pour s'inscrire
export const signup = (userData) => api.post("/auth/signup", userData);

// Connexion (login)
export const login = (credentials) =>
  api.post("/auth/signin", credentials);

// Récupérer tous les utilisateurs (si route protégée par token)
export const getUsers = (token) =>
  api.get("/users", {
    headers: { Authorization: `Bearer ${token}` },
  });

//function pour créer tous les Todo
export const getTodos = (token) =>
  api.get("/api/todos", {
    headers: { Authorization: `Bearer ${token}`},
  });

// Fonction pour créer un nouveau ToDo
export const createTodo = (todoData, token) =>
  api.post("/api/todos", todoData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  //Fonction pour mettre a jour un ToDo
  export const updateTodo = (id, todoData, token) =>
    api.put(`/api/todos${id}`, todoData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    //Function pour supprimer un Todo

    export const deleteTodo = (id, token) =>
      api.delete(`/api/todos${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

export default api;

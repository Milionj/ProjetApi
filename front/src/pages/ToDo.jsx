import React, { useState, useEffect } from "react";
import { getTodos, createTodo, deleteTodo, updateTodo } from "../services/api";

const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "", status: "pending" });
  const [token, setToken] = useState("");

  // Charger les todos au démarrage
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
      fetchTodos(storedToken);
    }
  }, []);

  // Fonction pour récupérer les ToDos
  const fetchTodos = async (token) => {
    try {
      const response = await getTodos(token);
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour créer un ToDo
  const handleCreateTodo = async (e) => {
    e.preventDefault();
    try {
      await createTodo(newTodo, token);
      setNewTodo({ title: "", description: "", status: "pending" });
      fetchTodos(token);
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour supprimer un ToDo
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id, token);
      fetchTodos(token);
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour changer le statut d'un ToDo
  const handleToggleStatus = async (todo) => {
    const newStatus =
      todo.status === "pending" ? "in_progress" : todo.status === "in_progress" ? "completed" : "pending";
    try {
      await updateTodo(todo.id, { status: newStatus }, token);
      fetchTodos(token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mes Tâches</h2>

      {/* Formulaire pour créer une tâche */}
      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          placeholder="Titre"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <select
          value={newTodo.status}
          onChange={(e) => setNewTodo({ ...newTodo, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">Créer</button>
      </form>

      {/* Liste des tâches */}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "10px" }}>
            <strong>{todo.title}</strong> - {todo.description} - [{todo.status}]
            <div>
              <button onClick={() => handleToggleStatus(todo)} style={{ marginRight: "10px" }}>
                Changer le statut
              </button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;

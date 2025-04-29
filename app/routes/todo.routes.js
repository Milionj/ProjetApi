import express from "express";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../controllers/todo.controller.js";
import { authJwt } from "../middlewares/index.js";

const router = express.Router();

// Toutes les routes sont protégées par verifyToken (a revoir)

// Créer une tâche
router.post("/", [authJwt.verifyToken], createTodo);

// Lister toutes les tâches de l'utilisateur
router.get("/", [authJwt.verifyToken], getTodos);

// Modifier une tâche
router.put("/:id", [authJwt.verifyToken], updateTodo);

// Supprimer une tâche
router.delete("/:id", [authJwt.verifyToken], deleteTodo);

export default router;

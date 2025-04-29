import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import authRoutes from "./app/routes/auth.routes.js";
import userRoutes from "./app/routes/user.routes.js";
import todoRoutes from "./app/routes/todo.routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Autorise les requêtes venant du front React (sur le port 3000)
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de test
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue dans l'application Node.js avec authentification JWT." });
});

// Déclaration des routes
app.use("/api/auth", authRoutes);
app.use("/api/test", userRoutes);
app.use("/api/todos", todoRoutes);

// Initialise les rôles en base (une seule fois au démarrage)
const initializeRoles = async () => {
  const roles = ["user", "moderator", "admin"];
  for (const role of roles) {
    await db.role.findOrCreate({ where: { name: role } });
  }
};

// Synchronisation Sequelize + lancement du serveur
const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(async () => {
  await initializeRoles();
  app.listen(PORT, () => {
    console.log(` Serveur Node.js démarré sur http://localhost:${PORT}`);
  });
});

// server.js
import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import authRoutes from "./app/routes/auth.routes.js";
import userRoutes from "./app/routes/user.routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Configuration des options CORS
const corsOptions = {
    origin: "http://localhost:8081", // Autorise uniquement ce domaine
};

app.use(cors(corsOptions));

// Analyse les requêtes au format JSON
app.use(express.json());

// Analyse les requêtes avec le format application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Route de test simple
app.get("/", (req, res) => {
    res.json({ message: "Bienvenue dans l'application Node.js avec authentification JWT." });
});

// Déclaration des routes
app.use("/api/auth", authRoutes);
app.use("/api/test", userRoutes);

// Définition du port et démarrage du serveur
const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Le serveur fonctionne sur le port ${PORT}.`);
    });

    // server.js (add below the import statements)
const initializeRoles = async () => {
    const roles = ["user", "moderator", "admin"];
    for (const role of roles) {
        await db.role.findOrCreate({
            where: { name: role },
        });
    }
};
 
db.sequelize.sync().then(async () => {
    await initializeRoles();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});
});

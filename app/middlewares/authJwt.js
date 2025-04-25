import jwt from "jsonwebtoken";
import db from "../models/index.js";
import authConfig from "../config/auth.config.js";

// On récupère le modèle User
const User = db.user;

// Vérifie que le token JWT est présent et valide
const verifyToken = (req, res, next) => {
    // Le token peut être dans l'en-tête "x-access-token" ou "authorization"
    const token = req.headers["x-access-token"] || req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "Aucun token fourni !" });
    }

    // Si le token commence par "Bearer ", on le retire
    const actualToken = token.startsWith("Bearer ")
        ? token.slice(7, token.length)
        : token;

    // Vérifie le token avec la clé secrète
    jwt.verify(actualToken, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Non autorisé !" });
        }
        // Stocke l'ID de l'utilisateur dans la requête pour un usage ultérieur
        req.userId = decoded.id;
        next();
    });
};

// Vérifie si l'utilisateur a le rôle "admin"
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();

        for (const role of roles) {
            if (role.name === "admin") {
                return next(); // Autorisé
            }
        }

        return res.status(403).json({ message: "Rôle administrateur requis !" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Vérifie si l'utilisateur a le rôle "moderator"
const isModerator = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();

        for (const role of roles) {
            if (role.name === "moderator") {
                return next(); // Autorisé
            }
        }

        return res.status(403).json({ message: "Rôle modérateur requis !" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Vérifie si l'utilisateur est soit "moderator", soit "admin"
const isModeratorOrAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();

        for (const role of roles) {
            if (role.name === "moderator" || role.name === "admin") {
                return next(); // Autorisé
            }
        }

        return res
            .status(403)
            .json({ message: "Rôle modérateur ou administrateur requis !" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// On exporte tout comme un objet
const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
    isModeratorOrAdmin,
};

export default authJwt;

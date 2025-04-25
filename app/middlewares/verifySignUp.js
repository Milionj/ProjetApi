import db from "../models/index.js";

// On récupère les rôles valides et le modèle User
const ROLES = db.ROLES;
const User = db.user;

// Vérifie si le username OU l'email existe déjà dans la base
const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        // Vérifie le nom d'utilisateur
        let user = await User.findOne({ where: { username: req.body.username } });
        if (user) {
            return res
                .status(400)
                .json({ message: "Échec ! Ce nom d'utilisateur est déjà pris." });
        }

        // Vérifie l'adresse email
        user = await User.findOne({ where: { email: req.body.email } });
        if (user) {
            return res
                .status(400)
                .json({ message: "Échec ! Cette adresse email est déjà utilisée." });
        }

        next(); // Si tout est ok, on passe au middleware suivant
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Vérifie que les rôles envoyés dans le body sont valides
const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (const role of req.body.roles) {
            if (!ROLES.includes(role)) {
                return res
                    .status(400)
                    .json({ message: `Échec ! Ce rôle n'existe pas : ${role}` });
            }
        }
    }
    next(); // Si tous les rôles sont valides, on continue
};

// On exporte les deux fonctions comme un objet
const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
};

export default verifySignUp;

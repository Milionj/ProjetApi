export default (sequelize, DataTypes) => {
    // On définit un modèle Sequelize appelé "users" (table dans la base)
    const User = sequelize.define("users", {
        // Champ "username" de type STRING, qui doit être unique
        username: {
            type: DataTypes.STRING,
            unique: true,
        },
        // Champ "email" de type STRING, unique, et doit être un email valide
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true, // Validation intégrée Sequelize
            },
        },
        // Champ "password" de type STRING
        password: {
            type: DataTypes.STRING,
        },
    });

    // On retourne le modèle User pour l'utiliser ailleurs
    return User;
};

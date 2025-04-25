export default (sequelize, DataTypes) => {
    // Définition d'un modèle Sequelize nommé "roles"
    const Role = sequelize.define("roles", {
        // Champ "id" qui sera la clé primaire auto-incrémentée
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // Champ "name" pour le nom du rôle (ex: 'user', 'admin', 'moderator')
        name: {
            type: DataTypes.STRING,
        },
    });

    // On retourne le modèle pour l'utiliser ailleurs
    return Role;
};

export default (sequelize, DataTypes) => {
    const Role = sequelize.define("roles", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
    });

    // Association inverse vers le modèle "users"
    Role.associate = (models) => {
        Role.belongsToMany(models.user, {
            through: "user_roles",       // table pivot
            foreignKey: "roleId",        // clé étrangère côté rôle
            otherKey: "userId",          // clé étrangère côté user
        });
    };

    return Role;
};

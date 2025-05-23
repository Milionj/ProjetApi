import Sequelize from "sequelize";
import dbConfig from "../config/db.config.js";
import UserModel from "./user.model.js";
import RoleModel from "./role.model.js";
import TodoModel from "./todo.model.js";
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
});
 
const db = {}; // On crée un objet vide qui va contenir toutes les infos liées à la base de données

db.Sequelize = Sequelize; // On y attache la classe Sequelize (utile pour accéder à Sequelize.DataTypes, etc.)

db.sequelize = sequelize; // On y attache l'instance Sequelize connectée à notre base PostgreSQL

// Initialisation des modèles User et Role, que l'on attache ensuite à l'objet db
db.user = UserModel(sequelize, Sequelize);
db.role = RoleModel(sequelize, Sequelize);
db.todo = TodoModel(sequelize, Sequelize);

// Définition des relations many-to-many entre les utilisateurs et les rôles
// Un rôle peut être attribué à plusieurs utilisateurs
db.role.belongsToMany(db.user, { 
    through: "user_roles",
    foreignKey: "roleId",    
    otherKey: "userId",      
});
// Un utilisateur peut avoir plusieurs rôles. On accède à ses rôles via l'alias 'roles'
db.user.belongsToMany(db.role, { 
    through: "user_roles", 
    foreignKey: "userId",   
    otherKey: "roleId",     
    as: "roles"               
});

// Définition de la relation User → ToDo
db.user.hasMany(db.todo, { foreignKey: "user_id", onDelete: "CASCADE" });
// Définition de la relation ToDo → User
db.todo.belongsTo(db.user, { foreignKey: "user_id" });

// On définit une constante avec les rôles disponibles, utile pour les vérifications
db.ROLES = ["user", "admin", "moderator"];

// On exporte l'objet db pour qu'il soit utilisable ailleurs dans l'application (routes, contrôleurs, etc.)
export default db;
